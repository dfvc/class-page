import Vue from 'vue';
import { ActivitiesDataSource } from '@/data-sources/activities/activities.data-source';
import { IActivity } from '@/types/activity.type';
import { FirebaseClient } from '@/clients/firebase/firebase.client';
import { SubjectsFirebaseDataSource } from '@/data-sources/subjects/subjects.firebase-data-source';
import { ActivityAttachmentsFirebaseDataSource } from '@/data-sources/activity-attachments/activity-attachments.firebase-data-source';
import { EFirebaseCollections } from '@/clients/firebase/firebase.enum';

export class ActivitiesFirebaseDataSource extends ActivitiesDataSource {
  public async load(): Promise<void> {
    this.isLoading = true;
    const client = new FirebaseClient<IActivity>(EFirebaseCollections.ACTIVITIES);
    const items = await client.getAll();
    Vue.set(this, 'items', await this.expandedItems(items));
    this.isLoading = false;
  }

  protected async expandedItems(rawItems: any[]): Promise<IActivity[]> {
    let items = rawItems;

    const subjects = new SubjectsFirebaseDataSource();
    items = await this.expandedItemsWithSubjects(items, subjects);

    const attachments = new ActivityAttachmentsFirebaseDataSource();
    items = await this.expandedItemsWithAttachments(items, attachments);

    return items;
  }
}
