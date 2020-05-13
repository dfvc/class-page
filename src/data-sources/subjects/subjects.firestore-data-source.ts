import { SubjectsDataSource } from '@/data-sources/subjects/subjects.data-source';
import { FirestoreClient } from '@/clients/firestore/firestore.client';
import { ISubject } from '@/types/subject.type';
import { EFirestoreCollections } from '@/clients/firestore/firestore.enum';

export class SubjectsFirestoreDataSource extends SubjectsDataSource {
  private client = new FirestoreClient<ISubject>(EFirestoreCollections.SUBJECTS);

  public async load(): Promise<void> {
    this.isLoading = true;
    this.items = await this.client.getAll();
    this.isLoading = false;
  }

  public async delete(subject: ISubject): Promise<boolean> {
    const activityClient = new FirestoreClient<ISubject>(EFirestoreCollections.ACTIVITIES);
    const activitiesWithSubject = await activityClient.getWhereEquals('subject', subject.shortName);

    if (!activitiesWithSubject.length) {
      await this.client.delete(subject.shortName);
      return true;
    }

    return false;
  }

  public async update(subject: ISubject): Promise<boolean> {
    await this.client.update(subject.shortName, subject);

    return true;
  }
}
