<template>
  <main class="cp-subject-management-page fluid-container">
    <h1 class="fluid-h1 my-6 text-main-700 border-main-700 border-b-2">
      {{ $glossary('subject-management.LIST_TITLE') }}
      <span
        v-if="!subjects.isEmpty()"
        class="text-base"
      >
        | {{ subjects.count() }}
      </span>
    </h1>
    <cp-subject-table :subjects="subjects" />
  </main>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import { SubjectsDataSource } from '@/data-sources/subjects/subjects.data-source';
import { SubjectsFirestoreDataSource } from '@/data-sources/subjects/subjects.firestore-data-source';
import CpSubjectTable from '@/components/SubjectTable/SubjectTable.component.vue';

@Component({
  name: 'cp-subject-management-page',
  components: {
    CpSubjectTable,
  },
})
export default class CpSubjectManagementPage extends Vue {
  /**
   * Data
   */
  public subjects: SubjectsDataSource = new SubjectsFirestoreDataSource();

  /**
   * Events
   */
  public async created(): Promise<void> {
    await this.subjects.load();
  }
}
</script>
