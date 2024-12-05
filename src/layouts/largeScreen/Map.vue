<template>
  <div id="cesiumContainer"><slot></slot></div>
  <div id="ThreeContainer"></div>
</template>

<script setup lang="ts">
import { World } from '@/world/index_1.ts';
onMounted(() => {
  let ThreeContainer = document.getElementById('ThreeContainer') as HTMLElement;
  let world = new World(ThreeContainer);
  world.render();
  setTimeout(() => {
    world.render();
  }, 1);
});
</script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100vh;
  background: url(@/assets/largeScreen/largeBg.png) no-repeat center center/100%
    100%;
}
#ThreeContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  z-index: 10;
}
.content {
  position: absolute;
  top: 0;
}

/* Your styles here */
</style>
