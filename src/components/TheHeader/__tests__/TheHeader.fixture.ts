import { IMainNavigationItem } from '@/types/header-menu.type';
import { IHeaderTitle } from '@/types/header-title.type';

export const navigationItems: IMainNavigationItem[] = [
  {
    name: 'url1',
    url: '/url1',
    text: 'Url 1',
    icon: 'url-1',
  },
  {
    name: 'url2',
    url: '/url2',
    text: 'Url 2',
    icon: 'url-2',
  },
];

export const title: IHeaderTitle = {
  title: 'title',
  titleLink: {
    name: 'root',
    url: '#',
    text: 'Go to Title',
  },
};
