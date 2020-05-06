import Vue from 'vue';
import { ActivitiesDataSource } from '@/data-sources/activities/activities.data-source';
import { IActivity } from '@/types/activity.type';
import { FirestoreClient } from '@/clients/firestore/firestore.client';
import { SubjectsFirestoreDataSource } from '@/data-sources/subjects/subjects.firestore-data-source';
import { ActivityAttachmentsFirestoreDataSource } from '@/data-sources/activity-attachments/activity-attachments.firestore-data-source';
import { EFirestoreCollections } from '@/clients/firestore/firestore.enum';

export class ActivitiesFirestoreDataSource extends ActivitiesDataSource {
  public async load(): Promise<void> {
    this.isLoading = true;
    const client = new FirestoreClient<IActivity>(EFirestoreCollections.ACTIVITIES);
    const items = await client.getAll();
    Vue.set(this, 'items', await this.expandedItems(items));
    this.isLoading = false;
  }

  protected async expandedItems(rawItems: any[]): Promise<IActivity[]> {
    let items = rawItems;

    const subjects = new SubjectsFirestoreDataSource();
    items = await this.expandedItemsWithSubjects(items, subjects);

    const attachments = new ActivityAttachmentsFirestoreDataSource();
    items = await this.expandedItemsWithAttachments(items, attachments);

    return items;
  }
}
