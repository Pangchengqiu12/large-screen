<template>
  <div class="menu-root">
    <div
      class="menu-item"
      v-for="item in menuMap"
      @click="pageJump(item)"
      :key="item.value"
    >
      <img v-show="item.value === selected" :src="item.on" alt="" />
      <img v-show="item.value !== selected" :src="item.un" alt="" />
      <div class="text font-title">{{ item.label }}</div>
    </div>
    <!-- Your component content here -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getLargeScreenImg } from '@/pages/utils';
const router = useRouter();
const route = useRoute();
const selected = ref(0); // 选中的菜单

const menuMap = [
  {
    label: '本地调查分析',
    value: 0,
    path: '/BackgroundSurvey',
    on: getLargeScreenImg('onMenu.png'),
    un: getLargeScreenImg('unMenu.png'),
  },
  {
    label: '智慧监测分析',
    value: 1,
    path: '/Protection',
    on: getLargeScreenImg('onMenu.png'),
    un: getLargeScreenImg('unMenu.png'),
  },
  {
    label: '公众参与',
    value: 3,
    path: '/PublicParticipation',
    on: getLargeScreenImg('onMenu.png'),
    un: getLargeScreenImg('unMenu.png'),
  },
];

type MenuItem = (typeof menuMap)[number];
// 切换菜单
function pageJump(data: MenuItem) {
  selected.value = data.value;
  router.push({ path: data.path });
}
function getCurrentRoute() {
  let find = menuMap.find((item) => item.path === route.path);
  if (find) selected.value = find.value;
}

onMounted(() => {
  getCurrentRoute();
});
</script>

<style scoped lang="scss">
.menu-root {
  box-sizing: border-box;
  width: 100%;
  padding: 5px 20%;
  position: relative;
  pointer-events: none;
  display: flex;
  justify-content: space-between;
  .menu-item {
    pointer-events: all;
    text-align: center;
    cursor: pointer;
    width: 171px;
    height: 71px;
    position: relative;
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -86%);
      color: #ffffff;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
/* Your styles here */
</style>
