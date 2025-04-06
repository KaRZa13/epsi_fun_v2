<template>
  <div ref="gallery" class="h-auto w-screen flex flex-col justify-around items-center">
    <div class="grid grid-cols-3 grid-rows-3 gap-4 w-1/2 h-3/4 aspect-square">
      <figure v-for="(item, index) in gridItems" :key="index" :class="[
        `col-start-${item.colStart} col-end-${item.colEnd}`,
        `row-start-${item.rowStart} row-end-${item.rowEnd}`,
        'cursor-pointer'
      ]">
        <img v-if="images[index]" :src="images[index]" alt="Image de chat"
          class="w-full h-full object-cover shadow-md rounded-2xl" />
      </figure>
    </div>
  </div>
  <div class="flex justify-center mb-4">
    <button
      @click="onRefresh"
      class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 cursor-pointer"
    >
      Charger d'autres chats 🐱
    </button>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'

interface GridItem {
  colStart: number
  colEnd: number
  rowStart: number
  rowEnd: number
}

gsap.registerPlugin(Flip)



defineProps<{
  gridItems: GridItem[]
  images: string[]
  onRefresh: () => void
}>()

</script>