<template>
  <section class=" h-screen w-screen flex flex-col justify-center items-center font-sniglet-400">

    <span class="absolute top-5 text-2xl">
      <h1>Kitty generator</h1>
    </span>

    <div class="flex flex-col items-center">
      <div v-if="status === 'pending'">Chargement... ⏳</div>
      <div v-else-if="error" class="text-red-500">Erreur : {{ error.message }}</div>
      <div v-else-if="Array.isArray(cats) && cats.length > 0" class="w-full h-full flex flex-col items-center justify-center">
        <!-- <Gallery :gridItems="gridData" :images="catImages" :onRefresh="refresh"/> -->
        <tes :gridItems="gridData" :images="catImages" :onRefresh="refresh"/>
      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
import Gallery from './elements/Gallery.vue'
import tes from './elements/tes.vue'

interface CatImage {
  id: string
  url: string
  width: number
  height: number
}

const { data: cats, refresh, status, error } = useFetch<CatImage[]>('/api/kitty/kitty')

const catImages = computed(() => Array.isArray(cats.value) ? cats.value.map(cat => cat.url) : [])

const gridData = [
  { colStart: 1, colEnd: 3, rowStart: 1, rowEnd: 3 },
  { colStart: 1, colEnd: 2, rowStart: 3, rowEnd: 4 },
  { colStart: 2, colEnd: 3, rowStart: 3, rowEnd: 4 },
  { colStart: 3, colEnd: 4, rowStart: 3, rowEnd: 40 },
  { colStart: 3, colEnd: 4, rowStart: 2, rowEnd: 30 },
  { colStart: 3, colEnd: 4, rowStart: 1, rowEnd: 2 },
]

</script>