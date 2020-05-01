<template>
  <main class="cp-activity-page fluid-container">
    <h1 class="fluid-h1 my-6 text-main-700 border-main-700 border-b-2">
      {{ $glossary('activity.ACTIVITY_LIST_TITLE') }}
    </h1>
    <cp-activity-list :activities="activities" />
  </main>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import CpActivityList from '@/components/ActivityList/ActivityList.component.vue';
import { ActivitiesFirebaseDataSource } from '@/data-sources/activities/activities.firebase-data-source';
import { ActivitiesDataSource } from '@/data-sources/activities/activities.data-source';

@Component({
  name: 'cp-activity-page',
  components: {
    CpActivityList,
  },
})
export default class CpActivityPage extends Vue {
  /**
   * Data
   */
  public activities: ActivitiesDataSource = new ActivitiesFirebaseDataSource();

  /**
   * Events
   */
  public async created(): Promise<void> {
    await this.activities.load();
  }
}
</script>
