import { IActivity } from '@/types/activity.type';

export abstract class ActivitiesDataSource {
  public items: IActivity[];

  public isLoading: boolean = true;

  public abstract load(): void;

  protected abstract async expandedItemsWithSubjects(rawItems: any[]): Promise<IActivity[]>;
}
