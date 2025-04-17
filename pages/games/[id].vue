<template>
  <TopbarGame />
  <component v-if="componentToRender" :is="componentToRender"/>
  <p v-else>Composant non trouvé.</p>
</template>

<script setup lang="ts">
import KittyGenerator from '@/components/KittyGenerator.vue'
import DoggyGenerator from '@/components/DoggyGenerator.vue'
import EPSIvsWIS from '@/components/EPSIvsWIS.vue'

const route = useRoute()
const slug = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

const gamesSlugs: Record<string, ReturnType<typeof defineComponent>> = {
  'kitty-generator': KittyGenerator,
  'epsi-vs-wis': EPSIvsWIS,
  'doggy-generator': DoggyGenerator
}

const componentToRender = gamesSlugs[slug] || null
</script>