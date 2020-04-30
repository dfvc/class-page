import { ISubject } from '@/types/subject.type';
import {
  sortBy,
  keyBy,
} from 'lodash';

export abstract class SubjectsDataSource {
  public items: ISubject[];

  public isLoading: boolean = true;

  public sortByName(): void {
    this.items = sortBy(this.items, 'name');
  }

  public getIndexedByShortName() {
    return keyBy(
      this.items,
      (subject: ISubject) => subject.shortName.toLowerCase(),
    );
  }

  public abstract load(): void;
}
