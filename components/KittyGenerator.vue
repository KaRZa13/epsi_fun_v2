<template>
  <section class=" h-screen w-screen flex flex-col justify-center items-center font-sniglet-400">

    <span class="absolute top-5 text-2xl">
      <h1>Kitty generator</h1>
    </span>

    <div class="flex flex-col items-center">

      <div class="w-full h-full flex flex-col items-center justify-center">
        <Gallery v-if="catImages" :images="catImages" />
      </div>

    </div>

  </section>
</template>

<script setup>
import Gallery from './elements/Gallery.vue'

const { data: catImages, status, error } = await useFetch('/api/kitty/kitty')

</script>

<style scoped>
* {
  font-family: 'Sniglet', sans-serif;
}
</style>



