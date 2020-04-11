<template>
  <section class="cp-activity-list">
    <cp-select
      v-if="subjectFilter"
      :options="subjects"
      :multiple="true"
      label="name"
      label-selected="shortName"
      :placeholder="$glossary('activity.SUBJECTS_PLACEHOLDER_SELECT')"
      :no-matches-message="$glossary('activity.SUBJECTS_NO_MATCHES_SELECT')"
      class="mt-4 md:w-1/2 lg:w-2/5"
      @onSelect="subjectSelectionChanged"
    />
    <cp-activity-tile
      v-for="(activity, index) in visibleActivities"
      :key="index"
      :activity="activity"
    />
  </section>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import { IActivity } from '@/types/activity.type';
import { ISubject } from '@/types/subject.type';
import CpActivityTile from '@/components/ActivityTile/ActivityTile.component.vue';
import CpSelect from '@/components/Select/Select.vue';
import { subjects } from '@/data/subjects.data';
import { reverse, sortBy } from 'lodash';

@Component({
  name: 'cp-activity-list',
  components: {
    CpActivityTile,
    CpSelect,
  },
})
export default class CpActivityList extends Vue {
  /**
   * Props
   */
  @Prop({ type: Array, required: true })
  public activities: IActivity[];

  @Prop({ type: Number, default: -1 })
  public maxActivities: number;

  @Prop({ type: Boolean, default: true })
  public subjectFilter: boolean;

  /**
   * Data
   */
  public subjects: ISubject[] = subjects;

  public selectedSubjects: ISubject[] = [];

  /**
   * Computed Props
   */
  public get visibleActivities(): IActivity[] {
    let visibleActivities = this.activities;

    visibleActivities = this.filterActivities(visibleActivities);
    visibleActivities = this.sortActivities(visibleActivities);
    visibleActivities = this.sliceActivities(visibleActivities);

    return visibleActivities;
  }

  /**
   * Methods
   */
  public subjectSelectionChanged(selectedSubjects: ISubject[]): void {
    this.selectedSubjects = selectedSubjects;
  }

  private filterActivities(activities: IActivity[]): IActivity[] {
    if (this.selectedSubjects.length === 0) return activities;

    const selectedSubjectsShortNames = this.selectedSubjects.map((selectedSubject) => (
      selectedSubject.shortName
    ));

    return activities.filter(
      (activity) => selectedSubjectsShortNames.includes(activity.subject.shortName),
    );
  }

  private sortActivities(activities: IActivity[]): IActivity[] {
    const iteratees = (activity: IActivity) => reverse(activity.dateCreation.split('-'));

    return sortBy(activities, iteratees).reverse();
  }

  private sliceActivities(activities: IActivity[]): IActivity[] {
    return this.maxActivities >= 0
      ? activities.slice(0, this.maxActivities)
      : activities;
  }
}
</script>
