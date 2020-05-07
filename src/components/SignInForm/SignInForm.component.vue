<template>
  <transition
    v-if="isVisible"
    name="cp-sign-in-form__transition"
  >
    <section class="cp-sign-in-form fluid-container fluid-container--with-vertical fixed m-auto bg-white rounded-lg shadow-2xl">
      <cp-content-loading
        v-if="isSigningIn"
        :contained="true"
      />

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
          <form
            :id="formName"
            class="cp-form mt-6"
            @keypress.enter="performSignIn"
          >
            <cp-input
              v-model="formFieldValues.email"
              :name="formFieldNames.email"
              :auto-focus="true"
              :label="$glossary('auth.SIGNIN_EMAIL')"
            />

            <cp-input
              v-model="formFieldValues.password"
              :name="formFieldNames.password"
              :label="$glossary('auth.SIGNIN_PASSWORD')"
              type="password"
            />

            <p
              v-if="authenticationError.length"
              class="mt-6 text-red-700 text-sm"
            >
              {{ authenticationError }}
            </p>

            <div class="flex justify-end mt-6">
              <cp-button
                :label="$glossary('auth.SIGNIN_ENTER')"
                type="button"
                @click.native.prevent="performSignIn"
                class="w-1/3"
              />
            </div>
          </form>
        </div>

        <div class="cp-form-sign-in__providers flex flex-col mt-6 pt-6 border-t border-main-500">
          <cp-button
            type="button"
            @click.native.prevent="performSignIn('google')"
            class="cp-button__auth cp-button__auth--google"
          >
            <cp-icon
              name="google"
              class="h-6 w-6"
            />
            <span>{{ $glossary('auth.SIGNIN_WITH_GOOGLE') }}</span>
          </cp-button>
          <cp-button
            type="button"
            @click.native.prevent="performSignIn('twitter')"
            class="cp-button__auth cp-button__auth--twitter"
          >
            <cp-icon
              name="twitter"
              class="h-6 w-6"
            />
            <span>{{ $glossary('auth.SIGNIN_WITH_TWITTER') }}</span>
          </cp-button>
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
import CpButton from '@/components/Button/Button.component.vue';
import CpContentLoading from '@/components/ContentLoading/ContentLoading.component.vue';
import CpInput from '@/components/Form/Input.component.vue';
import { EEvents } from '@/enums/events.enum';
import { EAuthProviders } from '@/enums/auth-providers.enum';
import { IFormFieldsSignIn } from '@/types/form-sign-in.type';

@Component({
  name: 'cp-sign-in-form',
  components: {
    CpButton,
    CpContentLoading,
    CpInput,
  },
})
export default class CpSignInForm extends Mixins(CpAuth) {
  /**
   * Props
   */
  @Prop({ type: Boolean, default: false })
  public isVisible: boolean;

  /**
   * Data
   */
  public formName: string = 'sign-in-form';

  public formFieldNames: IFormFieldsSignIn = {
    email: `${this.formName}__email`,
    password: `${this.formName}__password`,
  }

  public formFieldValues: IFormFieldsSignIn;

  /**
   * Events
   */
  public created(): void {
    this.resetFormFieldValues();
  }

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
    this.resetFormFieldValues();
    this.resetAuthenticationError();
  }

  public async performSignIn(provider: string = EAuthProviders.EMAIL_PASSWORD): Promise<void> {
    await this.signIn(provider, this.formFieldValues.email, this.formFieldValues.password);

    if (this.isUserAuthenticated) {
      this.onClickCloseButton();
    }
  }

  private resetFormFieldValues(): void {
    this.formFieldValues = {
      email: '',
      password: '',
    };
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

    /deep/ .cp-button {
      $googleColor: #edf2f7;
      $twitterColor: #1da1f2;

      &__auth {
        @apply flex;

        span {
          @apply ml-3 pl-3;
          @apply border-l;
        }

        &:not(:last-of-type) {
          @apply mb-3;
        }

        &--google {
          @apply text-gray-700;
          background-color: $googleColor;

          svg {
            @apply text-gray-700;
          }

          span {
            border-left-color: darken($googleColor, 8%);
          }

          &:hover {
            background-color: lighten($googleColor, 2%);
          }
        }

        &--twitter {
          background-color: $twitterColor;

          span {
            border-left-color: darken($twitterColor, 8%);
          }

          &:hover {
            background-color: lighten($twitterColor, 6%);
          }
        }
      }
    }
  }
</style>
