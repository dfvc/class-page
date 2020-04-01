import CpAboutPage from '@/components/TheAboutPage/TheAboutPage.component.vue';
import CpActivityPage from '@/components/TheActivityPage/TheActivityPage.component.vue';
import CpStartPage from '@/components/TheStartPage/TheStartPage.component.vue';
import CpUtilityPage from '@/components/TheUtilityPage/TheUtilityPage.component.vue';

export const routes = [
  {
    path: '/',
    component: CpStartPage,
  },
  {
    path: '/atividades',
    component: CpActivityPage,
  },
  {
    path: '/utilidades',
    component: CpUtilityPage,
  },
  {
    path: '/acerca',
    component: CpAboutPage,
  },
];
