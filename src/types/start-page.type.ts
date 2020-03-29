import { IBanner } from '@/types/banner.type';
import { IActivity } from '@/types/activity.type';

export interface IStartPage {
  bannerTop?: IBanner;
  activities?: IActivity[];
}
