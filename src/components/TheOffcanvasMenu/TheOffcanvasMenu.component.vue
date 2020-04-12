import { disableBodyScroll } from "body-scroll-lock";import { enableBodyScroll } from "body-scroll-lock";
import { disableBodyScroll } from "body-scroll-lock";import { clearAllBodyScrollLocks } from "body-scroll-lock";
<template>
  <div class="cp-offcanvas-menu mr-3 md:mr-4 lg:mr-6">
    <button
      type="button"
      title="Menu"
      class="cp-offcanvas-menu__trigger flex flex-col justify-between items-center p-4 rounded-full w-12 h-12 bg-teal-400 shadow-lg hover:shadow-sm transition-shadow duration-200"
      @click="openMenu"
    >
      <span class="cp-offcanvas-menu__trigger-bar h-1/2 w-5 bg-white" />
      <span class="cp-offcanvas-menu__trigger-bar h-1/2 w-5 bg-white" />
      <span class="cp-offcanvas-menu__trigger-bar h-1/2 w-5 bg-white" />
    </button>

    <cp-background-overlay
      :is-visible="isMenuOpen"
      @on-click-background-overlay="closeMenu"
    />

    <cp-offcanvas-navigation
      :is-visible="isMenuOpen"
      :items="navigationItems"
      @on-close-offcanvas-navigation="closeMenu"
    />
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue, Watch,
} from 'vue-property-decorator';
import { IMainNavigationItem } from '@/types/header-menu.type';
import CpBackgroundOverlay from '@/components/TheBackgroundOverlay/TheBackgroundOverlay.component.vue';
import CpOffcanvasNavigation from '@/components/OffcanvasNavigation/OffcanvasNavigation.component.vue';
import {
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';

@Component({
  name: 'cp-offcanvas-menu',
  components: {
    CpBackgroundOverlay,
    CpOffcanvasNavigation,
  },
})
export default class CpOffcanvasMenu extends Vue {
  /**
   * Props
   */
  @Prop({ type: Array, required: true })
  public navigationItems: IMainNavigationItem[];

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

  public closeMenu(): void {
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
