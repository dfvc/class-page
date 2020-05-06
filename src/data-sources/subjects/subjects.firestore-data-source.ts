import { SubjectsDataSource } from '@/data-sources/subjects/subjects.data-source';
import { FirestoreClient } from '@/clients/firestore/firestore.client';
import { ISubject } from '@/types/subject.type';
import { EFirestoreCollections } from '@/clients/firestore/firestore.enum';

export class SubjectsFirestoreDataSource extends SubjectsDataSource {
  public async load(): Promise<void> {
    this.isLoading = true;
    const client = new FirestoreClient<ISubject>(EFirestoreCollections.SUBJECTS);
    this.items = await client.getAll();
    this.isLoading = false;
  }
}
