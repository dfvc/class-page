<template>
  <nav class="cp-offcanvas-navigation text-main-900 text-lg">
    <template v-for="(navigationItem, index) in navigation">
      <ul
        v-if="showNavigationList(navigationItem)"
        :key="index"
        class="cp-offcanvas-navigation__group"
      >
        <li
          v-if="hasTitle(navigationItem)"
          class="cp-offcanvas-navigation__item bg-main-200 rounded-tl rounded-tr text-sm pt-1 pr-1 pl-1 text-center"
        >
          {{ navigationItem.title }}
        </li>
        <template v-for="(item, index) in navigationItem.items">
          <li
            :key="index"
            v-if="showNavigationItem(item)"
            class="cp-offcanvas-navigation__item"
          >
            <div
              v-if="item.name === 'signin'"
              :title="item.text"
              class="cp-offcanvas-navigation__link flex items-center py-3 px-2 border-l-0 border-main-200 rounded hover:border-l-8 transition-all duration-200 cursor-pointer"
              @click="onClickNavigationItem($event, item)"
            >
              <cp-icon
                :path="item.icon"
                :alt="item.text"
                class="mr-2 h-6 w-6"
              />
              {{ item.text }}
            </div>
            <router-link
              v-else
              :to="item.url"
              :title="item.text"
              class="cp-offcanvas-navigation__link flex items-center py-3 px-2 border-l-0 border-main-200 hover:border-l-8 transition-all duration-200"
              @click.native="onClickNavigationItem($event, item)"
            >
              <cp-icon
                :path="item.icon"
                :alt="item.text"
                class="mr-2 h-6 w-6"
              />
              {{ item.text }}
            </router-link>
          </li>
        </template>
      </ul>
    </template>
  </nav>
</template>

<script lang="ts">
import {
  Component,
  Mixins,
  Prop,
  Vue,
} from 'vue-property-decorator';
import {
  IMainNavigation,
  IMainNavigationItem,
} from '@/types/header-menu.type';
import CpAuth from '@/mixins/Auth/Auth.mixin.vue';
import CpSignInModal from '@/components/SignInModal/SignInModal.component.vue';
import { EEvents } from '@/enums/events.enum';

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
  public navigation: IMainNavigation[];

  /**
   * Methods
   */
  public hasTitle(navigationItem: IMainNavigation): boolean {
    return navigationItem.title !== undefined && navigationItem.title.length > 0;
  }

  public showNavigationList(navigationItem: IMainNavigation): boolean {
    return navigationItem.items.filter(
      (item: IMainNavigationItem) => this.showNavigationItem(item),
    ).length > 0;
  }

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

  public onClickNavigationItem(event: Event, item: IMainNavigationItem): void {
    if (item.name === 'signin') { Vue.prototype.$event.$emit(EEvents.OPEN_SIGN_IN_MODAL); }
    if (item.name === 'signout') { Vue.prototype.$event.$emit(EEvents.SIGN_OUT); }

    this.$emit('on-click-offcanvas-navigation-item');
  }
}
</script>

<style lang="scss" scoped>
  .cp-offcanvas-navigation {
    &__group {
      &:first-of-type {
        @apply -mt-2;
      }

      &:not(:first-of-type) {
        @apply mt-6;
      }
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
  }
</style>
