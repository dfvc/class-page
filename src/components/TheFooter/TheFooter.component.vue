<template>
  <div class="cp-footer mt-6 bg-teal-400">
    <div class="cp-footer__inner fluid-container py-6 text-teal-800 text-sm text-center">
      Página de Tarefas Escolares da Turma 5ºC
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
