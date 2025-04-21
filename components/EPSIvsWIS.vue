<template>
  <div class="w-screen h-screen relative">
    <div class="relative w-full max-w-screen h-full m-auto overflow-hidden select-none">

      <!-- BOUTONS -->
      <div class="absolute inset-0 flex items-center justify-center z-30">
        <div class="h-full w-1/2 flex flex-col items-center justify-center">

          <button @click="incrementCounter('epsi')"
            class="cursor-pointer bg-transparent text-transparent px-6 py-2 rounded-lg">
            +1 EPSI
          </button>

          <h2 class="text-xl pt-4 text-transparent">{{ epsiCounter }} points</h2>
          <p class="text-transparent">{{ epsiPerSecond }} points per second</p>
        </div>
        <div class="h-full w-1/2 flex flex-col items-center justify-center">

          <button @click="incrementCounter('wis')"
            class="cursor-pointer bg-transparent text-transparent px-6 py-2 rounded-lg">
            +1 WIS
          </button>

          <h2 class="text-xl pt-4 text-transparent">{{ wisCounter }} points</h2>
          <p class="text-transparent">{{ wisPerSecond }} points per second</p>
        </div>
      </div>

      <!-- WIS -->
      <div class="h-full flex bg-blue-900">
        <h1 class="absolute inset-0 flex justify-center mt-4 text-3xl text-slate-100">
          EPSI vs WIS
        </h1>
        <div class="h-full w-1/2 flex flex-col items-center justify-center">

          <div class="bg-blue-500 text-slate-100 px-6 py-2 rounded-lg">
            +1 EPSI
          </div>

          <h2 class="text-xl pt-4 text-slate-100">{{ epsiCounter }} points</h2>
          <p class="text-slate-100">{{ epsiPerSecond }} points per second</p>
        </div>
        <div class="h-full w-1/2 flex flex-col items-center justify-center">

          <div class="bg-slate-100 text-slate-900 px-6 py-2 rounded-lg">
            +1 WIS
          </div>

          <h2 class="text-xl pt-4 text-slate-100">{{ wisCounter }} points</h2>
          <p class="text-slate-100">{{ wisPerSecond }} points per second</p>
        </div>

        <div class="h-[90vh] w-full absolute bottom-0 flex justify-between items-center px-4">
          <img ref="epsiInvertedLogoRef" src="/assets/img/epsi-inverted-logo.png" alt="epsi-logo" class="h-20 w-20">
          <img ref="wisLogoRef" src="/assets/img/wis-logo.png" alt="wis-logo" class="h-20 w-20">
        </div>
      </div>

      <!-- EPSI -->
      <div class="absolute top-0 left-0 right-0 w-full max-w-screen h-full m-auto overflow-hidden select-none transition-clip" :style="clippedStyle">
        <div class="h-full flex bg-orange-200">

          <h1 class="absolute inset-0 flex justify-center mt-4 text-3xl text-slate-900">
            EPSI vs WIS
          </h1>

          <div class="h-full w-1/2 flex flex-col items-center justify-center">

            <div class="bg-orange-500 text-slate-900 px-6 py-2 rounded-lg">
              +1 EPSI
            </div>

            <h2 class="text-xl pt-4 text-slate-900">{{ epsiCounter }} points</h2>
            <p class="text-slate-900">{{ epsiPerSecond }} points per second</p>
          </div>

          <div class="h-full w-1/2 flex flex-col items-center justify-center">

            <div class="bg-blue-500 text-slate-100 px-6 py-2 rounded-lg">
              +1 WIS
            </div>

            <h2 class="text-xl pt-4 text-slate-900">{{ wisCounter }} points</h2>
            <p class="text-slate-900">{{ wisPerSecond }} points per second</p>
          </div>

          <div class="h-[90vh] w-full absolute bottom-0 flex justify-between items-center px-4">
            <img ref="epsiLogoRef" src="/assets/img/epsi-logo.png" alt="epsi-logo" class="h-20 w-20">
            <img ref="wisInvertedLogoRef" src="/assets/img/wis-inverted-logo.png" alt="wis-inverted-logo" class="h-20 w-20">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import type { CounterEpsiWis } from '@/types/supabase'

type CounterName = 'epsi' | 'wis'
type CounterRow = CounterEpsiWis['public']['Tables']['counter-epsi-wis']['Row']

const client = useSupabaseClient<CounterEpsiWis>()

const epsiLogoRef = ref<HTMLImageElement | null>(null)
const epsiInvertedLogoRef = ref<HTMLImageElement | null>(null)
const epsiCounter = ref<number>(0)
const epsiPerSecond = ref<number>(0)
const epsiClicks = ref<number>(0)
const epsiClicksBuffer = ref<number[]>([])

const wisLogoRef = ref<HTMLImageElement | null>(null)
const wisInvertedLogoRef = ref<HTMLImageElement | null>(null)
const wisCounter = ref<number>(0)
const wisPerSecond = ref<number>(0)
const wisClicks = ref<number>(0)
const wisClicksBuffer = ref<number[]>([])

const sliderPosition = ref<number>(50)

const fetchCounters = async (): Promise<void> => {
  const { data, error } = await client.from('counter-epsi-wis').select('*')

  if (error) {
    console.error('Erreur lors du fetch :', error)
    return
  }

  data?.forEach((row: CounterRow) => {
    if (row.name === 'epsi') {
      epsiCounter.value = row.counter
    } else if (row.name === 'wis') {
      wisCounter.value = row.counter
    }
  })
}

const incrementCounter = async (type: CounterName): Promise<void> => {
  const counterRef = type === 'epsi' ? epsiCounter : wisCounter
  const clicksRef = type === 'epsi' ? epsiClicks : wisClicks

  counterRef.value++
  clicksRef.value++

  const { error } = await client
    .from('counter-epsi-wis')
    .update({ counter: counterRef.value })
    .eq('name', type)

  if (error) {
    console.error(`Erreur lors de l'update de ${type} :`, error)
  }
}

const calculateClicksPerSecond = (): void => {
  epsiClicksBuffer.value.push(epsiClicks.value)
  wisClicksBuffer.value.push(wisClicks.value)

  if (epsiClicksBuffer.value.length > 10) {
    epsiClicksBuffer.value.shift()
  }
  if (wisClicksBuffer.value.length > 10) {
    wisClicksBuffer.value.shift()
  }

  epsiPerSecond.value = epsiClicksBuffer.value.reduce((a, b) => a + b, 0)
  wisPerSecond.value = wisClicksBuffer.value.reduce((a, b) => a + b, 0)

  const delta = epsiClicks.value - wisClicks.value
  sliderPosition.value = Math.max(0, Math.min(100, sliderPosition.value + delta))

  epsiClicks.value = 0
  wisClicks.value = 0
}

const resetSliderPosition = (): void => {
  if (epsiClicks.value === 0 && wisClicks.value === 0) {
    if (sliderPosition.value > 50) {
      sliderPosition.value = Math.max(0, sliderPosition.value - 1)
    } else if (sliderPosition.value < 50) {
      sliderPosition.value = Math.min(100, sliderPosition.value + 1)
    }
  }
}

watch(sliderPosition, (newValue) => {
  const containerHeight = 90 * window.innerHeight / 100
  const logoHeight = 80
  const maxOffset = (containerHeight - logoHeight) / 2
  const offset = ((newValue - 50) / 50) * maxOffset

  if (epsiLogoRef.value) {
    gsap.to(epsiLogoRef.value, {
      y: -Math.min(Math.max(-maxOffset, offset), maxOffset),
      duration: 0.4,
      ease: 'power2.out',
    })
  }
  if (epsiInvertedLogoRef.value) {
    gsap.to(epsiInvertedLogoRef.value, {
      y: -Math.min(Math.max(-maxOffset, offset), maxOffset),
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  if (wisLogoRef.value) {
    gsap.to(wisLogoRef.value, {
      y: Math.min(Math.max(-maxOffset, offset), maxOffset),
      duration: 0.4,
      ease: 'power2.out',
    })
  }
  if (wisInvertedLogoRef.value) {
    gsap.to(wisInvertedLogoRef.value, {
      y: Math.min(Math.max(-maxOffset, offset), maxOffset),
      duration: 0.4,
      ease: 'power2.out',
    })
  }
})

onMounted(() => {
  fetchCounters()
  setInterval(calculateClicksPerSecond, 100)
  setInterval(resetSliderPosition, 200)
})



const clippedStyle = computed(() => ({
  clipPath: `inset(0 ${100 - sliderPosition.value}% 0 0)`,
}))
</script>

<style scoped>
* {
  font-family: 'Poppins', sans-serif;
}

.transition-clip {
  transition: clip-path 0.5s ease;
}
</style>
