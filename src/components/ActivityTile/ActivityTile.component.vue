<template>
  <article
    :style="{ borderColor: activity.subject.color }"
    class="cp-activity-tile relative flex p-3 md:p-4 xl:px-8 my-4 rounded-lg shadow-lg cursor-pointer border-r-8"
    @click="openActivityDetailModal"
  >
    <div class="cp-activity-tile__icon flex-shrink-0 flex items-center">
      <div
        :style="{ backgroundColor: activity.subject.color }"
        class="cp-activity-tile__icon-wrapper rounded-full mr-3 md:mr-4 p-2"
      >
        <cp-icon
          :name="activity.subject.icon"
          :title="activity.subject.name"
          :alt="activity.subject.name"
          class="text-white h-8 w-8"
        />
      </div>
    </div>

    <div class="cp-activity-tile__content flex-grow flex flex-col">
      <v-clamp
        :max-lines="1"
        tag="h1"
        autoresize
        class="cp-activity-tile__headline mb-2 text-lg md:text-xl text-teal-500"
      >
        {{ activity.subject.name }}
      </v-clamp>

      <v-clamp
        :max-lines="2"
        tag="p"
        autoresize
        class="cp-activity-tile__preview text-sm md:text-base text-teal-900"
      >
        {{ activity.description }}
      </v-clamp>

      <div class="cp-activity-tile__footer flex justify-between items-center mt-3">
        <div
          :title="glossary.activity.REQUEST_DATE"
          class="cp-activity-tile__expand flex items-center"
        >
          <cp-icon
            :alt="glossary.activity.REQUEST_DATE"
            name="calendar"
            class="text-teal-700 h-4 w-4 mr-1"
          />
          <span class="text-sm md:text-base text-teal-700 leading-none">
            {{ activity.dateCreation }}
          </span>
        </div>
        <div
          v-if="hasDeliveryDate"
          :title="glossary.activity.DELIVERY_DATE"
          class="cp-activity-tile__delivery-date flex items-center"
        >
          <cp-icon
            :alt="glossary.activity.DELIVERY_DATE"
            name="delivery"
            class="text-teal-700 h-4 w-4 mr-1"
          />
          <span class="text-sm md:text-base text-teal-700 leading-none">
            {{ activity.deliveryDate }}
          </span>
        </div>
      </div>
    </div>

    <div class="cp-activity-tile__detail-tag absolute top-0 right-0">
      <cp-icon
        :title="glossary.app.SEE_DETAIL"
        :alt="glossary.app.EXPAND"
        name="expand"
        class="text-teal-700 h-4 w-4 mt-px mr-px"
      />
    </div>

    <cp-activity-detail-modal
      :activity="activity"
      :is-visible="isActivityDetailModalOpen"
      @on-close-activity-detail-modal="closeActivityDetailModal"
    />
  </article>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import { IActivity } from '@/types/activity.type';
import CpActivityDetailModal from '@/components/ActivityDetailModal/ActivityDetailModal.component.vue';
import VClamp from 'vue-clamp';
import { glossary } from '@/glossary/index.glossary';

@Component({
  name: 'cp-activity-tile',
  components: {
    CpActivityDetailModal,
    VClamp,
  },
})
export default class CpActivityTile extends Vue {
  /**
   * Props
   */
  @Prop({ type: Object, required: true })
  public activity: IActivity;

  /**
   * Computed Prop
   */
  public get hasDeliveryDate(): boolean {
    return this.activity.deliveryDate !== undefined && this.activity.deliveryDate.length > 0;
  }

  /**
   * Data
   */
  public isActivityDetailModalOpen: boolean = false;

  public glossary = glossary;

  /**
   * Methods
   */
  public openActivityDetailModal(): void {
    this.isActivityDetailModalOpen = true;
  }

  public closeActivityDetailModal(): void {
    this.isActivityDetailModalOpen = false;
  }
}
</script>

<style lang="scss" scoped>
  .cp-activity-tile {
    @apply border-t;
    @apply duration-300;
    border-top-color: theme('colors.gray.200') !important;

    &:hover {
      @apply shadow-md;
    }
  }
</style>
