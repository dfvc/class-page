<template>
  <main class="cp-activity-page fluid-container">
    <h1 class="fluid-h1 my-6 bg-white text-main-700 border-main-700 border-b-2">
      {{ $glossary('activity.ACTIVITY_LIST_TITLE') }}
    </h1>
    <cp-activity-list :activities="content.activities" />
  </main>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import CpActivityList from '@/components/ActivityList/ActivityList.component.vue';
import { activityPageContent } from '@/data/activity-page.data';
import { IStartPage } from '@/types/start-page.type';

@Component({
  name: 'cp-activity-page',
  components: {
    CpActivityList,
  },
})
export default class CpActivityPage extends Vue {
  /**
   * Props
   */
  @Prop({ type: Object, default: () => activityPageContent })
  public content: IStartPage;
}
</script>
