<template>
  <div>
    <Area>
      <Title title="实时监测统计"></Title>
    </Area>
    <Area>
      <Title title="红外相机监测">
        <DateSwitch @switch="switchHandler" />
      </Title>
    </Area>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import DateSwitch from '../components/DateSwitch.vue';
  function switchHandler(val) {}
</script>

<style scoped>
  /* Your styles here */
</style>
