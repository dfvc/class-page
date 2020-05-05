<template>
  <div id="app" class="cp-app-body flex flex-col h-full font-sans antialiased">
    <div class="relative flex-auto flex-shrink-0 pb-6">
      <div class="relative z-20">
        <cp-header
          :navigation-items="mainNavigationItems"
          :title="headerTitle"
        />
        <router-view />
      </div>
      <cp-wave
        v-if="$appConfig.theme.useFooterWaves"
        :transition-duration="20"
        class="absolute right-0 bottom-0 left-0 z-10 text-main-400"
      />
    </div>
    <cp-footer class="flex-shrink-0" />

    <cp-sign-in-modal
      v-show="isSignInModalOpen"
      :is-visible="isSignInModalOpen"
      class="cp-sign-in-modal fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center"
      @on-close-sign-in-modal="closeSignInModal"
    />
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import CpFooter from '@/components/TheFooter/TheFooter.component.vue';
import CpHeader from '@/components/TheHeader/TheHeader.component.vue';
import CpSignInModal from '@/components/SignInModal/SignInModal.component.vue';
import CpWave from '@/components/Wave/Wave.vue';
import {
  homeNavigationItem,
  mainNavigationItems,
} from '@/routes/main-navigation';
import { IHeaderTitle } from '@/types/header-title.type';
import { IMainNavigationItem } from '@/types/header-menu.type';
import { EEvents } from '@/enums/events.enum';

@Component({
  components: {
    CpFooter,
    CpHeader,
    CpSignInModal,
    CpWave,
  },
})
export default class App extends Vue {
  /**
   * Data
   */
  public mainNavigationItems: IMainNavigationItem[] = mainNavigationItems;

  public headerTitle: IHeaderTitle = {
    title: Vue.prototype.$glossary('header.TITLE'),
    titleLink: homeNavigationItem,
    subTitleRow1: Vue.prototype.$glossary('header.SUBTITLE_ROW1'),
    subTitleRow2: Vue.prototype.$glossary('header.SUBTITLE_ROW2'),
  };

  public isSignInModalOpen: boolean = false;

  /**
   * Events
   */
  public mounted(): void {
    Vue.prototype.$event.$on(EEvents.OPEN_SIGN_IN_MODAL, () => {
      this.openSignInModal();
    });
  }

  /**
   * Methods
   */
  public openSignInModal(): void {
    this.isSignInModalOpen = true;
  }

  public closeSignInModal(): void {
    this.isSignInModalOpen = false;
  }
}
</script>
