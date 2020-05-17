import { SubjectsDataSource } from '@/data-sources/subjects/subjects.data-source';
import { subjects } from '@/repositories/json/subjects.json';
import {ISubject} from '@/types/subject.type';

export class SubjectsJsonDataSource extends SubjectsDataSource {
  public load(): void {
    this.isLoading = true;
    this.items = subjects;
    this.isLoading = false;
  }

  public async delete(subject: ISubject): Promise<boolean> {
    // console.log('DELETE');
    return true;
  }

  public async update(subject: ISubject): Promise<boolean> {
    // console.log('UPDATE');
    return true;
  }
}
