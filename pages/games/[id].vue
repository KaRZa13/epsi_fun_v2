<template>
  <TopbarGame />
  <div>
    <h1>Détail du Jeu</h1>
    <p>ID du jeu : {{ gameId }}</p>
  </div>
</template>

<script setup lang="ts">

const route = useRoute()
const gameId = route.params.id

</script>