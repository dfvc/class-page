import firebase from 'firebase/app';
import 'firebase/firestore';

import QuerySnapshot = firebase.firestore.QuerySnapshot;
import DocumentData = firebase.firestore.DocumentData;

export class FirestoreClient<T> {
  private db: firebase.firestore.Firestore;

  private collection: string;

  constructor(collection: string) {
    this.db = firebase.firestore();
    this.collection = collection;
  }

  public async getAll() {
    const items: Array<T> = [];

    const snapshot: QuerySnapshot<DocumentData> = await this.db.collection(this.collection).get();
    snapshot.docs.forEach((doc: DocumentData) => {
      items.push(doc.data());
    });

    return items;
  }

  public async getWhereEquals(field: string, value: string) {
    const items: Array<T> = [];

    const snapshot: QuerySnapshot<DocumentData> = await this.db.collection(this.collection).where(field, '==', value.toLowerCase()).get();
    snapshot.docs.forEach((doc: DocumentData) => {
      items.push(doc.data());
    });

    return items;
  }

  public async get(itemId: string) {
    const doc = await this.db.collection(this.collection).doc(itemId).get();

    return doc.data();
  }

  public async delete(itemId: string): Promise<void> {
    await this.db.collection(this.collection).doc(itemId).delete();
  }

  public async update(itemId: string, data: object): Promise<void> {
    await this.db.collection(this.collection).doc(itemId).set(data);
  }
}
