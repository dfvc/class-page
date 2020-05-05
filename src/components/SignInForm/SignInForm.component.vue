<template>
  <transition
    v-if="isVisible"
    name="cp-sign-in-form__transition"
  >
    <section class="cp-sign-in-form fluid-container fluid-container--with-vertical fixed m-auto bg-white rounded-lg shadow-2xl">
      <div class="cp-sign-in-form__content flex flex-col h-full overflow-y-auto scrolling-touch">
        <div class="cp-sign-in-form__header sticky top-0 flex justify-between items-center bg-main-500 rounded-lg">
          <h1 class="cp-sign-in-form__headline flex-grow text-lg md:text-xl text-white p-3">
            {{ $glossary('auth.SIGNIN') }}
          </h1>
          <button
            class="cp-sign-in-form__close-button flex-shrink-0 flex justify-between items-center mx-3 p-0 w-6 h-6"
            :title="$glossary('app.CLOSE')"
            @click.stop="onClickCloseButton"
          >
            <cp-icon
              :alt="$glossary('app.CLOSE')"
              name="cross"
              class="text-white h-6 w-6"
            />
          </button>
        </div>

        <div class="cp-sign-in-form__body flex-grow">
          FORM
          <p @click="submitSignInForm">
            LOGIN
          </p>
        </div>
      </div>
    </section>
  </transition>
</template>

<script lang="ts">
import {
  Component,
  Mixins,
  Prop,
  Vue,
} from 'vue-property-decorator';
import CpAuth from '@/mixins/Auth/Auth.mixin.vue';
import { EEvents } from '@/enums/events.enum';

@Component({
  name: 'cp-sign-in-form',
})
export default class CpSignInForm extends Mixins(CpAuth) {
  /**
   * Props
   */
  @Prop({ type: Boolean, default: false })
  public isVisible: boolean;

  /**
   * Events
   */
  public mounted(): void {
    Vue.prototype.$event.$on(EEvents.SIGN_OUT, () => {
      this.signOut();
    });
  }

  /**
   * Methods
   */
  public onClickCloseButton(): void {
    this.$emit('on-close-sign-in-form');
  }

  public submitSignInForm(): void {
    this.signIn();
    this.onClickCloseButton();
  }
}
</script>

<style lang="scss" scoped>
  .cp-sign-in-form {
    right: theme('spacing.3');
    left: theme('spacing.3');
    max-width: calc(theme('screens.sm') - theme('spacing.8') - theme('spacing.8'));

    @screen md {
      right: theme('spacing.4');
      left: theme('spacing.4');
    }

    @screen xl {
      right: theme('spacing.8');
      left: theme('spacing.8');
    }

    &__transition-enter-active {
      @apply transition transition-opacity duration-300 ease-out;
      animation: bounce-in .2s;
    }

    &__transition-leave-active {
      @apply transition transition-opacity duration-300 ease-in;
      animation: bounce-in .35s reverse;
    }

    &__transition-enter,
    &__transition-leave-to {
      @apply opacity-0;
    }
  }
</style>
