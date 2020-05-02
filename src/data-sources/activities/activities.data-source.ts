import { IActivity } from '@/types/activity.type';
import { SubjectsDataSource } from '@/data-sources/subjects/subjects.data-source';
import { ActivityAttachmentsDataSource } from '@/data-sources/activity-attachments/activity-attachments.data-source';

export abstract class ActivitiesDataSource {
  public items: IActivity[];

  public isLoading: boolean = true;

  public abstract load(): void;

  protected abstract async expandedItems(rawItems: any[]): Promise<IActivity[]>;

  protected async expandedItemsWithSubjects(
    rawItems: any[],
    subjects: SubjectsDataSource,
  ): Promise<IActivity[]> {
    await subjects.load();
    const subjectsMap: any = subjects.getIndexedByShortName();

    return rawItems.map((rawItem) => ({
      ...rawItem,
      subject: subjectsMap[rawItem.subject],
    }));
  }

  protected async expandedItemsWithAttachments(
    rawItems: any[],
    attachments: ActivityAttachmentsDataSource,
  ): Promise<IActivity[]> {
    await attachments.load();
    const attachmentsMap: any = attachments.getIndexedById();

    return rawItems.map((rawItem) => ({
      ...rawItem,
      attachments: rawItem.attachments
        ? rawItem.attachments.map((attachment: string) => (attachmentsMap[attachment.toLowerCase()]))
        : [],
    }));
  }
}
