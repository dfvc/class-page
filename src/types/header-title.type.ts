import { IMainNavigationItem } from '@/types/header-menu.type';

export interface IHeaderTitle {
  title: string;
  titleLink: IMainNavigationItem,
  subTitleRow1?: string;
  subTitleRow2?: string;
}
