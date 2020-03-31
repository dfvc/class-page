<template>
  <div id="app" class="flex flex-col h-full font-sans antialiased">
    <div class="flex-auto flex-shrink-0">
      <cp-header
        :navigation-items="headerNavigationItems"
        :title="headerTitle"
      />
      <cp-start-page />
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
import CpStartPage from '@/components/TheStartPage/TheStartPage.component.vue';
import { headerTitle } from '@/data/header-title.data';
import { headerNavigationItems } from '@/data/header-navigation.data';
import { IHeaderTitle } from '@/types/header-title.type';
import { IHeaderNavigationItem } from '@/types/header-menu.type';

@Component({
  components: {
    CpFooter,
    CpHeader,
    CpStartPage,
  },
})
export default class App extends Vue {
  /**
   * Props
   */
  @Prop({ type: Array, default: () => headerNavigationItems })
  public headerNavigationItems: IHeaderNavigationItem[];

  @Prop({ type: Object, default: () => headerTitle })
  public headerTitle: IHeaderTitle;
}
</script>

<style lang="scss">
#app {
  background: linear-gradient(
      theme('colors.teal.400'),
      theme('colors.teal.400') theme('spacing.40'),
      theme('colors.white') theme('spacing.40'),
      theme('colors.white')
  );

  @screen md {
    background: linear-gradient(
        theme('colors.teal.400'),
        theme('colors.teal.400') calc(theme('spacing.40') + 16px),
        theme('colors.white') calc(theme('spacing.40') + 16px),
        theme('colors.white')
    );
  }

  @screen lg {
    background: linear-gradient(
        theme('colors.teal.400'),
        theme('colors.teal.400') theme('spacing.48'),
        theme('colors.white') theme('spacing.48'),
        theme('colors.white')
    );
  }
}
</style>
