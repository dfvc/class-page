<template>
  <main class="cp-start-page">
    <div class="cp-start-page__banner">
      <cp-banner
        :content="banner"
        class="fluid-container"
      />
    </div>
    <div class="fluid-container">
      <h1 class="fluid-h1 my-6 text-main-700 border-main-700 border-b-2">
        {{ $glossary('activity.LAST_ACTIVITIES_LIST_TITLE') }}
      </h1>
    </div>
    <cp-activity-list
      :activities="activities"
      :max-activities="5"
      :subject-filter="false"
      class="fluid-container"
    />
    <div class="fluid-container flex justify-end">
      <router-link
        :to="activitiesNavigationItem.url"
        :title="activitiesNavigationItem.text"
        class="flex items-center py-2 text-main-900 hover:text-main-500"
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
  Vue,
} from 'vue-property-decorator';
import CpActivityList from '@/components/ActivityList/ActivityList.component.vue';
import CpBanner from '@/components/Banner/Banner.component.vue';
import { activitiesNavigationItem } from '@/routes/main-navigation';
import { IMainNavigationItem } from '@/types/header-menu.type';
import { IBanner } from '@/types/banner.type';
import { ActivitiesFirebaseDataSource } from '@/data-sources/activities/activities.firebase-data-source';
import { ActivitiesDataSource } from '@/data-sources/activities/activities.data-source';

@Component({
  name: 'cp-start-page',
  components: {
    CpActivityList,
    CpBanner,
  },
})
export default class CpStartPage extends Vue {
  /**
   * Data
   */
  public activities: ActivitiesDataSource = new ActivitiesFirebaseDataSource();

  public banner: IBanner = {
    headline: '',
    subHeadline: '',
    link: '',
    bgImage: 'https://c4.wallpaperflare.com/wallpaper/22/796/979/photography-of-body-of-water-with-rocks-gotland-sweden-gotland-sweden-wallpaper-preview.jpg',
  };

  public activitiesNavigationItem: IMainNavigationItem = activitiesNavigationItem;

  /**
   * Events
   */
  public async created(): Promise<void> {
    await this.activities.load();
  }
}
</script>

<style lang="scss" scoped>
  .cp-start-page {
    &__banner {
      background: linear-gradient(
          theme('colors.main.400'),
          theme('colors.main.400') 50%,
          transparent 50%,
          transparent
      );
    }
  }
</style>
