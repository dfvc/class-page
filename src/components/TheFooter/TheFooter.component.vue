<template>
  <div class="cp-footer bg-main-400">
    <div class="cp-footer__inner fluid-container py-6 text-main-800 text-sm text-center">
      {{ $glossary('footer.DISCLAIMER') }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';

@Component({
  name: 'cp-footer',
})
export default class CpFooter extends Vue {}
</script>
