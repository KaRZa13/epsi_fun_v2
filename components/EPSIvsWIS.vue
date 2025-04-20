<template>
  <div class="w-screen h-screen relative">
    <div class="relative w-full max-w-screen h-full m-auto overflow-hidden select-none" ref="sliderContainer">

      <!-- WIS -->
      <div ref="wisSideRef" class="h-full flex bg-blue-900">
        <h1 class="absolute inset-0 flex justify-center mt-4 text-3xl text-slate-100">
          EPSI vs WIS
        </h1>
        <div class="h-full w-1/2 flex flex-col items-center justify-center">

          <button @click="incrementCounter('epsi')" class="cursor-pointer transition-all bg-blue-500 text-slate-100 px-6 py-2 rounded-lg
            border-b-[4px] border-blue-600 hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
            active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
            +1 EPSI
          </button>

          <h2 class="text-xl pt-4 text-slate-100">{{ epsiCounter }} points</h2>
          <p class="text-slate-100">{{ epsiPerSecond }} points per second</p>
        </div>
        <div class="h-full w-1/2 flex flex-col items-center justify-center">

          <button @click="incrementCounter('wis')" class="cursor-pointer transition-all bg-slate-100 text-slate-900 px-6 py-2 rounded-lg
            border-b-[4px] border-slate-300 hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
            active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
            +1 WIS
          </button>

          <h2 class="text-xl pt-4 text-slate-100">{{ wisCounter }} points</h2>
          <p class="text-slate-100">{{ wisPerSecond }} points per second</p>
        </div>

        <div class="h-[90vh] w-full absolute bottom-0 flex justify-between items-center px-4">
          <img src="/assets/img/epsi-inverted-logo.png" alt="" class="h-20 w-20">
          <img src="/assets/img/wis-logo.png" alt="" class="h-20 w-20">
        </div>
      </div>

      <div class="absolute top-0 left-0 right-0 w-full max-w-screen h-full m-auto overflow-hidden select-none pointer-events-none"
        :style="clippedStyle">
        <!-- EPSI -->
        <div ref="epsiSideRef" class="h-full flex bg-orange-200 pointer-events-auto">

          <h1 class="absolute inset-0 flex justify-center mt-4 text-3xl text-slate-900">
            EPSI vs WIS
          </h1>

          <div class="h-full w-1/2 flex flex-col items-center justify-center">

            <button @click="incrementCounter('epsi')" class="cursor-pointer transition-all bg-orange-500 text-slate-900 px-6 py-2 rounded-lg
              border-b-[4px] border-orange-700 hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
              active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
              +1 EPSI
            </button>

            <h2 class="text-xl pt-4 text-slate-900">{{ epsiCounter }} points</h2>
            <p class="text-slate-900">{{ epsiPerSecond }} points per second</p>
          </div>

          <div class="h-full w-1/2 flex flex-col items-center justify-center">

            <button @click="incrementCounter('wis')" class="cursor-pointer transition-all bg-blue-500 text-slate-100 px-6 py-2 rounded-lg
              border-b-[4px] border-blue-600 hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
              active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
              +1 WIS
            </button>

            <h2 class="text-xl pt-4 text-slate-900">{{ wisCounter }} points</h2>
            <p class="text-slate-900">{{ wisPerSecond }} points per second</p>
          </div>

          <div class="h-[90vh] w-full absolute bottom-0 flex justify-between items-center px-4">
            <img src="/assets/img/epsi-logo.png" alt="" class="h-20 w-20">
            <img src="/assets/img/wis-inverted-logo.png" alt="" class="h-20 w-20">
          </div>
        </div>


      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { CounterEpsiWis } from '@/types/supabase'

type CounterName = 'epsi' | 'wis'
type CounterRow = CounterEpsiWis['public']['Tables']['counter-epsi-wis']['Row']

const client = useSupabaseClient<CounterEpsiWis>()

const epsiCounter = ref<number>(0)
const epsiPerSecond = ref<number>(0)
const epsiClicks = ref<number>(0)

const wisCounter = ref<number>(0)
const wisPerSecond = ref<number>(0)
const wisClicks = ref<number>(0)

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
  epsiPerSecond.value = epsiClicks.value
  wisPerSecond.value = wisClicks.value

  const delta = epsiClicks.value - wisClicks.value
  sliderPosition.value = Math.max(0, Math.min(100, sliderPosition.value + delta))

  epsiClicks.value = 0
  wisClicks.value = 0
}

onMounted(() => {
  fetchCounters()
  setInterval(calculateClicksPerSecond, 1000)
})

// DEBUG SLIDER
const sliderPosition = ref(50);

const clippedStyle = computed(() => ({
  clipPath: `inset(0 ${100 - sliderPosition.value}% 0 0)`,
}))
</script>

<style scoped>
* {
  font-family: 'Poppins', sans-serif;
}
</style>
