import { IHeaderNavigationItem } from '@/types/header-menu.type';

export const headerNavigationItems: IHeaderNavigationItem[] = [
  {
    url: '/',
    text: 'Início',
    icon: 'home.svg',
  },
  {
    url: '/atividades',
    text: 'Atividades Propostas',
    icon: 'dossiers.svg',
  },
  {
    url: 'utilidades',
    text: 'Utilidades',
    icon: 'cloud-computing.svg',
  },
  {
    url: '/acerca',
    text: 'Acerca',
    icon: 'question-mark.svg',
  },
];
