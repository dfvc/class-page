<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <CpStartPage />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CpStartPage from '@/components/TheStartPage/TheStartPage.component.vue';

@Component({
  components: {
    CpStartPage,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  @apply h-full;
  @apply font-sans antialiased;
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
