import { ISubject } from '@/types/subject.type';
import { sortBy } from 'lodash';

export abstract class SubjectsDataSource {
  public items: ISubject[];

  public isLoading: boolean = true;

  public sortByName(): void {
    this.items = sortBy(this.items, 'name');
  }

  public abstract load(): void;
}
