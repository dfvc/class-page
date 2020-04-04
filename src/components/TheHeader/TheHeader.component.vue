<template>
  <header
    :class="{ 'cp-header--shadowed': hasShadow }"
    class="cp-header sticky top-0 z-30 bg-teal-400"
  >
    <div class="cp-header__inner fluid-container flex items-center py-6">
      <cp-offcanvas-menu :navigation-items="navigationItems" />
      <cp-header-title :title="title" />
    </div>
  </header>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import { IHeaderTitle } from '@/types/header-title.type';
import { IMainNavigationItem } from '@/types/header-menu.type';
import CpOffcanvasMenu from '@/components/TheOffcanvasMenu/TheOffcanvasMenu.component.vue';
import CpHeaderTitle from '@/components/TheHeaderTitle/TheHeaderTitle.component.vue';

const SHADOW_THRESHOLD: number = 88;

@Component({
  name: 'cp-header',
  components: {
    CpHeaderTitle,
    CpOffcanvasMenu,
  },
})
export default class CpHeader extends Vue {
  /**
   * Props
   */
  @Prop({ type: Array, required: true })
  public navigationItems: IMainNavigationItem[];

  @Prop({ type: Object, required: true })
  public title: IHeaderTitle;

  /**
   * Computed Props
   */
  public get hasShadow(): boolean {
    return this.scrollTopPosition > SHADOW_THRESHOLD;
  }

  /**
   * Data
   */
  public scrollTopPosition: number = 0;

  /**
   * Events
   */
  public mounted(): void {
    window.addEventListener('scroll', this.updateScrollTopPosition);
  }

  public onBeforeDestroy(): void {
    window.removeEventListener('scroll', this.updateScrollTopPosition);
  }

  /**
   * Methods
   */
  private updateScrollTopPosition(): void {
    this.scrollTopPosition = document.documentElement.scrollTop;
  }
}
</script>

<style lang="scss" scoped>
  .cp-header {
    &--shadoweddd {
      &:after {
        @apply absolute top-0;
        @apply h-full w-full;
        @apply shadow-lg;
        content: '';
      }
    }
  }
</style>
