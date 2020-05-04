import '@/styles/_index.scss';
import Vue from 'vue';
import { glossary } from '@/glossary/index.glossary';
import { firebaseConfig } from '@/../config/firebase.config';
import firebase from 'firebase/app';
import { routes } from '@/routes/routes';
import VueRouter from 'vue-router';
import CpIcon from '@/components/Icon/Icon.component.vue';
import App from '@/App.vue';

/* eslint-disable @typescript-eslint/no-var-requires */
const appConfig = require('@/../config/app.config');
/* eslint-enable @typescript-eslint/no-var-requires */

Vue.config.productionTip = false;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Global Vars
const EventBus = new Vue();
Vue.prototype.$event = EventBus;
Vue.prototype.$appConfig = appConfig;
Vue.prototype.$glossary = glossary;

// Global Components
Vue.component('cp-icon', CpIcon);

// Vue Router
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
