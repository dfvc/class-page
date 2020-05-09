import { EActivityGlossary } from '@/glossary/activity.enum';
import { EAppGlossary } from '@/glossary/app.enum';
import { EAuthGlossary } from '@/glossary/auth.enum';
import { EFooterGlossary } from '@/glossary/footer.enum';
import { EHeaderGlossary } from '@/glossary/header.enum';
import { ESubjectManagementGlossary } from '@/glossary/subject-management.enum';

export const glossaryItems: any = {
  activity: EActivityGlossary,
  app: EAppGlossary,
  auth: EAuthGlossary,
  footer: EFooterGlossary,
  header: EHeaderGlossary,
  'subject-management': ESubjectManagementGlossary,
};

export function glossary(item: string): string {
  return item
    .split('.')
    .reduce((p, c) => (p && p[c]) || item, glossaryItems);
}
