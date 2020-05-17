<template>
  <transition
    :name="`cp-offcanvas-flyout__transition-${position}`"
    mode="in-out"
  >
    <aside
      v-show="isVisible"
      :style="sizeStyling"
      :class="positioningClassList"
      class="cp-offcanvas-flyout fixed p-8 w-full bg-main-400 h-full shadow-2xl overflow-y-auto overflow-x-hidden scrolling-touch"
    >
      <button
        :title="$glossary('app.CLOSE')"
        class="cp-offcanvas-flyout__close-button absolute right-0 z-10 p-0 w-6 h-6"
        @click="onClickCloseButton"
      >
        <cp-icon
          :alt="$glossary('app.CLOSE')"
          path="cross"
          class="text-white h-6 w-6"
        />
      </button>
      <slot />
    </aside>
  </transition>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import { EOffcanvasFlyoutPositioning } from '@/enums/offcanvas-flyout.enum';

@Component({
  name: 'cp-offcanvas-flyout',
})
export default class CpOffcanvasFlyout extends Vue {
  /**
   * Props
   */
  @Prop({ type: Boolean, default: false })
  public isVisible: boolean;

  @Prop({ type: String, default: 'left' })
  public position: string;

  @Prop({ type: Number, default: 375 })
  public maxSize: number;

  /**
   * Computed Props
   */
  public get positioningClassList(): string {
    switch (this.position) {
      case EOffcanvasFlyoutPositioning.LEFT:
      default:
        return 'top-0 bottom-0 left-0';
      case EOffcanvasFlyoutPositioning.RIGHT:
        return 'top-0 bottom-0 right-0';
      case EOffcanvasFlyoutPositioning.TOP:
        return 'top-0 right-0 left-0';
      case EOffcanvasFlyoutPositioning.BOTTOM:
        return 'bottom-0 right-0 left-0';
    }
  }

  public get sizeStyling(): object {
    return this.position === EOffcanvasFlyoutPositioning.LEFT || this.position === EOffcanvasFlyoutPositioning.RIGHT
      ? { maxWidth: `${this.maxSize}px` }
      : { maxHeight: `${this.maxSize}px` };
  }

  /**
   * Methods
   */
  public onClickCloseButton(): void {
    this.$emit('on-close-offcanvas-flyout');
  }
}
</script>

<style lang="scss" scoped>
  .cp-offcanvas-flyout {
    &--left,
    &--right {
      max-width: 375px;
    }

    &--top,
    &--bottom {
      max-height: 375px;
    }

    &__close-button {
      right: theme('spacing.8');
    }

    &__transition-left-enter-active,
    &__transition-left-leave-active,
    &__transition-right-enter-active,
    &__transition-right-leave-active,
    &__transition-top-enter-active,
    &__transition-top-leave-active,
    &__transition-bottom-enter-active,
    &__transition-bottom-leave-active {
      @apply transition-transform duration-300 ease-in-out;
    }

    &__transition-left-enter,
    &__transition-left-leave-to,
    &__transition-right-enter,
    &__transition-right-leave-to {
      @apply transform;
    }

    &__transition-left-enter,
    &__transition-left-leave-to {
      @apply -translate-x-full;
    }

    &__transition-right-enter,
    &__transition-right-leave-to {
      @apply translate-x-full;
    }

    &__transition-top-enter,
    &__transition-top-leave-to {
      @apply -translate-y-full;
    }

    &__transition-bottom-enter,
    &__transition-bottom-leave-to {
      @apply translate-y-full;
    }
  }
</style>
