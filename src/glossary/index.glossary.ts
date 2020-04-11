import { EAppGlossary } from '@/glossary/app.enum';
import { EActivityGlossary } from '@/glossary/activity.enum';

const glossaryItems: any = {
  app: EAppGlossary,
  activity: EActivityGlossary,
};

export function glossary(item: string): string {
  return item
    .split('.')
    .reduce((p, c) => (p && p[c]) || item, glossaryItems);
}
