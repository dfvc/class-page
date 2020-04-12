import '@/styles/_index.scss';
import Vue from 'vue';
import { glossary } from '@/glossary/index.glossary';
import { routes } from '@/routes';
import CpIcon from '@/components/Icon/Icon.component.vue';
import VueRouter from 'vue-router';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.prototype.$glossary = glossary;

Vue.component('cp-icon', CpIcon);

Vue.use(VueRouter);
const router = new VueRouter({
  mode: process.env.NODE_ENV === 'production' ? 'hash' : 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
