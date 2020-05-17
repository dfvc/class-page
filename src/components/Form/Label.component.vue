<template>
  <label
    :for="name"
    :class="additionalLabelClassList"
    class="mx-3 whitespace-no-wrap"
  >
    {{ label }}
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Prop,
} from 'vue-property-decorator';

@Component({
  name: 'cp-label',
})
export default class CpLabel extends Vue {
  /**
   * Props
   */
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: String, default: '' })
  public label: string;

  @Prop({ type: String, required: false })
  public additionalLabelClassList: string;
}
</script>
