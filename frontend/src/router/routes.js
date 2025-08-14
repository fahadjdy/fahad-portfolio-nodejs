import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
  },
  {
    path: '/admin/profile',
    name: 'Profile',
    component: () => import('../pages/Profile.vue'),
  },
  {
    path: '/admin/experience',
    name: 'Experience',
    component: () => import('../pages/Experience.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'bg-[var(--second)] text-white',
  linkExactActiveClass: 'bg-[var(--second)] text-white',
});

export default router;
