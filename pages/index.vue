<template>
  <Topbar />

  <section class="flex justify-center items-center">

    <div class="flex flex-wrap justify-center items-center gap-4 pt-16 max-w-[1400px] w-full font-sniglet-400">

      <NuxtLink v-for="game in games" :key="game.id" :to="`/${game.url}`"
        class="relative flex flex-wrap w-[300px] h-[200px] border rounded-2xl overflow-hidden">
        <img :src="game.img" :alt="game.name" class="w-full h-full object-cover hover:scale-110 transition-opacity duration-500" />
        <div class="absolute bottom-0 p-2 bg-black/50 text-white">
          {{ game.name }}
        </div>
      </NuxtLink>

    </div>
  </section>
</template>

<script setup lang="ts">
import games from '../assets/json/games.json'
</script>