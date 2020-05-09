import { IActivityAttachment } from '@/types/activity.type';
import { keyBy } from 'lodash';

export abstract class ActivityAttachmentsDataSource {
  public items: IActivityAttachment[];

  public isLoading: boolean = true;

  public getIndexedById() {
    return keyBy(
      this.items,
      (attachment: IActivityAttachment) => attachment.id.toLowerCase(),
    );
  }

  public count(): number {
    return this.isLoading ? 0 : this.items.length;
  }

  public isEmpty(): boolean {
    return this.isLoading ? true : this.items.length === 0;
  }

  public abstract load(): void;
}
