<template>
  <section class="h-screen w-screen flex flex-col justify-center items-center font-sniglet-400">

    <span class="absolute top-10 text-4xl">
      <h1>Kitty generator</h1>
    </span>

    <div class="flex flex-col items-center mt-16">

      <div class="w-full h-full flex flex-col items-center justify-center">
        <div v-if="status === 'pending'">Chargement... ⏳</div>
        <div v-else-if="error" class="text-red-500">Erreur : {{ error.message }}</div>
        <Gallery v-else-if="catImages" :onRefresh="refresh" :imagesProp="catImages" />
      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
import Gallery from './elements/Gallery.vue'

const { data: catImages, status, error, refresh } = await useFetch('/api/kitty/kitty')

</script>

<style scoped>
* {
  font-family: 'Sniglet', sans-serif;
}
</style>
