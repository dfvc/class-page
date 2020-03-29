<template>
  <div class="cp-offcanvas-menu">
    <button
      type="button"
      title="Menu"
      class="cp-offcanvas-menu__trigger flex flex-col justify-between items-center p-4 rounded-full w-12 h-12 bg-teal-400 shadow-lg"
    >
      <span class="cp-offcanvas-menu__trigger-bar h-1/2 w-5 bg-white" />
      <span class="cp-offcanvas-menu__trigger-bar h-1/2 w-5 bg-white" />
      <span class="cp-offcanvas-menu__trigger-bar h-1/2 w-5 bg-white" />
    </button>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';

@Component({
  name: 'cp-offcanvas-menu',
})
export default class CpOffcanvasMenu extends Vue {}
</script>
