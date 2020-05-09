<template>
  <div>
    <template v-if="subjects.isLoading">
      <cp-content-loading
        v-for="index in maxRowPlaceholders"
        :key="index"
        class="my-1 h-12"
      />
    </template>
    <table
      v-if="!subjects.isLoading"
      class="cp-subject-table cp-table"
    >
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
        <template v-if="!subjects.isEmpty()">
          <tr
            v-for="subject in subjects.items"
            :key="subject.shortName"
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
                :name="subject.icon"
                class="h-6 w-6"
              />
            </td>
          </tr>
        </template>

        <tr
          v-if="subjects.isEmpty()"
          class="cp-table__empty-row"
        >
          <td :colspan="tableColumns.length">
            {{ $glossary('subject-management.TABLE_EMPTY') }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import { ISubject } from '@/types/subject.type';
import { ITableColumn } from '@/types/table.type';
import CpContentLoading from '@/components/ContentLoading/ContentLoading.component.vue';

@Component({
  name: 'cp-subject-table',
  components: {
    CpContentLoading,
  },
})
export default class CpSubjectTable extends Vue {
  /**
   * Props
   */
  @Prop({ type: Object, required: true })
  public subjects: ISubject[];

  @Prop({ type: Number, default: 10 })
  public maxRowPlaceholders: number;

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
  ];
}
</script>
