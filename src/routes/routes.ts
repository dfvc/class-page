import { RouteConfig } from 'vue-router';
import CpAboutPage from '@/components/TheAboutPage/TheAboutPage.component.vue';
import CpActivityPage from '@/components/TheActivityPage/TheActivityPage.component.vue';
import CpStartPage from '@/components/TheStartPage/TheStartPage.component.vue';
import CpUtilityPage from '@/components/TheUtilityPage/TheUtilityPage.component.vue';
import {
  aboutNavigationItem,
  activitiesNavigationItem,
  homeNavigationItem,
  logoutNavigationItem,
  utilitiesNavigationItem,
} from '@/routes/main-navigation';

export const routes: RouteConfig[] = [
  {
    path: '*',
    component: CpStartPage,
  },
  {
    path: homeNavigationItem.url,
    component: CpStartPage,
  },
  {
    path: activitiesNavigationItem.url,
    component: CpActivityPage,
  },
  {
    path: utilitiesNavigationItem.url,
    component: CpUtilityPage,
  },
  {
    path: aboutNavigationItem.url,
    component: CpAboutPage,
  },
  {
    path: logoutNavigationItem.url,
    component: CpStartPage,
  },
];
