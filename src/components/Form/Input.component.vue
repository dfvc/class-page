<template>
  <div
    :disabled="disabled"
    class="cp-input cp-form__element flex items-center border border-solid border-main-400 rounded overflow-hidden"
  >
    <label
      :for="name"
      :class="additionalLabelClassList"
      class="mx-3 whitespace-no-wrap"
    >
      {{ label }}
    </label>
    <input
      :id="name"
      :value="value"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :autofocus="autoFocus"
      :class="additionalElementClassList"
      class="flex-1 w-full p-3"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Prop,
} from 'vue-property-decorator';

@Component({
  name: 'cp-input',
})
export default class CpInput extends Vue {
  /**
   * Props
   */
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: String, default: 'text' })
  public type: string;

  @Prop({ type: String, default: '' })
  public value: string;

  @Prop({ type: String, default: '' })
  public placeholder: string;

  @Prop({ type: Boolean, default: false })
  public autoFocus: boolean;

  @Prop({ type: String, default: '' })
  public label: string;

  @Prop({ type: Boolean, default: false })
  public disabled: boolean;

  @Prop({ type: String, required: false })
  public additionalLabelClassList: string;

  @Prop({ type: String, required: false })
  public additionalElementClassList: string;
}
</script>

<style lang="scss" scoped>
  .cp-input {
    input {
      &:focus {
        @apply outline-none shadow-none border-0;
      }
    }

    &[disabled] {
      @apply pointer-events-none;
      opacity: .5;
    }
  }
</style>
