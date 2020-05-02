import { ActivityAttachmentsDataSource } from '@/data-sources/activity-attachments/activity-attachments.data-source';
import { FirebaseClient } from '@/clients/firebase/firebase.client';
import { IActivityAttachment } from '@/types/activity.type';
import { EFirebaseCollections } from '@/clients/firebase/firebase.enum';

export class ActivityAttachmentsFirebaseDataSource extends ActivityAttachmentsDataSource {
  public async load(): Promise<void> {
    this.isLoading = true;
    const client = new FirebaseClient<IActivityAttachment>(EFirebaseCollections.ACTIVITY_ATTACHMENTS);
    this.items = await client.getAll();
    this.isLoading = false;
  }
}
