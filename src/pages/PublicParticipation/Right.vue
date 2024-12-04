<template>
  <div>
    <Area>
      <Title title="公众上报"></Title>
    </Area>
    <Area>
      <Title title="公共互动数据"></Title>
    </Area>
    <Area>
      <Title title="声纹监测"></Title>
    </Area>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  // Define reactive data
  const dataProperty = ref('Initial value');

  // Define methods
  const methodName = () => {
    // Method logic here
  };
</script>

<style scoped>
  /* Your styles here */
</style>
