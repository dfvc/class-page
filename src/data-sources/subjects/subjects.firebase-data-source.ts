import { SubjectsDataSource } from '@/data-sources/subjects/subjects.data-source';
import { FirebaseClient } from '@/clients/firebase/firebase.client';
import { ISubject } from '@/types/subject.type';
import { EFirebaseCollections } from '@/clients/firebase/firebase.enum';

export class SubjectsFirebaseDataSource extends SubjectsDataSource {
  public async load(): Promise<void> {
    this.isLoading = true;
    const client = new FirebaseClient<ISubject>(EFirebaseCollections.SUBJECTS);
    this.items = await client.getAll();
    this.isLoading = false;
  }
}
