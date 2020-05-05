<template>
  <div class="cp-sign-in-modal z-40 cursor-default">
    <cp-background-overlay
      :is-visible="isVisible"
      @on-click-background-overlay="clickBackgroundOverlay"
    />
    <cp-sign-in-form
      :is-visible="isVisible"
      @on-close-sign-in-form="closeSignInDetail"
    />
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';
import CpBackgroundOverlay from '@/components/TheBackgroundOverlay/TheBackgroundOverlay.component.vue';
import CpSignInForm from '@/components/SignInForm/SignInForm.component.vue';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

@Component({
  name: 'cp-sign-in-modal',
  components: {
    CpBackgroundOverlay,
    CpSignInForm,
  },
})
export default class CpSignInModal extends Vue {
  /**
   * Props
   */
  @Prop({ type: Boolean, default: false })
  public isVisible: boolean;

  @Prop({ type: Boolean, default: true })
  public closeOnClickOutside: boolean;

  /**
   * Events
   */
  @Watch('isVisible')
  public onIsVisibleChange() {
    if (this.isVisible) {
      disableBodyScroll(
        this.$el,
        { reserveScrollBarGap: true },
      );
    } else {
      enableBodyScroll(this.$el);
    }
  }

  public mounted(): void {
    if (this.isVisible) {
      disableBodyScroll(
        this.$el,
        { reserveScrollBarGap: true },
      );
    }
  }

  public beforeDestroy(): void {
    clearAllBodyScrollLocks();
  }

  /**
   * Methods
   */
  public closeSignInDetail(): void {
    this.$emit('on-close-sign-in-modal');
  }

  public clickBackgroundOverlay(): void {
    if (this.closeOnClickOutside) {
      this.closeSignInDetail();
    }
  }
}
</script>
