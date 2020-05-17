<template>
  <table class="cp-subject-table cp-table">
    <thead>
      <tr>
        <th
          v-for="(column, index) in tableColumns"
          :key="index"
          :width="column.width"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>

    <tbody>
      <template v-if="subjects.length">
        <tr
          v-for="subject in subjects"
          :key="subject.shortName"
          @click="onClickEditSubject(subject)"
        >
          <td>{{ subject.shortName.toUpperCase() }}</td>
          <td>{{ subject.name }}</td>
          <td>
            <div
              :style="{ backgroundColor: subject.color }"
              class="h-6 w-6 rounded"
            />
          </td>
          <td>
            <cp-icon
              :path="subject.icon"
              :local="false"
              class="h-6 w-6"
            />
          </td>
          <td class="cp-table__actions">
            <div>
              <cp-button
                mode="link"
                type="button"
              >
                <cp-icon
                  path="pencil"
                  class="h-4 w-4"
                  @click.native="onClickEditSubject(subject)"
                />
              </cp-button>
              <cp-button
                mode="link"
                type="button"
                @click.native.stop="onClickDeleteSubject(subject)"
              >
                <cp-icon
                  path="cross"
                  class="h-4 w-4"
                />
              </cp-button>
            </div>
          </td>
        </tr>
      </template>

      <tr
        v-else
        class="cp-table__empty-row"
      >
        <td :colspan="tableColumns.length">
          {{ $glossary('subject-management.TABLE_EMPTY') }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import { ISubject } from '@/types/subject.type';
import { ITableColumn } from '@/types/table.type';
import CpButton from '@/components/Button/Button.component.vue';
import CpContentLoading from '@/components/ContentLoading/ContentLoading.component.vue';

@Component({
  name: 'cp-subject-table',
  components: {
    CpButton,
    CpContentLoading,
  },
})
export default class CpSubjectTable extends Vue {
  /**
   * Props
   */
  @Prop({ type: Array, required: true })
  public subjects: ISubject[];

  /**
   * Data
   */
  public tableColumns: ITableColumn[] = [
    {
      label: Vue.prototype.$glossary('subject-management.TABLE_HEADER_SHORT_NAME'),
      dataKey: 'shortName',
      width: 'auto',
    },
    {
      label: Vue.prototype.$glossary('subject-management.TABLE_HEADER_NAME'),
      dataKey: 'name',
      width: 'auto',
    },
    {
      label: Vue.prototype.$glossary('subject-management.TABLE_HEADER_COLOR'),
      dataKey: 'color',
      width: 'auto',
    },
    {
      label: Vue.prototype.$glossary('subject-management.TABLE_HEADER_ICON'),
      dataKey: 'icon',
      width: 'auto',
    },
    {
      label: '',
      dataKey: '',
      width: '1%',
    },
  ];

  /**
   * Methods
   */
  public onClickEditSubject(subject: ISubject): void {
    this.$emit('editSubject', subject);
  }

  public onClickDeleteSubject(subject: ISubject): void {
    this.$emit('deleteSubject', subject);
  }
}
</script>
