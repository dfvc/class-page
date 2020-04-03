<template>
  <inline-svg
    :src="require(`@/images/icons/${name}.svg`)"
    :aria-label="title.length ? title.length : false"
    class="fill-current h-1 w-1"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Prop,
} from 'vue-property-decorator';
import InlineSvg from 'vue-inline-svg';

@Component({
  name: 'cp-icon',
  components: {
    InlineSvg,
  },
})
export default class CpIcon extends Vue {
  @Prop({ type: String, required: true })
  public name: string;

  @Prop({ type: String, default: '' })
  public title: string;
}
</script>
