<template>
  <transition
    name="cp-offcanvas-navigation__transition"
    mode="in-out"
  >
    <div>
      <nav
        v-show="isVisible"
        class="cp-offcanvas-navigation fixed top-0 bottom-0 left-0 p-8 w-full bg-main-400 text-main-900 text-xl shadow-2xl"
      >
        <button
          :title="$glossary('app.CLOSE')"
          class="cp-offcanvas-navigation__close-button absolute p-0 w-6 h-6"
          @click="onClickCloseButton"
        >
          <cp-icon
            :alt="$glossary('app.CLOSE')"
            name="cross"
            class="text-white h-6 w-6"
          />
        </button>

        <ul class="h-full overflow-y-auto overflow-x-hidden scrolling-touch -mt-2">
          <template v-for="(item, index) in items">
            <li
              :key="index"
              v-if="showNavigationItem(item)"
              class="cp-offcanvas-navigation__item"
            >
              <router-link
                :to="item.url"
                :title="item.text"
                class="cp-offcanvas-navigation__link flex items-center py-3 px-2 border-l-0 border-main-200 hover:border-l-8 transition-all duration-200"
                @click.native="onClickNavigationItem($event, item)"
              >
                <cp-icon
                  :name="item.icon"
                  :alt="item.text"
                  class="mr-2 h-6 w-6"
                />
                {{ item.text }}
              </router-link>
            </li>
          </template>
        </ul>
      </nav>

      <cp-sign-in-modal
        :is-visible="isSignInModalOpen"
        class="cp-offcanvas-navigation__sign-in-modal"
        @on-close-sign-in-modal="closeSignInModal"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import {
  Component,
  Mixins,
  Prop,
} from 'vue-property-decorator';
import { IMainNavigationItem } from '@/types/header-menu.type';
import CpAuth from '@/mixins/Auth/Auth.mixin.vue';
import CpSignInModal from '@/components/SignInModal/SignInModal.component.vue';

@Component({
  name: 'cp-offcanvas-navigation',
  components: {
    CpSignInModal,
  },
})
export default class CpOffcanvasNavigation extends Mixins(CpAuth) {
  /**
   * Props
   */
  @Prop({ type: Array, required: true })
  public items: IMainNavigationItem[];

  @Prop({ type: Boolean, default: false })
  public isVisible: boolean;

  /**
   * Data
   */
  public isSignInModalOpen: boolean = false;

  /**
   * Methods
   */
  public showNavigationItem(item: IMainNavigationItem): boolean {
    if (item.visibility) {
      if (
        (item.visibility.filter((visibility) => visibility === 'auth').length && !this.isUserAuthenticated)
        || (item.visibility.filter((visibility) => visibility === 'non-auth').length && this.isUserAuthenticated)
      ) {
        return false;
      }
    }

    return true;
  }

  public onClickCloseButton(): void {
    this.$emit('on-close-offcanvas-navigation');
  }

  public onClickNavigationItem(event: Event, item: IMainNavigationItem): void {
    if (item.url === '/login') { this.openSignInModal(); }
    if (item.url === '/logout') { this.signOut(); }

    this.$emit('on-close-offcanvas-navigation');
  }

  public openSignInModal(): void {
    this.isSignInModalOpen = true;
  }

  public closeSignInModal(): void {
    this.isSignInModalOpen = false;
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
        @apply border-b border-main-200;
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
