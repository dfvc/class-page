import { SubjectsDataSource } from '@/data-sources/subjects/subjects.data-source';
import { FirebaseClient } from '@/clients/firebase.client';
import { ISubject } from '@/types/subject.type';

export class SubjectsFirebaseDataSource extends SubjectsDataSource {
  public async load(): Promise<void> {
    this.isLoading = true;
    const client = new FirebaseClient<ISubject>('subjects');
    this.items = await client.getAll();
    this.isLoading = false;
  }
}
