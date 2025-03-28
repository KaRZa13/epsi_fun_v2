<template>
  <section class="flex flex-col justify-center items-center font-sniglet-400">
    
    <h1>Kitty generator</h1>
    
    <div class="flex flex-col items-center">
      <div v-if="pending">Chargement... ⏳</div>
      <div v-else-if="error" class="text-red-500">Erreur : {{ error.message }}</div>
      <div v-else-if="cat">
        <img :src="cat.url" :alt="`Image de chat ${cat.id}`" class="rounded-lg shadow-md max-w-full h-auto" />
        <button @click="() => refresh()">ssss</button>
      </div>
     
    </div>

  </section>
</template>

<script setup lang="ts">
interface CatImage {
  id: string
  url: string
  width: number
  height: number
}

const { data: cat, refresh, pending, error } = useFetch<CatImage>('/api/kitty/kitty')


</script>