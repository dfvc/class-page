export interface IMainNavigationItem {
  name: string,
  url: string;
  text: string;
  target?: string;
  icon?: string;
  visibility?: string[];
}

export interface IMainNavigation {
  title?: string;
  items: IMainNavigationItem[];
}
