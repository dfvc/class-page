<template>
<!--  <inline-svg-->
<!--    :src="require(`@/images/icons/${path}.svg`)"-->
<!--    :aria-label="title.length ? title : false"-->
<!--    class="fill-current h-1 w-1"-->
<!--  />-->
  <img
    ref="imgTag"
    :src="isValidUrl(path) ? path : require(`@/images/icons/${path}.svg`)"
    :aria-label="title.length ? title : false"
    class="fill-current h-1 w-1"
  >
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
  /**
   * Props
   */
  @Prop({ type: String, required: true })
  public path: string;

  @Prop({ type: String, default: '' })
  public title: string;

  /**
   * Events
   */
  public mounted(): void {
    const img = this.$refs.imgTag as HTMLImageElement;
    const imgSrc = img.src;

    fetch(imgSrc)
      .then((res) => res.text())
      .then((data) => {
        const parser = new DOMParser();
        const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg') as SVGElement;

        img.classList.forEach((classItem) => {
          svg.classList.add(classItem);
        });

        if (this.title.length) {
          svg.setAttribute('aria-label', this.title);
        }

        img.replaceWith(svg);
      });
  }

  /**
   * Methods
   */
  private isValidUrl(url: string): boolean {
    const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
      + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
      + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    return pattern.test(url);
  }
}
</script>
