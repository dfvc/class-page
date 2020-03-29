<template>
  <div class="cp-activity-detail-modal cursor-default">
    <cp-background-overlay
      :is-visible="isVisible"
      @on-click-background-overlay="clickBackgroundOverlay"
    />
    <cp-activity-detail
      :activity="activity"
      :is-visible="isVisible"
      @on-close-activity-detail="closeActivityDetail"
    />
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';
import { IActivity } from '@/types/activity.type';
import CpActivityDetail from '@/components/ActivityDetail/ActivityDetail.component.vue';
import CpBackgroundOverlay from '@/components/TheBackgroundOverlay/TheBackgroundOverlay.component.vue';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

@Component({
  name: 'cp-activity-detail-modal',
  components: {
    CpActivityDetail,
    CpBackgroundOverlay,
  },
})
export default class CpActivityDetailModal extends Vue {
  /**
   * Props
   */
  @Prop({ type: Object, required: true })
  public activity: IActivity;

  @Prop({ type: Boolean, default: false })
  public isVisible: boolean;

  @Prop({ type: Boolean, default: true })
  public closeOnClickOutside: boolean;

  /**
   * Events
   */
  @Watch('isVisible')
  public onIsVisibleChange() {
    if (this.isVisible) {
      disableBodyScroll(this.$el);
    } else {
      enableBodyScroll(this.$el);
    }
  }

  public mounted(): void {
    if (this.isVisible) {
      disableBodyScroll(this.$el);
    }
  }

  public beforeDestroy(): void {
    clearAllBodyScrollLocks();
  }

  /**
   * Methods
   */
  public closeActivityDetail(): void {
    this.$emit('on-close-activity-detail-modal');
  }

  public clickBackgroundOverlay(): void {
    if (this.closeOnClickOutside) {
      this.closeActivityDetail();
    }
  }
}
</script>
