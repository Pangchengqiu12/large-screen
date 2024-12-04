<template>
  <div class="header-root">
    <div class="header-root-bg">
      <img src="@/assets/largeScreen/headerBg.png" alt="" />
    </div>
    <div class="header-side left">左边</div>
    <div class="header-center">
      <div class="title font-title">舟山市定海区生物多样性一张图平台</div>
    </div>
    <div class="header-side right">
      <div class="date">{{ date }}</div>
      <div class="week">{{ chineseDayOfWeek }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
//获取星期
const weekDays = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
];
const today = dayjs().day();
const chineseDayOfWeek = weekDays[today];
//获取当前时间
const time = ref(dayjs().format('HH:mm:ss'));
const date = ref(dayjs().format('YYYY-MM-DD'));
</script>

<style scoped lang="scss">
.header-root {
  pointer-events: none;
  height: 83px;
  // background: url('@/assets/largeScreen/headerBg.png') no-repeat center center/100% 100%;
  position: relative;
  .wether {
    width: 36px;
    img {
      width: 100%;
    }
  }
  .header-side {
    height: 36px;
    margin-top: 40px;
    width: 29.25%;
    color: #ffffff;
    font-weight: bold;
    font-size: 17px;
    position: absolute;
    z-index: 10;
    top: 0;
    display: flex;
    align-items: center;
  }
  .left {
    left: 0;
    justify-content: flex-end;
  }
  .right {
    right: 0;
  }
  .header-root-bg {
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
    z-index: -1;
    img {
      width: 100%;
    }
  }
  .header-center {
    position: relative;
    height: 146px;
    background: url(@/assets/largeScreen/header.png) no-repeat center
      center/100% 100%;
  }
  .title {
    position: absolute;
    top: 24%;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    font-size: 28px;
    color: #ffffff;
    line-height: 39px;
    text-align: center;
    font-style: normal;
    background: linear-gradient(180deg, #ffffff 55%, #3be3ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
/* Your styles here */
</style>
