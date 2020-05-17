<template>
  <div class="cp-offcanvas-subject-edit fixed z-30 mr-3 md:mr-4 lg:mr-6">
    <cp-background-overlay
      :is-visible="isOpen"
      @on-click-background-overlay="closeFlyout"
    />

    <cp-offcanvas-flyout
      :is-visible="isOpen"
      position="right"
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
        <div class="relative">
          <cp-input-file
            v-model="formFieldValues.icon"
            type="file"
            :name="formFieldNames.icon"
            :label="$glossary('subject-management.EDIT_ICON')"
            accept=".svg"
            additional-label-class-list="text-sm text-main-500"
            class="bg-white"
            @input="updateIcon"
          />
          <div
            v-if="iconFilePreviewSrc.length"
            class="subject-edit-form__icon-preview absolute top-0 right-0 flex justify-center items-center m-1 h-10 w-10 border border-main-400 bg-white rounded pointer-events-none"
          >
            <cp-icon
              :path="iconFilePreviewSrc"
              :alt="$glossary('subject-management.EDIT_ICON_PREVIEW')"
              class="h-6 w-6"
            />
          </div>
        </div>

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
  Mixins,
  Prop,
  Watch,
} from 'vue-property-decorator';
import CpBackgroundOverlay from '@/components/TheBackgroundOverlay/TheBackgroundOverlay.component.vue';
import CpButton from '@/components/Button/Button.component.vue';
import CpColorPicker from '@/components/ColorPicker/ColorPicker.component.vue';
import CpInput from '@/components/Form/Input.component.vue';
import CpInputFile from '@/components/Form/InputFile.component.vue';
import CpOffcanvasFlyout from '@/components/TheOffcanvasFlyout/TheOffcanvasFlyout.component.vue';
import CpStorage from '@/mixins/Auth/Storage.mixin.vue';
import { ISubject } from '@/types/subject.type';
import { IFormFieldsSubjectEdit } from '@/types/form-subject-edit.type';

@Component({
  name: 'cp-offcanvas-subject-edit',
  components: {
    CpBackgroundOverlay,
    CpButton,
    CpColorPicker,
    CpInput,
    CpInputFile,
    CpOffcanvasFlyout,
  },
})
export default class CpOffcanvasSubjectEdit extends Mixins(CpStorage) {
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

  public iconFilePreviewSrc: string = '';

  private iconFile: File|null = null;

  /**
   * Computed Props
   */
  public get formFieldValues(): IFormFieldsSubjectEdit {
    return this.subject;
  }

  /**
   * Events
   */
  @Watch('isOpen')
  public onIsOpenChange() {
    if (this.isOpen) {
      this.iconFilePreviewSrc = this.subject.icon;
    } else {
      this.iconFile = null;
      this.iconFilePreviewSrc = '';
    }
  }

  /**
   * Methods
   */
  public closeFlyout(): void {
    this.$emit('on-close-offcanvas-subject-edit');
  }

  public performSubjectEdit(): void {
    this.$emit('on-subject-edit-save', this.formFieldValues, this.iconFile);
  }

  public updateSubjectColor(color: string): void {
    this.formFieldValues.color = color;
  }

  public updateIcon(iconFile: File): void {
    this.formFieldValues.icon = this.getFileNameFromPath(iconFile.name);
    this.iconFilePreviewSrc = '';
    this.iconFile = iconFile;
  }
}
</script>

<style lang="scss" scoped>
  .subject-edit-form {
    &__color-swatch,
    &__icon-preview {
      top: 1px;
    }
  }
</style>
