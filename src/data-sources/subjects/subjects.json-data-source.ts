import { SubjectsDataSource } from '@/data-sources/subjects/subjects.data-source';
import { subjects } from '@/repositories/json/subjects.json';

export class SubjectsJsonDataSource extends SubjectsDataSource {
  public load(): void {
    this.isLoading = true;
    this.items = subjects;
    this.isLoading = false;
  }
}
