<template>
  <cp-content-loading
    v-if="isLoading"
    class="my-4 h-32"
  />
  <article
    v-else
    :style="{ borderColor: activity.subject.color }"
    class="cp-activity-tile relative flex p-3 md:p-4 xl:px-8 my-4 rounded-lg shadow-lg cursor-pointer border-r-8 border-t duration-300 hover:shadow-md group"
    @click="openActivityDetailModal"
  >
    <div class="cp-activity-tile__icon flex-shrink-0 flex items-center">
      <div
        :style="{ backgroundColor: activity.subject.color }"
        class="cp-activity-tile__icon-wrapper rounded-full mr-3 md:mr-4 p-2"
      >
        <cp-icon
          :path="activity.subject.icon"
          :title="activity.subject.name"
          :alt="activity.subject.name"
          class="text-white h-8 w-8"
        />
      </div>
    </div>

    <div class="cp-activity-tile__content flex-grow flex flex-col items-start">
      <v-clamp
        :max-lines="1"
        tag="h1"
        autoresize
        class="cp-activity-tile__headline mb-2 text-lg md:text-xl text-main-500 group-hover:pl-2 duration-200"
      >
        {{ activity.subject.name }}
      </v-clamp>

      <v-clamp
        :max-lines="2"
        tag="p"
        autoresize
        class="cp-activity-tile__preview w-full text-sm md:text-base text-main-900"
      >
        {{ activity.description }}
      </v-clamp>

      <div class="cp-activity-tile__footer flex justify-between items-center w-full mt-3">
        <div
          :title="$glossary('activity.REQUEST_DATE')"
          class="cp-activity-tile__expand flex items-center"
        >
          <cp-icon
            :alt="$glossary('activity.REQUEST_DATE')"
            path="calendar"
            class="text-main-700 h-4 w-4 mr-1"
          />
          <span class="text-sm md:text-base text-main-700 leading-none">
            {{ activity.dateCreation }}
          </span>
        </div>
        <div
          v-if="hasDeliveryDate"
          :title="$glossary('activity.DELIVERY_DATE')"
          class="cp-activity-tile__delivery-date flex items-center"
        >
          <cp-icon
            :alt="$glossary('activity.DELIVERY_DATE')"
            path="delivery"
            class="text-main-700 h-4 w-4 mr-1"
          />
          <span class="text-sm md:text-base text-main-700 leading-none">
            {{ activity.deliveryDate }}
          </span>
        </div>
      </div>
    </div>

    <div class="cp-activity-tile__detail-tag absolute top-0 right-0">
      <cp-icon
        :title="$glossary('app.SEE_DETAIL')"
        :alt="$glossary('app.EXPAND')"
        path="expand"
        class="text-main-700 h-4 w-4 mt-px mr-px"
      />
    </div>

    <cp-activity-detail-modal
      :activity="activity"
      :is-visible="isActivityDetailModalOpen"
      class="cp-activity-tile__detail-modal"
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
import CpContentLoading from '@/components/ContentLoading/ContentLoading.component.vue';
import VClamp from 'vue-clamp';

@Component({
  name: 'cp-activity-tile',
  components: {
    CpActivityDetailModal,
    CpContentLoading,
    VClamp,
  },
})
export default class CpActivityTile extends Vue {
  /**
   * Props
   */
  @Prop({ type: Object, required: true })
  public activity: IActivity;

  @Prop({ type: Boolean, default: false })
  public isLoading: boolean;

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
    $root: &;

    border-top-color: theme('colors.gray.200') !important;
    background-color: rgba(255, 255, 255, .85);

    &__headline {
      &:after {
        @apply block;
        @apply w-full;
        @apply bg-main-500;
        @apply transform -translate-x-full;
        @apply transition-transform duration-300 ease-in-out;
        content: '';
        height: 2px;
      }
    }

    &:hover {
      #{$root}__headline {
        &:after {
          @apply translate-x-0;
        }
      }
    }
  }
</style>
