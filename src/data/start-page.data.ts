import { IStartPage } from '@/types/start-page.type';
import { headerTitle } from '@/data/header-title.data';
import { activities } from '@/data/activities.data';

export const startPageContent: IStartPage = {
  headerTitle,
  bannerTop: {
    headline: '',
    subHeadline: '',
    link: '',
    bgImage: 'https://c4.wallpaperflare.com/wallpaper/22/796/979/photography-of-body-of-water-with-rocks-gotland-sweden-gotland-sweden-wallpaper-preview.jpg',
  },
  activities,
};
