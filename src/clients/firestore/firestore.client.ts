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
}
