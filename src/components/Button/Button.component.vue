<template>
  <button
    class="cp-button p-3 rounded transition-colors duration-200"
    :class="classList"
  >
    <slot>
      {{ label }}
    </slot>
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
  @Prop({ type: String, default: '' })
  public label: string;

  @Prop({ type: String, default: 'primary' })
  public mode: string;

  /**
   * Computed Props
   */
  public get classList(): string {
    switch (this.mode) {
      case 'link':
        return 'bg-transparent';
      default:
        return 'bg-main-500 hover:bg-main-400 text-white';
    }
  }
}
</script>
