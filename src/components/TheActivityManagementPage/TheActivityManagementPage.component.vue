<template>
  <main class="cp-activity-management-page fluid-container">
    <h1 class="fluid-h1 my-6 text-main-700 border-main-700 border-b-2">
      {{ $glossary('activity.ACTIVITY_MANAGEMENT_LIST_TITLE') }}
    </h1>
<!--    <cp-activity-list :activities="activities" />-->
  </main>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';

@Component({
  name: 'cp-activity-management-page',
})
export default class CpActivityManagementPage extends Vue {
  // /**
  //  * Data
  //  */
  // public activities: ActivitiesDataSource = new ActivitiesFirestoreDataSource();
  //
  // /**
  //  * Events
  //  */
  // public async created(): Promise<void> {
  //   await this.activities.load();
  // }
}
</script>
