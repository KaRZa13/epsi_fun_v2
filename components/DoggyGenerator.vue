<template>
  <section class="h-screen w-screen flex flex-col justify-center items-center font-sniglet-400">

    <span class="absolute top-5 text-2xl">
      <h1>Doggy generator</h1>
    </span>

    <div class="flex flex-col items-center">

      <div class="w-full h-full flex flex-col items-center justify-center">
        <div v-if="status === 'pending'">Chargement... ⏳</div>
        <div v-else-if="error" class="text-red-500">Erreur : {{ error.message }}</div>
        <Gallery v-else-if="dogImages" :onRefresh="refresh" :imagesProp="dogImages" />
      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
import Gallery from './elements/Gallery.vue'

const { data: dogImages, status, error, refresh } = await useFetch('/api/dog/dog')

</script>

<style scoped>
* {
  font-family: 'Sniglet', sans-serif;
}
</style>
