import type { RouteRecordRaw } from 'vue-router';
const children: Array<RouteRecordRaw> = [
  {
    path: '/BackgroundSurvey',
    name: 'BackgroundSurvey',
    // component: () => import('@/pages/Home'),
    components: {
      default: () => import('@/pages/BackgroundSurvey/index.vue'),
      left: () => import('@/pages/BackgroundSurvey/Left.vue'),
      center: () => import('@/pages/BackgroundSurvey/Center.vue'),
      right: () => import('@/pages/BackgroundSurvey/Right.vue'),
    },
    meta: { title: '本底调查' },
  },
  {
    path: '/Protection',
    name: 'Protection',
    // component: () => import('@/pages/Home'),
    components: {
      default: () => import('@/pages/Protection/index.vue'),
      left: () => import('@/pages/Protection/Left.vue'),
      center: () => import('@/pages/Protection/Center.vue'),
      right: () => import('@/pages/Protection/Right.vue'),
    },
    meta: { title: '保护监管' },
  },
  {
    path: '/PublicParticipation',
    name: 'PublicParticipation',
    // component: () => import('@/pages/Home'),
    components: {
      default: () => import('@/pages/PublicParticipation/index.vue'),
      left: () => import('@/pages/PublicParticipation/Left.vue'),
      center: () => import('@/pages/PublicParticipation/Center.vue'),
      right: () => import('@/pages/PublicParticipation/Right.vue'),
    },
    meta: { title: '公众参与' },
  },
];
export default children;
