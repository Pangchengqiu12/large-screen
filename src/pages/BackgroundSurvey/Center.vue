<template>
  <div>
    <!-- Your component content here -->
  </div>
</template>

<script setup lang="ts">
import { useCesium } from '@/hooks/useCesium';
const { initCesium } = useCesium();
onMounted(() => {
  initCesium();
});
</script>

<style scoped>
/* Your styles here */
</style>
