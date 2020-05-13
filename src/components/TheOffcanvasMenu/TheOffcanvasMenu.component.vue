<template>
  <div class="cp-offcanvas-menu mr-3 md:mr-4 lg:mr-6">
    <button
      type="button"
      title="Menu"
      class="cp-offcanvas-menu__trigger flex flex-col justify-between items-center p-4 rounded-full w-12 h-12 bg-main-400 shadow-lg hover:shadow-sm transition-shadow duration-200"
      @click="openMenu"
    >
      <span class="cp-offcanvas-menu__trigger-bar h-1/2 w-5 bg-white" />
      <span class="cp-offcanvas-menu__trigger-bar h-1/2 w-5 bg-white" />
      <span class="cp-offcanvas-menu__trigger-bar h-1/2 w-5 bg-white" />
    </button>

    <cp-background-overlay
      :is-visible="isMenuOpen"
      @on-click-background-overlay="closeFlyout"
    />

    <cp-offcanvas-flyout
      :is-visible="isMenuOpen"
      @on-close-offcanvas-flyout="closeFlyout"
    >
      <cp-offcanvas-navigation
        :navigation="navigation"
        @on-click-offcanvas-navigation-item="closeFlyout"
      />
    </cp-offcanvas-flyout>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';
import { IMainNavigation } from '@/types/header-menu.type';
import CpOffcanvasFlyout from '@/components/TheOffcanvasFlyout/TheOffcanvasFlyout.component.vue';
import CpBackgroundOverlay from '@/components/TheBackgroundOverlay/TheBackgroundOverlay.component.vue';
import CpOffcanvasNavigation from '@/components/OffcanvasNavigation/OffcanvasNavigation.component.vue';
import {
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';

@Component({
  name: 'cp-offcanvas-menu',
  components: {
    CpOffcanvasFlyout,
    CpBackgroundOverlay,
    CpOffcanvasNavigation,
  },
})
export default class CpOffcanvasMenu extends Vue {
  /**
   * Props
   */
  @Prop({ type: Array, required: true })
  public navigation: IMainNavigation[];

  /**
   * Data
   */
  public isMenuOpen: boolean = false;

  /**
   * Methods
   */
  public openMenu(): void {
    this.isMenuOpen = true;
  }

  public closeFlyout(): void {
    this.isMenuOpen = false;
  }

  /**
   * Events
   */
  @Watch('isMenuOpen')
  public onIsVisibleChange() {
    if (this.isMenuOpen) {
      disableBodyScroll(
        this.$el,
        { reserveScrollBarGap: true },
      );
    } else {
      enableBodyScroll(this.$el);
    }
  }
}
</script>
