<template>
  <section ref="gameRef" class="h-screen w-screen flex">


    <div ref="epsiRef" class="h-full w-full flex bg-orange-300/70">
      <div class="h-full w-1/2 flex flex-col items-center justify-center">
        <button class="border cursor-pointer" @click="incrementCounter('epsi')">
          +1 EPSI
        </button>
        <h2>{{ epsiCounter }} points</h2>
        <p>points per second</p>
      </div>
      <div class="h-full w-1/2 flex flex-col items-center justify-center">
        <button class="border cursor-pointer" @click="incrementCounter('wis')">
          +1 WIS
        </button>
        <h2>{{ wisCounter }} points</h2>
        <p>points per second</p>
      </div>
    </div>
    <!-- <div ref="wisRef" class="bg-blue-600/70 h-full w-1/2" /> -->

  </section>
</template>

<script setup lang="ts">
import type { CounterEpsiWis } from '@/types/supabase'

type CounterName = 'epsi' | 'wis'
type CounterRow = CounterEpsiWis['public']['Tables']['counter-epsi-wis']['Row']

const client = useSupabaseClient<CounterEpsiWis>()

const epsiCounter = ref<number>(0)
const wisCounter = ref<number>(0)

const fetchCounters = async (): Promise<void> => {
  const { data, error } = await client
    .from('counter-epsi-wis')
    .select('*')

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
  counterRef.value++

  const { error } = await client
    .from('counter-epsi-wis')
    .update({ counter: counterRef.value })
    .eq('name', type)

  if (error) {
    console.error(`Erreur lors de l'update de ${type} :`, error)
  }
}

onMounted(() => {
  fetchCounters()
})
</script>

