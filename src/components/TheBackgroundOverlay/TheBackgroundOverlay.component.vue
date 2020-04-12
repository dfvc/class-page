<template>
  <transition
    v-if="isVisible"
    name="cp-background-overlay__transition"
  >
    <div
      class="cp-background-overlay fixed top-0 right-0 bottom-0 left-0 bg-gray-600 opacity-50"
      @click.stop="clickBackgroundOverlay()"
    />
  </transition>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

@Component({
  name: 'cp-background-overlay',
})
export default class CpBackgroundOverlay extends Vue {
  /**
   * Props
   */
  @Prop({ type: Boolean, default: false })
  public isVisible: boolean;

  /**
   * Methods
   */
  public clickBackgroundOverlay(): void {
    this.$emit('on-click-background-overlay');
  }
}
</script>

<style lang="scss" scoped>
  .cp-background-overlay {

    &__transition-enter-active,
    &__transition-leave-active {
      @apply transition transition-opacity duration-300 ease-in-out;
    }

    &__transition-enter,
    &__transition-leave-to {
      @apply opacity-0;
    }
  }
</style>
