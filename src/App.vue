<template>
  <div id="app" class="cp-app-body flex flex-col h-full font-sans antialiased">
    <div class="relative flex-auto flex-shrink-0 pb-6">
      <div class="relative z-20">
        <cp-header
          :navigation-items="mainNavigationItems"
          :title="headerTitle"
        />
        <router-view />
      </div>
      <cp-wave
        :transition-duration="20"
        class="absolute right-0 bottom-0 left-0 z-10 text-main-400"
      />
    </div>
    <cp-footer class="flex-shrink-0" />
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import CpFooter from '@/components/TheFooter/TheFooter.component.vue';
import CpHeader from '@/components/TheHeader/TheHeader.component.vue';
import CpWave from '@/components/Wave/Wave.vue';
import { headerTitle } from '@/data/header-title.data';
import { mainNavigationItems } from '@/data/main-navigation.data';
import { IHeaderTitle } from '@/types/header-title.type';
import { IMainNavigationItem } from '@/types/header-menu.type';

@Component({
  components: {
    CpFooter,
    CpHeader,
    CpWave,
  },
})
export default class App extends Vue {
  /**
   * Props
   */
  @Prop({ type: Array, default: () => mainNavigationItems })
  public mainNavigationItems: IMainNavigationItem[];

  @Prop({ type: Object, default: () => headerTitle })
  public headerTitle: IHeaderTitle;
}
</script>

<style lang="scss">
  .cp-app-body {
    /*background: linear-gradient(*/
    /*    theme('colors.main.400'),*/
    /*    theme('colors.main.400') theme('spacing.40'),*/
    /*    theme('colors.white') theme('spacing.40'),*/
    /*    theme('colors.white')*/
    /*);*/

    /*@screen md {*/
    /*  background: linear-gradient(*/
    /*      theme('colors.main.400'),*/
    /*      theme('colors.main.400') calc(theme('spacing.40') + theme('spacing.4')),*/
    /*      theme('colors.white') calc(theme('spacing.40') + theme('spacing.4')),*/
    /*      theme('colors.white')*/
    /*  );*/
    /*}*/

    /*@screen lg {*/
    /*  background: linear-gradient(*/
    /*      theme('colors.main.400'),*/
    /*      theme('colors.main.400') theme('spacing.48'),*/
    /*      theme('colors.white') theme('spacing.48'),*/
    /*      theme('colors.white')*/
    /*  );*/
    /*}*/
  }
</style>
