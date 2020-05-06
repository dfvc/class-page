<template>
  <button class="cp-button p-3 rounded bg-main-600 text-white hover:bg-main-500">
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
}
</script>
