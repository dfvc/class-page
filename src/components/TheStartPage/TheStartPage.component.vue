<template>
  <main class="cp-start-page">
    <cp-banner :content="content.bannerTop" />
    <cp-activity-list
      :activities="content.activities"
      :max-activities="1000"
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
import { startPageContent } from '@/data/start-page.data';
import { IStartPage } from '@/types/start-page.type';

@Component({
  name: 'cp-start-page',
  components: {
    CpActivityList,
    CpBanner,
  },
})
export default class CpStartPage extends Vue {
  /**
   * Props
   */
  @Prop({ type: Object, default: () => startPageContent })
  public content: IStartPage;
}
</script>
