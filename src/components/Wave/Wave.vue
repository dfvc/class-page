<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
    class="cp-wave"
  >
    <path
      :d="pathDraw"
      :style="{ transitionDuration: cssTransitionDuration }"
      fill="currentColor"
      fill-opacity="1"
      class="cp-wave__path"
    />
  </svg>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import { wavePathDraws } from '@/data/wave-paths.data';

const TRANSITION_DURATION_THRESHOLD = 1;

@Component
export default class CpWave extends Vue {
  /**
   * Props
   */
  @Prop({ type: Number, default: TRANSITION_DURATION_THRESHOLD })
  transitionDuration: number;

  /**
   * Computed Props
   */
  public get pathDraw(): string {
    return this.pathDraws[this.pathDrawsIndex];
  }

  public get cssTransitionDuration(): string | boolean {
    if (this.transitionDuration < TRANSITION_DURATION_THRESHOLD) {
      return false;
    }

    return `${this.transitionDuration}s`;
  }

  /**
   * Data
   */
  private pathDraws: string[] = wavePathDraws;

  private pathDrawsIndex: number = 0;

  private timerId: number = Math.floor(Math.random());

  /**
   * Events
   */
  public created(): void {
    if (this.transitionDuration >= TRANSITION_DURATION_THRESHOLD) {
      this.timerId = setInterval(this.updatePathDrawIndex, this.transitionDuration * 1000);
    }
  }

  public mounted(): void {
    this.updatePathDrawIndex();
  }

  public beforeDestroy(): void {
    clearInterval(this.timerId);
  }

  /**
   * Methods
   */
  private updatePathDrawIndex(): void {
    const max = Math.floor(this.pathDraws.length - 1);
    let randomIndex = -1;

    do {
      randomIndex = Math.floor(Math.random() * (0 - max) + max);
    } while (randomIndex === this.pathDrawsIndex);

    this.pathDrawsIndex = randomIndex;
  }
}
</script>

<style lang="scss" scoped>
  .cp-wave {
    &__path {
      transition: d ease-in-out;
    }
  }
</style>
