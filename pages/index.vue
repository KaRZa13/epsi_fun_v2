<template>
  <TopbarIndex />

  <section class="flex justify-center items-center">

    <div class="flex flex-wrap justify-center items-center gap-4 pt-16 max-w-[1400px] w-full font-sniglet-400">

      <NuxtLink v-for="game in games" :key="game.param" :to="{ name: 'game', params: { id: game.param } }"
        class="relative flex flex-wrap w-[300px] h-[200px] border rounded-2xl overflow-hidden group">
        <img :src="game.img" :alt="game.name" class="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
        <div class="absolute w-full flex justify-center bottom-0 p-2 opacity-0 bg-black/50 text-white group-hover:opacity-100 transition duration-300">
          {{ game.name }}
        </div>
      </NuxtLink>

    </div>
  </section>
</template>

<script setup lang="ts">
import games from '../assets/json/games.json'
</script>