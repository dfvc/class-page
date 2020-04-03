<template>
  <transition
    name="cp-offcanvas-navigation__transition"
    mode="in-out"
  >
    <nav
      v-show="isVisible"
      class="cp-offcanvas-navigation fixed top-0 bottom-0 left-0 p-8 w-full bg-teal-400 text-teal-900 text-xl shadow-2xl"
    >
      <button
        class="cp-offcanvas-navigation__close-button absolute p-0 w-6 h-6"
        :title="glossary.app.CLOSE"
        @click="onClickCloseButton"
      >
        <cp-icon
          :alt="glossary.app.CLOSE"
          name="cross"
          class="text-white h-6 w-6"
        />
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
            class="cp-offcanvas-navigation__link flex items-center p-2 border-l-0 border-teal-200 hover:border-l-8 transition-all duration-200"
            @click.native="onClickCloseButton"
          >
            <cp-icon
              :name="item.icon"
              :alt="item.text"
              class="mr-2 h-6 w-6"
            />
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
        @apply border-b border-teal-200;
      }
    }

    .router-link-exact-active {
      @apply text-white;
      @apply pointer-events-none;
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
