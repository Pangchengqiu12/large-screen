<template>
  <div id="cesiumContainer"><slot></slot></div>
</template>

<script setup lang="ts"></script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100vh;
  background: url(@/assets/largeScreen/largeBg.png) no-repeat center center/100%
    100%;
}
.content {
  position: absolute;
  top: 0;
}

/* Your styles here */
</style>
