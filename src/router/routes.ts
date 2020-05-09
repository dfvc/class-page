import { RouteConfig } from 'vue-router';
import CpAboutPage from '@/components/TheAboutPage/TheAboutPage.component.vue';
import CpActivityPage from '@/components/TheActivityPage/TheActivityPage.component.vue';
import CpStartPage from '@/components/TheStartPage/TheStartPage.component.vue';
import CpUtilityPage from '@/components/TheUtilityPage/TheUtilityPage.component.vue';
import CpSubjectManagementPage from '@/components/TheSubjectManagementPage/TheSubjectManagementPage.component.vue';
import {
  aboutNavigationItem,
  activitiesNavigationItem,
  homeNavigationItem,
  signOutNavigationItem,
  subjectsManagementNavigationItem,
  utilitiesNavigationItem,
} from '@/router/main-navigation';

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
    component: CpSubjectManagementPage,
  },
];
