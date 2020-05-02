import { EAppGlossary } from '@/glossary/app.enum';
import { EActivityGlossary } from '@/glossary/activity.enum';
import { EFooterGlossary } from '@/glossary/footer.enum';
import { EHeaderGlossary } from '@/glossary/header.enum';

export const glossaryItems: any = {
  app: EAppGlossary,
  activity: EActivityGlossary,
  footer: EFooterGlossary,
  header: EHeaderGlossary,
};

export function glossary(item: string): string {
  return item
    .split('.')
    .reduce((p, c) => (p && p[c]) || item, glossaryItems);
}
