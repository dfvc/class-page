<template>
  <div class="cp-header-title">
    <h1 class="cp-header-title__headline font-bold text-white leading-tight">
      {{ title.title }}
    </h1>
    <div
      v-if="displaySubHeadline"
      class="cp-header-title__sub-headline text-xs text-main-900 leading-none tracking-tighter md:tracking-normal"
    >
      <span
        v-if="title.subTitleRow1"
        :class="{ 'border-r border-main-600 pr-2 mr-2': title.subTitleRow2 }"
        class="cp-header-title__sub-headline-row1"
      >{{ title.subTitleRow1 }}</span>
      <span
        v-if="title.subTitleRow2"
        class="cp-header-title__sub-headline-row2"
      >{{ title.subTitleRow2 }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import { IHeaderTitle } from '@/types/header-title.type';

@Component({
  name: 'cp-header-title',
})
export default class CpHeaderTitle extends Vue {
  /**
   * Props
   */
  @Prop({ type: Object, required: true })
  public title: IHeaderTitle;

  /**
   * Computed Props
   */
  public displaySubHeadline(): boolean {
    return (this.title.subTitleRow1 || '').length > 0
      || (this.title.subTitleRow2 || '').length > 0;
  }
}
</script>

<style lang="scss" scoped>
  .cp-header-title {
    &__headline {
      @include fluid-type(24px, 36px);
    }
  }
</style>
