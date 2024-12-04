<template>
  <div>
    <Area>
      <Title title="物种总数"></Title>
    </Area>
    <Area>
      <Title title="类群统计"></Title>
    </Area>
    <Area>
      <Title title="生物多样性统计"></Title>
    </Area>
  </div>
</template>

<script setup lang="ts">
import { useCesium } from '@/hooks/useCesium';
const { initCesium } = useCesium();
onMounted(() => {
  initCesium(true);
});
</script>

<style scoped>
/* Your styles here */
</style>
