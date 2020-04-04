import { IBanner } from '@/types/banner.type';
import { IActivity } from '@/types/activity.type';

export interface IActivityPage {
  bannerTop?: IBanner;
  activities?: IActivity[];
}
