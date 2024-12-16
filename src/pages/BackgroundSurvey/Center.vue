<template>
  <div>
    <!-- Your component content here -->
  </div>
</template>

<script setup lang="ts">
import { useCesium } from '@/hooks/useCesium';
import { useAmap } from '@/hooks/useAmap';
const { init } = useAmap();
const { initCesium } = useCesium();
onMounted(() => {
  initCesium();
  // init();
});
</script>

<style scoped>
/* Your styles here */
</style>
