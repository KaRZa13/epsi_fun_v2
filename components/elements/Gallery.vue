<template>
  <div ref="gridRef" class='grid grid-cols-9 grid-rows-9 gap-4 w-[60vw] max-h-[60vh] aspect-square'>
    <figure
      v-for="(image, index) in localImages"
      :key="image.id"
      :class="imageClasses[index]"
      class="relative cursor-pointer"
      @click="flipImage(index)"
    >
      <img :src="image.url" alt="cat image"
        class="absolute h-full w-full object-cover rounded-xl shadow-md"
      />
    </figure>
  </div>
  <div class="inline-flex justify-center items-center pt-8">
    <button @click="onRefresh" class="cursor-pointer border px-2 rounded-lg shadow-2xl bg-slate-200 hover:bg-slate-300">Refresh</button>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

const props = defineProps({
  imagesProp: {
    type: Array,
    required: true
  },
  onRefresh: {
    type: Function,
    required: true
  }
})

const gridRef = ref(null)
const localImages = ref([...props.imagesProp])

const imageClasses = [
  'col-span-6 row-span-6',
  'col-start-7 col-span-3 row-span-3',
  'col-start-7 col-span-3 row-start-4 row-span-3',
  'col-start-7 col-span-3 row-start-7 row-span-3',
  'col-start-4 col-span-3 row-start-7 row-span-3',
  'col-start-1 col-span-3 row-start-7 row-span-3',
]

const flipImage = (clickedIndex) => {
  if (clickedIndex === 0) return

  const state = Flip.getState(gridRef.value.children)

  const temp = localImages.value[0]
  localImages.value[0] = localImages.value[clickedIndex]
  localImages.value[clickedIndex] = temp

  Flip.from(state, {
    ease: "power1.inOut",
    absolute: true,
  })
}
</script>
