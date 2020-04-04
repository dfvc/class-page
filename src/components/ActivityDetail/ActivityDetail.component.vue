<template>
  <transition
    v-if="isVisible"
    name="cp-activity-detail__transition"
  >
    <section class="cp-activity-detail fluid-container fluid-container--with-vertical fixed m-auto bg-white rounded-lg shadow-2xl">
      <div class="cp-activity-detail__content flex flex-col h-full overflow-y-auto scrolling-touch">
        <div class="cp-activity-detail__header sticky top-0 flex justify-between items-center bg-teal-500 rounded-lg">
          <cp-icon
            :name="activity.subject.icon"
            :title="activity.subject.name"
            :alt="activity.subject.name"
            class="flex-shrink-0 ml-3 text-white h-8 w-8"
          />
          <h1 class="cp-activity-tile__headline flex-grow text-lg md:text-xl text-white p-3">
            {{ activity.subject.name }}
          </h1>
          <button
            class="cp-activity-detail__close-button flex-shrink-0 flex justify-between items-center mx-3 p-0 w-6 h-6"
            :title="glossary.app.CLOSE"
            @click.stop="$emit('on-close-activity-detail')"
          >
            <cp-icon
              :alt="glossary.app.CLOSE"
              name="cross"
              class="text-white h-6 w-6"
            />
          </button>
        </div>

        <div class="cp-activity-detail__body flex-grow">
          <div class="cp-activity-detail__item mt-6">
            <h2 class="cp-activity-detail__item-headline mb-1 underline text-lg md:text-xl text-teal-500">
              {{ glossary.activity.DESCRIPTION }}
            </h2>
            <div
              v-html="activity.description"
              class="cp-activity-detail__item-content text-sm md:text-base text-teal-900"
            />
          </div>

          <div
            v-if="hasDeliveryDate || hasDeliveryMethod"
            class="cp-activity-detail__item mt-6"
          >
            <h2 class="cp-activity-detail__item-headline mb-1 underline text-lg md:text-xl text-teal-500">
              {{ glossary.activity.DELIVERY }}
            </h2>
            <div class="cp-activity-detail__item-content text-sm md:text-base text-teal-900">
              <ul class="pl-8 list-disc">
                <li v-if="hasDeliveryDate">
                  {{ glossary.activity.DATE }}: {{ activity.deliveryDate }}
                </li>
                <li v-if="hasDeliveryMethod">
                  {{ glossary.activity.METHOD }}: <span v-html="activity.deliveryMethod" />
                </li>
              </ul>
            </div>
          </div>

          <div
            v-if="hasAttachments"
            class="cp-activity-detail__item mt-6"
          >
            <h2 class="cp-activity-detail__item-headline mb-1 underline text-lg md:text-xl text-teal-500">
              {{ glossary.activity.ATTACHMENTS }}
            </h2>
            <div class="cp-activity-detail__item-content text-sm md:text-base text-teal-900">
              <ul class="pl-4">
                <li
                  v-for="(attachment, index) in activity.attachments"
                  :key="index"
                >
                  <a
                    :href="attachment.url"
                    :title="glossary.activity.ATTACHMENT"
                    target="_blank"
                    class="flex items-center"
                  >
                    <cp-icon
                      :name="attachmentIcon(attachment)"
                      :alt="glossary.activity.ATTACHMENT"
                      class="mr-2 text-teal-700 h-5 w-5"
                    />
                    <span>{{ attachment.text }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="cp-activity-detail__footer">
          <p class="mt-6 text-right text-xs text-gray-500">
            {{ glossary.activity.REGISTRATION }} {{ activity.dateCreation }}
          </p>
        </div>
      </div>
    </section>
  </transition>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import {
  IActivity,
  IActivityAttachment,
} from '@/types/activity.type';
import CpBackgroundOverlay from '@/components/TheBackgroundOverlay/TheBackgroundOverlay.component.vue';
import { EAttachmentTypes } from '@/enums/attachment-types.enum';
import { glossary } from '@/glossary/index.glossary';

@Component({
  name: 'cp-activity-detail',
  components: {
    CpBackgroundOverlay,
  },
})
export default class CpActivityDetail extends Vue {
  /**
   * Props
   */
  @Prop({ type: Object, required: true })
  public activity: IActivity;

  @Prop({ type: Boolean, default: false })
  public isVisible: boolean;

  /**
   * Computed Prop
   */
  public get hasDeliveryDate(): boolean {
    return this.activity.deliveryDate !== undefined && this.activity.deliveryDate.length > 0;
  }

  public get hasDeliveryMethod(): boolean {
    return this.activity.deliveryMethod !== undefined && this.activity.deliveryMethod.length > 0;
  }

  public get hasAttachments(): boolean {
    return this.activity.attachments !== undefined && this.activity.attachments.length > 0;
  }

  /**
   * Data
   */
  public glossary = glossary;

  /**
   * Methods
   */
  public attachmentIcon(attachment: IActivityAttachment): string {
    switch (attachment.type) {
      case EAttachmentTypes.DOC:
        return 'document';
      case EAttachmentTypes.URL:
        return 'link';
      default:
        return 'attachment';
    }
  }
}
</script>

<style lang="scss" scoped>
  .cp-activity-detail {
    top: theme('spacing.3');
    right: theme('spacing.3');
    bottom: theme('spacing.3');
    left: theme('spacing.3');
    max-width: calc(theme('screens.xl') - theme('spacing.8') - theme('spacing.8'));

    @screen md {
      top: theme('spacing.4');
      right: theme('spacing.4');
      bottom: theme('spacing.4');
      left: theme('spacing.4');
    }

    @screen xl {
      top: theme('spacing.8');
      right: theme('spacing.8');
      bottom: theme('spacing.8');
      left: theme('spacing.8');
    }

    &__transition-enter-active {
      @apply transition transition-opacity duration-300 ease-out;
      animation: bounce-in .2s;
    }

    &__transition-leave-active {
      @apply transition transition-opacity duration-300 ease-in;
      animation: bounce-in .35s reverse;
    }

    &__transition-enter,
    &__transition-leave-to {
      @apply opacity-0;
    }
  }
</style>
