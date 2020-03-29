<template>
  <div class="cp-banner fluid-container">
    <component
      :is="tag"
      :href="link"
      :style="{ backgroundImage: `url(${content.bgImage})` }"
      class="cp-banner__inner flex flex-col items-center justify-center p-3 md:p-4 xl:p-8 h-32 md:h-40 lg:h-48 bg-white rounded-lg shadow-lg bg-center bg-no-repeat bg-cover"
    >
      <h1
        v-if="hasHeadline"
        class="text-2xl md:text-3xl"
      >
        {{ content.headline }}
      </h1>
      <p
        v-if="hasSubHeadline"
        class="text-base"
      >
        {{ content.subHeadline }}
      </p>
    </component>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import { IBanner } from '@/types/banner.type';

@Component({
  name: 'cp-banner',
})
export default class CpBanner extends Vue {
  /**
   * Props
   */
  @Prop({ type: Object, required: true })
  public content: IBanner;

  /**
   * Computed Props
   */
  public get tag(): string {
    return this.content.link !== undefined && this.content.link.length > 0 ? 'a' : 'div';
  }

  public get link(): string | boolean {
    return this.content.link !== undefined && this.content.link.length > 0
      ? this.content.link
      : false;
  }

  public get hasHeadline(): boolean {
    return this.content.headline !== undefined && this.content.headline.length > 0;
  }

  public get hasSubHeadline(): boolean {
    return this.content.subHeadline !== undefined && this.content.subHeadline.length > 0;
  }
}
</script>
