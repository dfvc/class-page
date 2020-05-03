import { IMainNavigationItem } from '@/types/header-menu.type';

export const homeNavigationItem: IMainNavigationItem = {
  url: '/',
  text: 'Início',
  icon: 'home',
};

export const activitiesNavigationItem: IMainNavigationItem = {
  url: '/atividades',
  text: 'Atividades Propostas',
  icon: 'dossiers',
};

export const utilitiesNavigationItem: IMainNavigationItem = {
  url: '/utilidades',
  text: 'Utilidades',
  icon: 'cloud-computing',
};

export const aboutNavigationItem: IMainNavigationItem = {
  url: '/acerca',
  text: 'Acerca',
  icon: 'question-mark',
};

export const loginNavigationItem: IMainNavigationItem = {
  url: '/login',
  text: 'Iniciar Sessão',
  icon: 'enter',
  visibility: ['non-auth'],
};

export const logoutNavigationItem: IMainNavigationItem = {
  url: '/logout',
  text: 'Terminar Sessão',
  icon: 'exit',
  visibility: ['auth'],
};

export const mainNavigationItems: IMainNavigationItem[] = [
  homeNavigationItem,
  activitiesNavigationItem,
  utilitiesNavigationItem,
  aboutNavigationItem,
  loginNavigationItem,
  logoutNavigationItem,
];
