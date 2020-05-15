<template>
  <div class="cp-offcanvas-subject-edit fixed z-30 mr-3 md:mr-4 lg:mr-6">
    <cp-background-overlay
      :is-visible="isOpen"
      @on-click-background-overlay="closeFlyout"
    />

    <cp-offcanvas-flyout
      :is-visible="isOpen"
      position="right"
      class="text-main-900"
      @on-close-offcanvas-flyout="closeFlyout"
    >
      <h1 class="text-white text-xl pb-2 border-b-2 border-white">
        {{ $glossary('subject-management.EDIT_TITLE') }}
      </h1>

      <form
        :id="formName"
        class="cp-form mt-6"
        @keypress.enter="performSubjectEdit"
      >
        <cp-input
          v-model="formFieldValues.shortName"
          :name="formFieldNames.shortName"
          :label="$glossary('subject-management.EDIT_SHORT_NAME')"
          :disabled="true"
          additional-label-class-list="text-sm text-main-500"
          class="bg-white"
        />
        <cp-input
          v-model="formFieldValues.name"
          :name="formFieldNames.name"
          :label="$glossary('subject-management.EDIT_NAME')"
          additional-label-class-list="text-sm text-main-500"
          class="bg-white"
        />
        <cp-color-picker
          :color="formFieldValues.color"
          @input="updateSubjectColor"
        >
          <cp-input
            v-model="formFieldValues.color"
            :name="formFieldNames.color"
            :label="$glossary('subject-management.EDIT_COLOR')"
            additional-label-class-list="text-sm text-main-500"
            class="bg-white pointer-events-none"
          />
          <div
            class="subject-edit-form__color-swatch absolute top-0 right-0 m-1 h-10 w-10 rounded"
            :style="{ backgroundColor: formFieldValues.color }"
          />
        </cp-color-picker>
        <cp-input
          v-model="formFieldValues.icon"
          :name="formFieldNames.icon"
          :label="$glossary('subject-management.EDIT_ICON')"
          additional-label-class-list="text-sm text-main-500"
          class="bg-white"
        />

        <div class="flex justify-end mt-6">
          <cp-button
            :label="$glossary('subject-management.EDIT_SAVE_BUTTON')"
            type="button"
            @click.native.prevent="performSubjectEdit"
            class="w-1/3"
          />
        </div>
      </form>
    </cp-offcanvas-flyout>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import CpBackgroundOverlay from '@/components/TheBackgroundOverlay/TheBackgroundOverlay.component.vue';
import CpButton from '@/components/Button/Button.component.vue';
import CpColorPicker from '@/components/ColorPicker/ColorPicker.component.vue';
import CpInput from '@/components/Form/Input.component.vue';
import CpOffcanvasFlyout from '@/components/TheOffcanvasFlyout/TheOffcanvasFlyout.component.vue';
import { ISubject } from '@/types/subject.type';
import { IFormFieldsSubjectEdit } from '@/types/form-subject-edit.type';

@Component({
  name: 'cp-offcanvas-subject-edit',
  components: {
    CpBackgroundOverlay,
    CpButton,
    CpColorPicker,
    CpInput,
    CpOffcanvasFlyout,
  },
})
export default class CpOffcanvasSubjectEdit extends Vue {
  /**
   * Props
   */
  @Prop({ type: Object, required: true })
  public subject: ISubject;

  @Prop({ type: Boolean, default: false })
  public isOpen: boolean;

  /**
   * Data
   */
  public formName: string = 'subject-edit-form';

  public formFieldNames: IFormFieldsSubjectEdit = {
    shortName: `${this.formName}__short-name`,
    name: `${this.formName}__name`,
    icon: `${this.formName}__icon`,
    color: `${this.formName}__color`,
  }

  /**
   * Computed Props
   */
  public get formFieldValues(): IFormFieldsSubjectEdit {
    return this.subject;
  }

  /**
   * Methods
   */
  public closeFlyout(): void {
    this.$emit('on-close-offcanvas-subject-edit');
  }

  public performSubjectEdit(): void {
    this.$emit('on-subject-edit-save', this.formFieldValues);
  }

  public updateSubjectColor(color: any): void {
    this.formFieldValues.color = color;
  }
}
</script>

<style lang="scss" scoped>
  .subject-edit-form {
    &__color-swatch {
      top: 1px;
    }
  }
</style>
