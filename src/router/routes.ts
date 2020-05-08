import { RouteConfig } from 'vue-router';
import CpAboutPage from '@/components/TheAboutPage/TheAboutPage.component.vue';
import CpActivityPage from '@/components/TheActivityPage/TheActivityPage.component.vue';
import CpStartPage from '@/components/TheStartPage/TheStartPage.component.vue';
import CpUtilityPage from '@/components/TheUtilityPage/TheUtilityPage.component.vue';
import {
  aboutNavigationItem,
  activitiesNavigationItem,
  homeNavigationItem,
  signOutNavigationItem,
  subjectsManagementNavigationItem,
  utilitiesNavigationItem,
} from '@/router/main-navigation';
import CpActivityManagementPage from '@/components/TheActivityManagementPage/TheActivityManagementPage.component.vue';

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
    path: signOutNavigationItem.url,
    redirect: homeNavigationItem.url,
  },
  {
    path: subjectsManagementNavigationItem.url,
    component: CpActivityManagementPage,
  },
];
