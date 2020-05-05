<template>
  <div
    :class="classList"
    class="cp-content-loading bg-gray-200 bg-opacity-50 rounded overflow-hidden"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Prop,
} from 'vue-property-decorator';

@Component({
  name: 'cp-content-loading',
})
export default class CpContentLoading extends Vue {
  @Prop({ type: Boolean, default: false })
  contained: boolean;

  /**
   * Computed Props
   */
  public get classList(): string {
    return this.contained
      ? 'absolute top-0 right-0 bottom-0 left-0 z-10 h-full w-full'
      : 'relative';
  }
}
</script>

<style lang="scss" scoped>
  .cp-content-loading {
    &:after {
      content: '';
      @apply absolute bottom-0 left-0;
      @apply ml-0;
      @apply bg-main-600;
      height: 3px;
      animation: loader 2s;
      -webkit-animation: loader 2s;
      animation-iteration-count: infinite;
      -webkit-animation-iteration-count: infinite;
    }
  }
</style>
