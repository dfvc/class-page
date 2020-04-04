<template>
  <main class="cp-activity-page">
    <cp-banner :content="content.bannerTop" />
    <cp-activity-list
      :activities="content.activities"
      :max-activities="2"
    />
  </main>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import CpActivityList from '@/components/ActivityList/ActivityList.component.vue';
import CpBanner from '@/components/Banner/Banner.vue';
import { activityPageContent } from '@/data/activity-page.data';
import { IStartPage } from '@/types/start-page.type';

@Component({
  name: 'cp-activity-page',
  components: {
    CpActivityList,
    CpBanner,
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
