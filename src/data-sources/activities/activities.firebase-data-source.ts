import Vue from 'vue';
import { ActivitiesDataSource } from '@/data-sources/activities/activities.data-source';
import { IActivity } from '@/types/activity.type';
import { FirebaseClient } from '@/clients/firebase/firebase.client';
import { SubjectsFirebaseDataSource } from '@/data-sources/subjects/subjects.firebase-data-source';
import { EFirebaseCollections } from '@/clients/firebase/firebase.enum';

export class ActivitiesFirebaseDataSource extends ActivitiesDataSource {
  public async load(): Promise<void> {
    this.isLoading = true;
    const client = new FirebaseClient<IActivity>(EFirebaseCollections.ACTIVITIES);
    const items = await client.getAll();
    Vue.set(this, 'items', await this.expandedItemsWithSubjects(items));
    this.isLoading = false;
  }

  protected async expandedItemsWithSubjects(rawItems: any[]): Promise<IActivity[]> {
    const subjects = new SubjectsFirebaseDataSource();
    await subjects.load();
    const subjectsMap: any = subjects.getIndexedByShortName();

    return rawItems.map((rawItem) => ({
      ...rawItem,
      subject: subjectsMap[rawItem.subject],
    }));
  }
}
