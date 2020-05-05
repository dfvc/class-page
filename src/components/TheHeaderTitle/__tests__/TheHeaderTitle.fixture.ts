import { IHeaderTitle } from '@/types/header-title.type';

export const title: IHeaderTitle = {
  title: 'title',
  titleLink: {
    name: 'root',
    url: '#',
    text: 'Go to Title',
  },
};

export const selectors = {
  subHeadline: '.cp-header-title__sub-headline',
  subHeadlineRow1: '.cp-header-title__sub-headline-row1',
  subHeadlineRow2: '.cp-header-title__sub-headline-row2',
};
