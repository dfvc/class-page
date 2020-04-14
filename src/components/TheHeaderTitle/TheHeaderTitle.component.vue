<template>
  <div class="cp-header-title">
    <h1 class="cp-header-title__headline font-bold text-white leading-tight">
      {{ title.headline }}
    </h1>
    <div
      v-if="displaySubHeadline"
      class="cp-header-title__sub-headline text-xs text-teal-900 leading-none tracking-tighter md:tracking-normal"
    >
      <span
        v-if="title.subHeadlineRow1"
        :class="{ 'border-r border-teal-600 pr-2 mr-2': title.subHeadlineRow2 }"
        class="cp-header-title__sub-headline-row1"
      >{{ title.subHeadlineRow1 }}</span>
      <span
        v-if="title.subHeadlineRow2"
        class="cp-header-title__sub-headline-row2"
      >{{ title.subHeadlineRow2 }}</span>
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
    return (this.title.subHeadlineRow1 || '').length > 0
      || (this.title.subHeadlineRow2 || '').length > 0;
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
