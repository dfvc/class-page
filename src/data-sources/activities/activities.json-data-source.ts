import { ActivitiesDataSource } from '@/data-sources/activities/activities.data-source';
import { SubjectsJsonDataSource } from '@/data-sources/subjects/subjects.json-data-source';
import { activities } from '@/repositories/json/activities.json';
import { IActivity } from '@/types/activity.type';

export class ActivitiesJsonDataSource extends ActivitiesDataSource {
  public async load(): Promise<void> {
    this.isLoading = true;
    this.items = await this.expandedItemsWithSubjects(activities);
    this.isLoading = false;
  }

  protected async expandedItemsWithSubjects(rawItems: any[]): Promise<IActivity[]> {
    const subjects = new SubjectsJsonDataSource();
    await subjects.load();
    const subjectsMap: any = subjects.getIndexedByShortName();

    return rawItems.map((rawItem) => ({
      ...rawItem,
      subject: subjectsMap[rawItem.subject],
    }));
  }
}
