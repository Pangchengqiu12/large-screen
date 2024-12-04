<template>
  <div class="main" id="main">
    <Map>
      <div class="layout" id="layout">
        <Header />
        <div class="view-content">
          <router-view
            name="left"
            class="animate__animated left-side-content"
            v-slot="{ Component }"
          >
            <transition name="fade-left">
              <component :is="Component" />
            </transition>
          </router-view>
          <div class="center-view">
            <Menu></Menu>
            <router-view
              name="center"
              class="animate__animated"
              v-slot="{ Component }"
            >
              <transition name="fade-left">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
          <router-view
            name="right"
            class="animate__animated right-side-content"
            v-slot="{ Component }"
          >
            <transition name="fade-right">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
        <div class="footer">
          <img src="@/assets/largeScreen/footer.png" alt="" />
        </div>
      </div>
    </Map>
  </div>
</template>

<script setup lang="ts">
import Map from './Map.vue';
import Header from './Header.vue';
import Menu from './Menu.vue';
import autofit from 'autofit.js';

onMounted(() => {
  autofit.init({ dh: 1080, dw: 1920, el: '#layout', resize: true });
});
</script>

<style scoped lang="scss">
.main {
  position: relative;
  width: 100%;
  height: 100%;
  .layout {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    pointer-events: none;
    position: absolute;
    inset: 0;
    z-index: 2;
    background: url('@/assets/largeScreen/layoutBg.png') no-repeat center
      center/100% 100%;
    .view-content {
      position: relative;
      flex: 1;
      overflow-y: auto;
      padding: 10px 62px;
      display: flex;
      justify-content: space-between;
      pointer-events: none;
      .left-side-content,
      .right-side-content {
        background-color: rgb(3, 2, 70);
        position: relative;
        pointer-events: auto;
        width: 21.5%;
        display: flex;
        overflow-x: hidden;
        flex-direction: column;
      }
      .center-view {
        position: relative;
        pointer-events: none;
        // display: flex;
        z-index: 9;
        // flex: 1;
        // display: flex;
        // justify-content: flex-end;
        width: 50%;
        padding: 10px;
      }
    }
  }
  .footer {
    pointer-events: none;
    img {
      width: 100%;
    }
  }
}

.fade-left-enter-active {
  animation: fadeInLeft 1s;
}
.fade-left-leave-active,
.fade-right-leave-active {
  display: none !important;
}

.fade-right-enter-active {
  animation: fadeInRight 1s;
}
/* Your styles here */
</style>
