import { ISubject } from '@/types/subject.type';

export interface IActivity {
  subject: ISubject;
  description: string;
  attachments?: IActivityAttachment[];
  deliveryDate?: string;
  deliveryMethod?: string;
  dateCreation: string;
  dateChanged: string;
}

export interface IActivityAttachment {
  id: string;
  url: string;
  text: string;
  type: string;
}
