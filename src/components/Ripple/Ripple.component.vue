<template>
  <span
    v-if="isPerformingAnimation"
    :style="{
      left: `${rippleData.x}px`,
      top: `${rippleData.y}px`,
    }"
    class="cp-ripple absolute z-0 bg-white opacity-75 pointer-events-none rounded-full transform -translate-y-1/2 -translate-x-1/2"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Prop,
  Watch,
} from 'vue-property-decorator';
import { IRipple } from '@/types/ripple.type';

const DEFAULT_ANIMATION_DURATION = 750;

@Component({
  name: 'cp-ripple',
})
export default class CpRipple extends Vue {
  /**
   * Props
   */
  @Prop({ type: Object, required: true })
  public rippleData: IRipple;

  /**
   * Data
   */
  public isPerformingAnimation: boolean = false;

  /**
   * Events
   */
  @Watch('rippleData', { deep: true })
  protected onIsVisibleChange() {
    this.isPerformingAnimation = this.rippleData.isVisible;

    if (this.isPerformingAnimation) {
      setTimeout(() => {
        this.isPerformingAnimation = false;
      }, this.rippleData.duration || DEFAULT_ANIMATION_DURATION);
    }
  }
}
</script>

<style lang="scss" scoped>
  .cp-ripple {
    animation: ripple-animation .75s linear infinite;
  }

  @keyframes ripple-animation {
    0% {
      height: 0;
      width: 0;
    }
    100% {
      height: 2500px;
      width: 2500px;
    }
  }
</style>
