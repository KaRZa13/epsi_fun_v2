<template>
  <section ref="gameRef" class="h-screen w-screen flex">
    <div ref="epsiRef" class="bg-orange-300/70 h-full w-1/2" />
    <div ref="wisRef" class="bg-blue-600/70 h-full w-1/2" />
    <div class="absolute left-1/2 top-4 transform -translate-x-1/2 text-2xl">
      <h1>EPSI vs WIS</h1>
    </div>
    <div class="absolute left-1/2 top-1/2 ">
      <div class="flex justify-between items-center">
        <button>
          +1 EPSI
        </button>
        <button>
          +1 WIS
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

</script>
