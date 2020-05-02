import { ActivityAttachmentsDataSource } from '@/data-sources/activity-attachments/activity-attachments.data-source';
import { activityAttachments } from '@/repositories/json/activity-attachments.json';

export class ActivityAttachmentsJsonDataSource extends ActivityAttachmentsDataSource {
  public load(): void {
    this.isLoading = true;
    this.items = activityAttachments;
    this.isLoading = false;
  }
}
