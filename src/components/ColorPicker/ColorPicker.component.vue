<template>
  <v-swatches
    v-model="value"
    :wrapper-style="{ top: '0', right: '0' }"
    swatches="text-advanced"
    class="cp-color-picker"
    @input="onInput"
  >
    <template v-slot:trigger>
      <slot />
    </template>
  </v-swatches>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Prop,
  Watch,
} from 'vue-property-decorator';
import VSwatches from 'vue-swatches';

@Component({
  name: 'cp-color-picker',
  components: {
    VSwatches,
  },
})
export default class CpColorPicker extends Vue {
  /**
   * Props
   */
  @Prop({ type: String, default: '' })
  public color: string;

  /**
   * Data
   */
  public value: string = '';

  /**
   * Events
   */
  @Watch('color')
  public onColorChange() {
    this.value = this.color;
  }

  /**
   * Methods
   */
  public onInput(): void {
    this.$emit('input', this.value);
  }
}
</script>

<style lang="scss">
  @import 'node_modules/vue-swatches/dist/vue-swatches';
</style>
