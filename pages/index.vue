<template>
  <TopbarIndex />

  <section class="flex justify-center items-center">

    <div class="flex flex-wrap justify-center items-center gap-4 pt-16 max-w-[1400px] w-full font-sniglet-400">

      <NuxtLink v-for="(game, index) in games" :key="index" :to="`/games/${game.slug}`"
        class="relative flex flex-wrap w-[300px] h-[200px] border rounded-2xl overflow-hidden group">
        <img :src="game.image" :alt="game.name" class="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
        <div class="absolute w-full flex justify-center bottom-0 p-2 opacity-0 bg-black/50 text-white group-hover:opacity-100 transition duration-300">
          {{ game.name }}
        </div>
      </NuxtLink>

    </div>
  </section>
</template>

<script setup lang="ts">
import type { Games } from '~/types/supabase'

const games = ref<Games[]|[]>([])
const client = useSupabaseClient()
const session = useSupabaseSession() 



const fetchGames = async () => {
  const { data, error } = await client.from('games').select('*')
  if (error) {
    console.error('Error fetching games:', error)
    return []
  }
  games.value = data
}

onMounted(() => {
  fetchGames()
})

</script>

<style scoped>
* {
  font-family: 'Sniglet', sans-serif;
}
</style>