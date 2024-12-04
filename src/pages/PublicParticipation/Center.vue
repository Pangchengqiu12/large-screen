<template>
  <div>
    公众参与中间
    <!-- Your component content here -->
  </div>
</template>

<script setup lang="ts">
import { useCesium } from '@/hooks/useCesium';
const { destroyedViewer } = useCesium();
onMounted(() => {
  destroyedViewer();
});
</script>

<style scoped>
/* Your styles here */
</style>
