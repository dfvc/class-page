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

  public abstract load(): void;
}
