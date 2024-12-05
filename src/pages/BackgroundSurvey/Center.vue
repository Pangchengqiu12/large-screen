<template>
  <div>
    <!-- Your component content here -->
  </div>
</template>

<script setup lang="ts">
import { useCesium } from '@/hooks/useCesium';
const { initCesium, destroyedViewer } = useCesium();
onMounted(() => {
  initCesium();
});
onUnmounted(() => {
  destroyedViewer();
});
</script>

<style scoped>
/* Your styles here */
</style>
