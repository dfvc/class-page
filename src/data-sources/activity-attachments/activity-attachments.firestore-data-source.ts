import { ActivityAttachmentsDataSource } from '@/data-sources/activity-attachments/activity-attachments.data-source';
import { FirestoreClient } from '@/clients/firestore/firestore.client';
import { IActivityAttachment } from '@/types/activity.type';
import { EFirestoreCollections } from '@/clients/firestore/firestore.enum';

export class ActivityAttachmentsFirestoreDataSource extends ActivityAttachmentsDataSource {
  public async load(): Promise<void> {
    this.isLoading = true;
    const client = new FirestoreClient<IActivityAttachment>(EFirestoreCollections.ACTIVITY_ATTACHMENTS);
    this.items = await client.getAll();
    this.isLoading = false;
  }
}
