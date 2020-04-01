<template>
  <transition
    v-if="isVisible"
    name="cp-offcanvas-navigation__transition"
    mode="in-out"
  >
    <nav class="cp-offcanvas-navigation fixed top-0 bottom-0 left-0 p-8 w-full bg-teal-400 text-teal-900 text-xl shadow-2xl">
      <button
        class="cp-offcanvas-navigation__close-button absolute p-0 w-6 h-6"
        :title="glossary.app.CLOSE"
        @click="onClickCloseButton"
      >
        <img
          :src="require(`@/images/cross.svg`)"
          :alt="glossary.app.CLOSE"
          class="w-6"
        >
      </button>

      <ul class="h-full overflow-y-auto overflow-x-hidden scrolling-touch -mt-2">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="cp-offcanvas-navigation__item"
        >
          <router-link
            :to="item.url"
            :title="item.text"
            class="cp-offcanvas-navigation__link block py-2"
            @click.native="onClickCloseButton"
          >
            {{ item.text }}
          </router-link>
        </li>
      </ul>
    </nav>
  </transition>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import { IHeaderNavigationItem } from '@/types/header-menu.type';
import { glossary } from '@/glossary/index.glossary';

@Component({
  name: 'cp-offcanvas-navigation',
})
export default class CpOffcanvasNavigation extends Vue {
  /**
   * Props
   */
  @Prop({ type: Array, required: true })
  public items: IHeaderNavigationItem[];

  @Prop({ type: Boolean, default: false })
  public isVisible: boolean;

  /**
   * Data
   */
  public glossary = glossary;

  /**
   * Methods
   */
  public onClickCloseButton(): void {
    this.$emit('on-close-offcanvas-navigation');
  }
}
</script>

<style lang="scss" scoped>
  .cp-offcanvas-navigation {
    max-width: 375px;

    &__close-button {
      right: theme('spacing.8');
    }

    &__item {
      &:not(:last-of-type) {
        @apply border-b border-teal-300;
      }
    }

    &__transition-enter-active,
    &__transition-leave-active {
      @apply transition-transform duration-300 ease-in-out;
    }

    &__transition-enter,
    &__transition-leave-to {
      @apply transform -translate-x-full;
    }
  }
</style>
