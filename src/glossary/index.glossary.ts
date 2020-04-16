import { EAppGlossary } from '@/glossary/app.enum';
import { EActivityGlossary } from '@/glossary/activity.enum';
import { EFooterGlossary } from '@/glossary/footer.enum';

const glossaryItems: any = {
  app: EAppGlossary,
  activity: EActivityGlossary,
  footer: EFooterGlossary,
};

export function glossary(item: string): string {
  return item
    .split('.')
    .reduce((p, c) => (p && p[c]) || item, glossaryItems);
}
