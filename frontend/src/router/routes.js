import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/admin/profile',
    name: 'Profile',
    component: () => import('../views/admin/Profile.vue'),
  },
  {
    path: '/admin/experience',
    name: 'Experience',
    component: () => import('../views/admin/Experience.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
