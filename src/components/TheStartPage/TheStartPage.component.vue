<template>
  <div class="cp-startpage">
    <header class="sticky top-0 bg-teal-400">
      <cp-header :title="content.headerTitle" />
    </header>

    <main>
      <cp-banner :content="content.bannerTop" />
      <cp-activity-list
        :activities="content.activities"
        :max-activities="1000"
      />
    </main>

    <footer />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CpActivityList from '@/components/ActivityList/ActivityList.component.vue';
import CpBanner from '@/components/Banner/Banner.vue';
import CpHeader from '@/components/TheHeader/TheHeader.component.vue';
import { startPageContent } from '@/data/start-page.data';
import { IStartPage } from '@/types/start-page.type';

@Component({
  name: 'cp-start-page',
  components: {
    CpActivityList,
    CpBanner,
    CpHeader,
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
