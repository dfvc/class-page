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

    <template v-if="subjects.isLoading">
      <cp-content-loading
        v-for="index in maxRowPlaceholders"
        :key="index"
        class="my-1 h-12"
      />
    </template>

    <cp-subject-table
      v-else
      :subjects="subjects.items"
      @editSubject="editSubject"
      @deleteSubject="deleteSubject"
    />

    <cp-offcanvas-subject-edit
      :subject="subjectToEdit"
      :is-open="isSubjectsEditFlyoutOpen"
      @on-close-offcanvas-subject-edit="closeEditSubjectFlyout"
      @on-subject-edit-save="updateSubject"
    />
  </main>
</template>

<script lang="ts">
import {
  Component, Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';
import { SubjectsDataSource } from '@/data-sources/subjects/subjects.data-source';
import { SubjectsFirestoreDataSource } from '@/data-sources/subjects/subjects.firestore-data-source';
import CpContentLoading from '@/components/ContentLoading/ContentLoading.component.vue';
import CpOffcanvasSubjectEdit from '@/components/TheOffcanvasSubjectEdit/TheOffcanvasSubjectEdit.component.vue';
import CpSubjectTable from '@/components/SubjectTable/SubjectTable.component.vue';
import { ISubject } from '@/types/subject.type';
import {
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';

@Component({
  name: 'cp-subject-management-page',
  components: {
    CpContentLoading,
    CpOffcanvasSubjectEdit,
    CpSubjectTable,
  },
})
export default class CpSubjectManagementPage extends Vue {
  /**
   * Computed Props
   */
  @Prop({ type: Number, default: 10 })
  public maxRowPlaceholders: number;

  /**
   * Data
   */
  public subjects: SubjectsDataSource = new SubjectsFirestoreDataSource();

  public subjectToEdit: ISubject = {} as ISubject;

  public isSubjectsEditFlyoutOpen: boolean = false;

  /**
   * Events
   */
  public async created(): Promise<void> {
    await this.subjects.load();
  }

  @Watch('isSubjectsEditFlyoutOpen')
  public onIsVisibleChange() {
    if (this.isSubjectsEditFlyoutOpen) {
      disableBodyScroll(
        this.$el,
        { reserveScrollBarGap: true },
      );
    } else {
      enableBodyScroll(this.$el);
    }
  }

  /**
   * Methods
   */
  public async editSubject(subject: ISubject): Promise<void> {
    this.subjectToEdit = subject;
    this.openEditSubjectFlyout();
  }

  public async deleteSubject(subject: ISubject): Promise<void> {
    if (await this.subjects.delete(subject)) {
      this.subjects.load();
    } else {
      console.log('SUBJECT IN USE');
    }
  }

  public async updateSubject(subject: ISubject): Promise<void> {
    if (await this.subjects.update(subject)) {
      this.closeEditSubjectFlyout();
      this.subjects.load();
    } else {
      console.log('ERROR WHILE UPDATING');
    }
  }

  private openEditSubjectFlyout(): void {
    this.isSubjectsEditFlyoutOpen = true;
  }

  private closeEditSubjectFlyout(): void {
    this.isSubjectsEditFlyoutOpen = false;
  }
}
</script>
