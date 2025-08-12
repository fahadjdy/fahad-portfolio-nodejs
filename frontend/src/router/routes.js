import { createRouter, createWebHistory } from 'vue-router';
import AllUsers from '../views/AllUsers.vue';
import Todos from '../views/Todo.vue';

const routes = [
  {
    path: '/users',
    name: 'AllUsers',
    component: AllUsers,
  },
  {
    path: '/todos',
    name: 'Todos',
    component: Todos,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
