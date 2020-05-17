<template>
  <div
    :disabled="disabled"
    class="cp-input-file cp-form__element flex items-center border border-solid border-main-400 rounded overflow-hidden cursor-pointer"
    @click="openFileDialog"
  >
    <cp-label
      :name="name"
      :label="label"
      :additionalLabelClassList="additionalLabelClassList"
      class="pointer-events-none"
    />
    <input
      :id="name"
      :value="value"
      :name="name"
      :placeholder="placeholder"
      :class="additionalElementClassList"
      type="text"
      class="flex-1 w-full p-3 pointer-events-none"
    >
    <input
      :accept="accept"
      ref="fileInput"
      type="file"
      class="hidden"
      @input="$emit('input', $event.target.files[0])"
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Prop,
} from 'vue-property-decorator';
import CpLabel from '@/components/Form/Label.component.vue';

@Component({
  name: 'cp-input-file',
  components: {
    CpLabel,
  },
})
export default class CpInputFile extends Vue {
  /**
   * Props
   */
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: String, default: '' })
  public value: string;

  @Prop({ type: String, default: '' })
  public placeholder: string;

  @Prop({ type: String, default: '' })
  public label: string;

  @Prop({ type: String, default: '' })
  public accept: string;

  @Prop({ type: Boolean, default: false })
  public disabled: boolean;

  @Prop({ type: String, required: false })
  public additionalLabelClassList: string;

  @Prop({ type: String, required: false })
  public additionalElementClassList: string;

  /**
   * Methods
   */
  public openFileDialog(): void {
    (this.$refs.fileInput as HTMLInputElement).click();
  }
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
