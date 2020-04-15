import { disableBodyScroll } from "body-scroll-lock";import { enableBodyScroll } from "body-scroll-lock";
<template>
  <v-select
    v-model="selected"
    :options="options"
    :multiple="multiple"
    :label="label.length ? label : false"
    :placeholder="placeholder"
    :searchable="false"
    class="cp-select"
    @input="onSelect"
  >
    <template
      v-if="labelSelected.length"
      v-slot:selected-option="selected"
    >
     {{ getSelectedLabel(selected) }}
    </template>

    <template v-slot:no-options>
      {{ noMatchesMessage }}
    </template>
  </v-select>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Prop,
} from 'vue-property-decorator';
import vSelect from 'vue-select';

@Component({
  name: 'cp-select',
  components: {
    vSelect,
  },
})
export default class CpSelect extends Vue {
  /**
   * Props
   */
  @Prop({ type: Array, required: true })
  public options: any[];

  @Prop({ type: String, default: '' })
  public label: string;

  @Prop({ type: String, default: '' })
  public labelSelected: string;

  @Prop({ type: String, default: '' })
  public placeholder: string;

  @Prop({ type: String, default: 'Sem resultados' })
  public noMatchesMessage: string;

  @Prop({ type: Boolean, default: false })
  public multiple: boolean;

  /**
   * Data
   */
  public selected: any[] = [];

  /**
   * Methods
   */
  public onSelect(): void {
    this.$emit('onSelect', this.selected);
  }

  public getSelectedLabel(selectedOption: any): any {
    if (typeof selectedOption !== 'object') return selectedOption;

    const key = typeof selectedOption[this.labelSelected] !== 'undefined'
      ? this.labelSelected
      : this.label;

    return selectedOption[key];
  }
}
</script>

<style lang="scss">
  @import 'node_modules/vue-select/src/scss/vue-select.scss';
</style>

<style lang="scss" scoped>
  .cp-select {
    /deep/ .vs {
      &__search {
        @apply text-main-900;

        &::placeholder {
          @apply text-gray-500;
        }
      }

      &__dropdown-option {
        @apply p-3;

        &:hover {
          @apply bg-main-400;
        }

        &--highlight {
          @apply bg-main-400;
        }
      }

      &__dropdown-toggle {
        min-height: theme('spacing.12');
      }

      &__selected {
        @apply border-main-600;
        @apply bg-main-400;
        @apply text-white uppercase;
        min-height: theme('spacing.8');
      }

      &__deselect {
        @apply ml-2;
      }
    }
  }
</style>
