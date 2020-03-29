import { IBanner } from '@/types/banner.type';
import { IHeaderTitle } from '@/types/header-title.type';
import { IActivity } from '@/types/activity.type';

export interface IStartPage {
  headerTitle: IHeaderTitle;
  bannerTop?: IBanner;
  activities?: IActivity[];
}
