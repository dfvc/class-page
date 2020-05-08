import {
  IMainNavigation,
  IMainNavigationItem,
} from '@/types/header-menu.type';

export const homeNavigationItem: IMainNavigationItem = {
  name: 'root',
  url: '/',
  text: 'Início',
  icon: 'home',
};

export const activitiesNavigationItem: IMainNavigationItem = {
  name: 'activities',
  url: '/atividades',
  text: 'Atividades Propostas',
  icon: 'dossiers',
};

export const utilitiesNavigationItem: IMainNavigationItem = {
  name: 'utilities',
  url: '/utilidades',
  text: 'Utilidades',
  icon: 'cloud-computing',
};

export const aboutNavigationItem: IMainNavigationItem = {
  name: 'about',
  url: '/acerca',
  text: 'Acerca',
  icon: 'question-mark',
};

export const subjectsManagementNavigationItem: IMainNavigationItem = {
  name: 'subjects-management',
  url: '/subjects-management',
  text: 'Disciplinas',
  icon: 'piled-files',
  visibility: ['auth'],
};

export const activityAttachmentsManagementNavigationItem: IMainNavigationItem = {
  name: 'activity-attachments-management',
  url: '/attachments-management',
  text: 'Anexos',
  icon: 'piled-files',
  visibility: ['auth'],
};

export const activitiesManagementNavigationItem: IMainNavigationItem = {
  name: 'activities-management',
  url: '/activities-management',
  text: 'Atividades',
  icon: 'piled-files',
  visibility: ['auth'],
};

export const signInNavigationItem: IMainNavigationItem = {
  name: 'signin',
  url: '/signin',
  text: 'Iniciar Sessão',
  icon: 'enter',
  visibility: ['non-auth'],
};

export const signOutNavigationItem: IMainNavigationItem = {
  name: 'signout',
  url: '/signout',
  text: 'Terminar Sessão',
  icon: 'exit',
  visibility: ['auth'],
};

export const publicNavigation: IMainNavigation = {
  items: [
    homeNavigationItem,
    activitiesNavigationItem,
    utilitiesNavigationItem,
    aboutNavigationItem,
  ],
};

export const managementNavigation: IMainNavigation = {
  title: 'Gestão',
  items: [
    activitiesManagementNavigationItem,
    activityAttachmentsManagementNavigationItem,
    subjectsManagementNavigationItem,
  ],
};

export const authNavigation: IMainNavigation = {
  items: [
    signInNavigationItem,
    signOutNavigationItem,
  ],
};
