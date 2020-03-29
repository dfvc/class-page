<template>
  <header
    :class="{ 'cp-header--shadowed': hasShadow }"
    class="cp-header sticky top-0 bg-teal-400"
  >
    <div class="cp-header__inner fluid-container flex items-center py-6">
      <cp-offcanvas-menu class="mr-3 md:mr-4 lg:mr-6" />
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
import CpOffcanvasMenu from '@/components/TheOffcanvasMenu/TheOffcanvasMenu.component.vue';
import CpHeaderTitle from '@/components/TheHeaderTitle/TheHeaderTitle.component.vue';

const SHADOW_TRESHOLD: number = 88;

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
  @Prop({ type: Object, required: true })
  public title: IHeaderTitle;

  /**
   * Computed Props
   */
  public get hasShadow(): boolean {
    return this.scrollTopPosition > SHADOW_TRESHOLD;
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
    &--shadowed {
      &:after {
        @apply absolute top-0;
        @apply h-full w-full;
        @apply shadow-lg;
        content: '';
      }
    }
  }
</style>
