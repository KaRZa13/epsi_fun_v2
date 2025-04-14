<template>
  <div class='grid grid-cols-9 grid-rows-9 gap-4 w-[60vw] max-h-[60vh] aspect-square'>

    <figure 
      v-for='(image, index) in images'
      :key='index'
      :class='imageClasses[index]'
      class='relative cursor-pointer'>

      <img :src='image.url' alt='cat image' class='absolute h-full w-full object-cover rounded-xl shadow-md' />

    </figure>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)


const imageClasses = [
  'col-span-6 row-span-6',
  'col-start-7 col-span-3 row-span-3',
  'col-start-7 col-span-3 row-start-4 row-span-3',
  'col-start-7 col-span-3 row-start-7 row-span-3',
  'col-start-4 col-span-3 row-start-7 row-span-3',
  'col-start-1 col-span-3 row-start-7 row-span-3',
]


defineProps({
  images: {
    type: Array,
    required: true
  },
})
</script>