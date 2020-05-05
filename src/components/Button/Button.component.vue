<template>
  <button class="cp-button">
    {{ label }}
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Prop,
} from 'vue-property-decorator';

@Component({
  name: 'cp-button',
})
export default class CpButton extends Vue {
  /**
   * Props
   */
  @Prop({ type: String, required: true })
  public label: string;
}
</script>

<style lang="scss" scoped>
  .cp-button {
    @apply p-3;
    @apply rounded;
    @apply bg-main-600;
    @apply text-white;

    &:hover {
      @apply bg-main-500;
    }
  }
</style>
