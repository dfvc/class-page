import { IMainNavigationItem } from '@/types/header-menu.type';
import { IHeaderTitle } from '@/types/header-title.type';

export const navigationItems: IMainNavigationItem[] = [
  {
    url: '/url1',
    text: 'Url 1',
    icon: 'url-1',
  },
  {
    url: '/url2',
    text: 'Url 2',
    icon: 'url-2',
  },
];

export const title: IHeaderTitle = {
  title: 'title',
};
