import { ActivitiesDataSource } from '@/data-sources/activities/activities.data-source';
import { SubjectsJsonDataSource } from '@/data-sources/subjects/subjects.json-data-source';
import { ActivityAttachmentsJsonDataSource } from '@/data-sources/activity-attachments/activity-attachments.json-data-source';
import { activities } from '@/repositories/json/activities.json';
import { IActivity } from '@/types/activity.type';

export class ActivitiesJsonDataSource extends ActivitiesDataSource {
  public async load(): Promise<void> {
    this.isLoading = true;
    this.items = await this.expandedItems(activities);
    this.isLoading = false;
  }

  protected async expandedItems(rawItems: any[]): Promise<IActivity[]> {
    let items = rawItems;

    const subjects = new SubjectsJsonDataSource();
    items = await this.expandedItemsWithSubjects(items, subjects);

    const attachments = new ActivityAttachmentsJsonDataSource();
    items = await this.expandedItemsWithAttachments(items, attachments);

    return items;
  }
}
