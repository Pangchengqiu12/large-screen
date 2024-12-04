<template>
  <div>
    <Area>
      <Title title="实时监测统计"></Title>
    </Area>
    <Area>
      <Title title="雷达相机监测"><DateSwitch @switch="switchHandlerLD" /></Title>
    </Area>
    <Area>
      <Title title="声纹监测"><DateSwitch @switch="switchHandlerSW" /></Title>
    </Area>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import DateSwitch from '../components/DateSwitch.vue';
  /**
   * ## 雷达相机的日期选择
   * @param {object} val 传入的值
   */
  function switchHandlerLD(val) {}
  /**
   * ## 声纹设备的日期选择
   * @param {object} val 传入的值
   */
  function switchHandlerSW(val) {}
</script>

<style scoped>
  /* Your styles here */
</style>
