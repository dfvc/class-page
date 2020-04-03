import { IHeaderNavigationItem } from '@/types/header-menu.type';

export const headerNavigationItems: IHeaderNavigationItem[] = [
  {
    url: '/',
    text: 'Início',
    icon: 'home',
  },
  {
    url: '/atividades',
    text: 'Atividades Propostas',
    icon: 'dossiers',
  },
  {
    url: 'utilidades',
    text: 'Utilidades',
    icon: 'cloud-computing',
  },
  {
    url: '/acerca',
    text: 'Acerca',
    icon: 'question-mark',
  },
];
