import { IMainNavigationItem } from '@/types/header-menu.type';

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

export const mainNavigationItems: IMainNavigationItem[] = [
  homeNavigationItem,
  activitiesNavigationItem,
  utilitiesNavigationItem,
  aboutNavigationItem,
  signInNavigationItem,
  signOutNavigationItem,
];
