import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/task/:taskId/show',
      name: 'show',
      component: () => import('../views/Show.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/task/:taskId/edit',
      name: 'edit',
      component: () => import('../views/Edit.vue'),
      meta: { requiresAuth: true },
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  // If the route requires authentication and there's no token, redirect to login
  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router
