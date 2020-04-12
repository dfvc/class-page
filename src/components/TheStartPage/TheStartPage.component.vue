<template>
  <main class="cp-start-page">
    <div class="cp-start-page__banner">
      <cp-banner
        :content="content.bannerTop"
        class="fluid-container"
      />
    </div>
    <div class="fluid-container">
      <h1 class="fluid-h1 my-6 bg-white text-teal-700 border-teal-700 border-b-2">
        {{ $glossary('activity.LAST_ACTIVITIES_LIST_TITLE') }}
      </h1>
    </div>
    <cp-activity-list
      :activities="content.activities"
      :max-activities="5"
      :subject-filter="false"
      class="fluid-container"
    />
    <div class="fluid-container flex justify-end">
      <router-link
        :to="activitiesNavigationItem.url"
        :title="activitiesNavigationItem.text"
        class="flex items-center py-2 text-teal-900 hover:text-teal-500"
      >
        {{ $glossary('activity.SEE_ALL_ACTIVITIES') }}
        <cp-icon
          name="fast-forward"
          :alt="activitiesNavigationItem.text"
          class="ml-1 h-4 w-4"
        />
      </router-link>
    </div>
  </main>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import CpActivityList from '@/components/ActivityList/ActivityList.component.vue';
import CpBanner from '@/components/Banner/Banner.component.vue';
import { startPageContent } from '@/data/start-page.data';
import { activitiesNavigationItem } from '@/data/main-navigation.data';
import { IStartPage } from '@/types/start-page.type';
import { IMainNavigationItem } from '@/types/header-menu.type';

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

  /**
   * Data
   */
  public activitiesNavigationItem: IMainNavigationItem = activitiesNavigationItem;
}
</script>

<style lang="scss" scoped>
  .cp-start-page {
    &__banner {
      background: linear-gradient(
          theme('colors.teal.400'),
          theme('colors.teal.400') 50%,
          theme('colors.white') 50%,
          theme('colors.white')
      );
    }
  }
</style>
