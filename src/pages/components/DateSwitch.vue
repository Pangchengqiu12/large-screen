<template>
  <div class="title-switch flex items-center">
    <div
      class="item cursor-pointer"
      v-for="(item, index) in options"
      :key="index"
      @click="clickHandler(item)"
    >
      <img
        v-show="(item.value || index) === currentIndex"
        :src="onswitch"
        alt=""
      />
      <img
        v-show="(item.value || index) !== currentIndex"
        :src="unswitch"
        alt=""
      />
      <div class="text">{{ item.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import onswitch from '@/assets/largeScreen/onswitch.png';
import unswitch from '@/assets/largeScreen/unswitch.png';
import { ref } from 'vue';
const options = [
  {
    label: '日',
    value: 0,
  },
  {
    label: '周',
    value: 1,
  },
  {
    label: '年',
    value: 2,
  },
];
const emit = defineEmits(['switch']);

const currentIndex = ref(0);
function clickHandler(value: (typeof options)[number]) {
  currentIndex.value = value.value;
  emit('switch', value);
}
</script>

<style scoped lang="scss">
.title-switch {
  display: flex;
  align-items: center;
  .item {
    width: 56px;
    height: 26px;
    position: relative;
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: 400;
      font-size: 14px;
      color: #ffffff;
    }
    img {
      width: 100%;
    }
  }
}
/* Your styles here */
</style>
