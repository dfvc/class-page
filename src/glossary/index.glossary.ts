import { EActivityGlossary } from '@/glossary/activity.enum';
import { EAppGlossary } from '@/glossary/app.enum';
import { EAuthGlossary } from '@/glossary/auth.enum';
import { EFooterGlossary } from '@/glossary/footer.enum';
import { EHeaderGlossary } from '@/glossary/header.enum';

export const glossaryItems: any = {
  activity: EActivityGlossary,
  app: EAppGlossary,
  auth: EAuthGlossary,
  footer: EFooterGlossary,
  header: EHeaderGlossary,
};

export function glossary(item: string): string {
  return item
    .split('.')
    .reduce((p, c) => (p && p[c]) || item, glossaryItems);
}
