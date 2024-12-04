<template>
  <div class="title-root">
    <div class="title-text font-title mr-1">{{ title }}</div>
    <div class="title-side"><slot></slot></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.title-root {
  width: 100%;
  height: 41px;
  background: url('@/assets/largeScreen/titleBg.png') no-repeat center
    center/100% 100%;
  display: flex;
  align-items: center;
  .title-side {
    flex: 1;
  }
  .title-text {
    font-weight: bold;
    font-size: 19px;
    color: #ffffff;
    text-indent: 60px;
  }
}
/* Your styles here */
</style>
