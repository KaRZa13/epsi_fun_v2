<template>
  <div class="grid grid-cols-9 grid-rows-9 gap-4 w-[60vw] max-h-[60vh] aspect-square">
    <figure 
      v-for="(image, index) in images" 
      :key="index" 
      :class="gridClasses(image.grid)"
      @click="changeGrid(index)"
      ref="(el) => figures[index] = el"
      class="relative cursor-pointer">
      <img :src="image.src" alt="cat image" class="absolute h-full w-full object-cover rounded-xl shadow-md" />
    </figure>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue"
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'


gsap.registerPlugin(Flip);

interface Image {
  src: string;
  grid: string;
}

const figures = ref<HTMLElement[]>([]);
const images = ref<Image[]>([]);
const bigImageIndex = ref(0);

const fetchImages = async () => {
  try {
    const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=6");
    const data = await response.json();
    images.value = data.map((img: any, index: number) => ({
      src: img.url,
      grid: `img-${index + 1}`
    }));
  } catch (error) {
    console.error("Failed to fetch images", error);
  }
};

const changeGrid = (index: number): void => {
  if (index === bigImageIndex.value) return

  const state = Flip.getState(figures.value)

  // échange uniquement les valeurs `grid` des deux images concernées
  const gridA = images.value[bigImageIndex.value].grid
  const gridB = images.value[index].grid

  images.value[bigImageIndex.value].grid = gridB
  images.value[index].grid = gridA

  bigImageIndex.value = index

  nextTick(() => {
    Flip.from(state, { absolute: true, ease: "power1.inOut", duration: 0.5 })
  })
}

onMounted(fetchImages);

const gridClasses = (grid: string) => {
  const gridMap: Record<string, string> = {
    "img-1": "col-span-6 row-span-6",
    "img-2": "col-start-7 col-span-3 row-span-3",
    "img-3": "col-start-7 col-span-3 row-start-4 row-span-3",
    "img-4": "col-start-7 col-span-3 row-start-7 row-span-3",
    "img-5": "col-start-4 col-span-3 row-start-7 row-span-3",
    "img-6": "col-start-1 col-span-3 row-start-7 row-span-3",
  };
  return gridMap[grid]
};
</script>

<style scoped>
body {
  @apply min-h-screen flex items-center justify-center;
}
</style>
