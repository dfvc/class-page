<template>
  <section class="cp-activity-list fluid-container">
    <cp-activity-tile
      v-for="(activity, index) in visibleActivities"
      :key="index"
      :activity="activity"
    />
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IActivity } from '@/types/activity.type';
import CpActivityTile from '@/components/ActivityTile/ActivityTile.component.vue';
import { reverse, sortBy } from 'lodash';

@Component({
  name: 'cp-activity-list',
  components: {
    CpActivityTile,
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

  /**
   * Computed Props
   */
  public get visibleActivities(): IActivity[] {
    const visibleActivities = this.sortActivities();

    return this.maxActivities >= 0
      ? visibleActivities.slice(0, this.maxActivities)
      : visibleActivities;
  }

  /**
   * Methods
   */
  private sortActivities(): IActivity[] {
    const iteratees = (activity: IActivity) => reverse(activity.dateCreation.split('-'));

    return sortBy(this.activities, iteratees).reverse();
  }
}
</script>
