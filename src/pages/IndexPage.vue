<script setup lang="ts">
import 'cesium/Build/Cesium/Widgets/widgets.css'
const store = useStore()
import { useCesium } from '@/hooks/useCesium'
useCesium()
</script>
<template>
  <div id="cesiumContainer"></div>
</template>
<style>
.info-box {
  background-color: black;
  color: white;
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  pointer-events: none; /* 避免遮挡地图交互 */
  z-index: 1000;
}
</style>
