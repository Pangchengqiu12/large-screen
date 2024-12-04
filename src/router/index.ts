import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import asyncRouterMap from './router.config';
import BasicLayout from '@/layouts/largeScreen/index.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: BasicLayout,
    redirect: asyncRouterMap[0] && asyncRouterMap[0].path,
    children: asyncRouterMap,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
