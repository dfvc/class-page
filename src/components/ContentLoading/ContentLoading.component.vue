<template>
  <div class="cp-content-loading" />
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
} from 'vue-property-decorator';

@Component({
  name: 'cp-content-loading',
})
export default class CpContentLoading extends Vue {
}
</script>

<style lang="scss" scoped>
  .cp-content-loading {
    @apply relative;
    @apply bg-gray-200;
    @apply rounded;
    @apply overflow-hidden;

    &:after {
      content: '';
      @apply absolute bottom-0 left-0;
      @apply ml-0;
      @apply bg-gray-500;
      height: 3px;
      animation: loader 2s;
      -webkit-animation: loader 2s;
      animation-iteration-count: infinite;
      -webkit-animation-iteration-count: infinite;
    }
  }

  @keyframes loader {
    0% {
      width: 0;
      left: 0;
      right: 0;
    }
    50% {
      width: 100%;
      left: 0;
      right: 0;
    }
    99% {
      width: 0;
      left: 100%;
      right: 0;
    }
  }

  @-webkit-keyframes loader {
    0% {
      width: 0;
      left: 0;
      right: 0;
    }
    50% {
      width: 100%;
      left: 0;
      right: 0;
    }
    99% {
      width: 0;
      left: 100%;
      right: 0;
    }
  }
</style>
