<template>
  <svg
    :class="className"
    xmlns="http://www.w3.org/2000/svg"
  >
    <use
      :xlink:href="iconUrl"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    />
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Prop,
} from 'vue-property-decorator';

@Component
export default class CpIcon extends Vue {
  @Prop({ type: String, required: true })
  public name: string;

  public get iconUrl() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require
    let icon = require(`@/images/${this.name}`);

    if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
      icon = icon.default;
    }

    return icon.url;
  }

  public get className() {
    return `svg-icon svg-icon--${this.name}`;
  }
}
</script>

<style>
    .svg-icon {
      display: inline-flex;
      fill: currentColor;
    }
</style>
