<template>
  <section class="cp-activity-list">
    <cp-content-loading
      v-if="subjectFilter && subjectsData.isLoading"
      class="mt-4 md:w-1/2 lg:w-2/5 h-12"
    />
    <cp-select
      v-if="subjectFilter && !subjectsData.isLoading"
      :options="subjectsData.items"
      :multiple="true"
      label="name"
      label-selected="shortName"
      :placeholder="$glossary('activity.SUBJECTS_PLACEHOLDER_SELECT')"
      :no-matches-message="$glossary('activity.SUBJECTS_NO_MATCHES_SELECT')"
      class="cp-activity-list__filter mt-4 md:w-1/2 lg:w-2/5"
      @onSelect="subjectSelectionChanged"
    />
    <div v-if="activities.isLoading">
      <cp-content-loading
        v-for="index in 3"
        :key="index"
        class="my-4 h-32"
      />
    </div>
    <cp-activity-tile
      v-else
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
import { SubjectsDataSource } from '@/data-sources/subjects/subjects.data-source';
import { SubjectsFirebaseDataSource } from '@/data-sources/subjects/subjects.firebase-data-source';
import { ActivitiesDataSource } from '@/data-sources/activities/activities.data-source';
import CpActivityTile from '@/components/ActivityTile/ActivityTile.component.vue';
import CpContentLoading from '@/components/ContentLoading/ContentLoading.component.vue';
import CpSelect from '@/components/Select/Select.component.vue';
import {
  reverse,
  sortBy,
} from 'lodash';

@Component({
  name: 'cp-activity-list',
  components: {
    CpActivityTile,
    CpContentLoading,
    CpSelect,
  },
})
export default class CpActivityList extends Vue {
  /**
   * Props
   */
  @Prop({ type: Object, required: true })
  public activities: ActivitiesDataSource;

  @Prop({ type: Number, default: -1 })
  public maxActivities: number;

  @Prop({ type: Boolean, default: true })
  public subjectFilter: boolean;

  /**
   * Data
   */
  public subjectsData: SubjectsDataSource = new SubjectsFirebaseDataSource();

  public selectedSubjects: ISubject[] = [];

  /**
   * Computed Props
   */
  public get visibleActivities(): IActivity[] {
    console.log(this.activities.items);
    let visibleActivities = this.activities.items;

    visibleActivities = this.filterActivities(visibleActivities);
    visibleActivities = this.sortActivitiesByDateCreation(visibleActivities);
    visibleActivities = this.sliceActivities(visibleActivities);

    return visibleActivities;
  }

  /**
   * Events
   */
  public async created(): Promise<void> {
    if (!this.subjectFilter) return;

    await this.subjectsData.load();
    this.subjectsData.sortByName();
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
      selectedSubject.shortName.toLowerCase()
    ));

    return activities.filter(
      (activity) => selectedSubjectsShortNames.includes(activity.subject.shortName.toLowerCase()),
    );
  }

  private sortActivitiesByDateCreation(activities: IActivity[]): IActivity[] {
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
