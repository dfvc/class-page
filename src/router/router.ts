import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from '@/router/routes';
import { managementNavigation } from '@/router/main-navigation';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: process.env.NODE_ENV === 'production' ? 'hash' : 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const managementUrls = managementNavigation.items.map((item) => item.url);

  if (!Vue.prototype.$auth && managementUrls.includes(to.fullPath)) {
    next('/');
  } else {
    next();
  }
});

export default router;
