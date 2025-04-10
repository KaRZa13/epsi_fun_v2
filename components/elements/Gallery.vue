<template>
  <div class='grid grid-cols-9 grid-rows-9 gap-4 w-[60vw] max-h-[60vh] aspect-square'>

    <figure 
      v-for='(image, index) in images'
      :key='index'
      :class='gridClasses(image.grid)'
      @click='changeGrid(index)'
      ref='(el) => figures[index] = el'
      class='relative cursor-pointer'>

      <img :src='image.src' alt='cat image' class='absolute h-full w-full object-cover rounded-xl shadow-md' />

    </figure>
  </div>
</template>

<script setup lang='ts'>
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

interface Image {
  src: string
  grid: string
}

const figures = ref<HTMLElement[]>([])

const images = ref<Image[]>([])

const bigImageIndex = ref(0)

const gridClasses = (grid: string) => {
  const gridMap: Record<string, string> = {
    'img-1': 'col-span-6 row-span-6',
    'img-2': 'col-start-7 col-span-3 row-span-3',
    'img-3': 'col-start-7 col-span-3 row-start-4 row-span-3',
    'img-4': 'col-start-7 col-span-3 row-start-7 row-span-3',
    'img-5': 'col-start-4 col-span-3 row-start-7 row-span-3',
    'img-6': 'col-start-1 col-span-3 row-start-7 row-span-3',
  }
  return gridMap[grid]
}

const changeGrid = (index: number): void => {
  if (index === bigImageIndex.value) return

  let state = Flip.getState(figures.value)

  let oldGrid = images.value[bigImageIndex.value].grid
  images.value[bigImageIndex.value].grid = images.value[index].grid
  images.value[index].grid = oldGrid
  bigImageIndex.value = index
  nextTick(() => {
    Flip.from(state, { absolute: true, ease: "Power1.inOut" })
  })
}

defineProps({
  
})
</script>