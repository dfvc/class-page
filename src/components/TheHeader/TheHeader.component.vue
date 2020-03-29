<template>
  <div class="cp-header fluid-container flex items-center py-6">
    <cp-offcanvas-menu class="mr-3 md:mr-4 lg:mr-6" />
    <cp-header-title :title="title" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IHeaderTitle } from '@/types/header-title.type';
import CpOffcanvasMenu from '@/components/TheOffcanvasMenu/TheOffcanvasMenu.component.vue';
import CpHeaderTitle from '@/components/TheHeaderTitle/TheHeaderTitle.component.vue';

@Component({
  name: 'cp-header',
  components: {
    CpHeaderTitle,
    CpOffcanvasMenu,
  },
})
export default class CpHeader extends Vue {
  /**
   * Props
   */
  @Prop({ type: Object, required: true })
  public title: IHeaderTitle;
}
</script>

<style lang="scss" scoped>
  .cp-header-title {
    &__headline {
      @include fluid-type(30px, 48px);
    }
  }
</style>
