import { ISubject } from '@/types/subject.type';
import { subjects } from '@/repositories/json/subjects.json';
import { sortBy } from 'lodash';

export class SubjectsJsonDataSource {
  private _items: ISubject[];

  constructor() {
    this.load();
  }

  get items(): ISubject[] {
    return this._items;
  }

  set items(value: ISubject[]) {
    this._items = value;
  }

  public load(): void {
    this._items = subjects;
  }

  public sortByName(): void {
    this._items = sortBy(this._items, 'name');
  }
}
