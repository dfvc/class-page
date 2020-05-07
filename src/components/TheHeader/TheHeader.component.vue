<template>
  <header
    :class="{ 'cp-header--shadowed': hasShadow }"
    class="cp-header sticky top-0 z-30 bg-main-400"
  >
    <div class="cp-header__inner fluid-container flex items-center py-6">
      <cp-offcanvas-menu :navigation-items="navigationItems" />
      <cp-header-title :title="title" />
      <div
        v-if="isUserAuthenticated"
        class="flex-1 self-end hidden md:block text-right text-xs text-main-100 leading-none tracking-tighter md:tracking-normal"
      >
        {{ authenticatedUserTag }}
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import {
  Component,
  Mixins,
  Prop,
} from 'vue-property-decorator';
import { IHeaderTitle } from '@/types/header-title.type';
import { IMainNavigationItem } from '@/types/header-menu.type';
import CpOffcanvasMenu from '@/components/TheOffcanvasMenu/TheOffcanvasMenu.component.vue';
import CpHeaderTitle from '@/components/TheHeaderTitle/TheHeaderTitle.component.vue';
import CpAuth from '@/mixins/Auth/Auth.mixin.vue';

const SHADOW_THRESHOLD: number = 88;

@Component({
  name: 'cp-header',
  components: {
    CpHeaderTitle,
    CpOffcanvasMenu,
  },
})
export default class CpHeader extends Mixins(CpAuth) {
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

  public get authenticatedUserTag(): string {
    return this.authenticatedUser?.displayName ?? this.authenticatedUser?.email ?? '';
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

  public beforeDestroy(): void {
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
