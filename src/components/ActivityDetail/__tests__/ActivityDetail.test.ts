import {
  shallowMount,
  Wrapper,
} from '@vue/test-utils';
import CpActivityDetail from '@/components/ActivityDetail/ActivityDetail.component.vue';
import { EAttachmentTypes } from '@/enums/attachment-types.enum';
import {
  activity,
  attachments,
  selectors,
} from '@/components/ActivityDetail/__tests__/ActivityDetail.fixture';

describe('CpActivityDetail', () => {
  let wrapper: Wrapper<CpActivityDetail>;

  beforeEach((): void => {
    wrapper = shallowMount(CpActivityDetail, {
      propsData: {
        activity,
        isVisible: true,
      },
      mocks: {
        $glossary: jest.fn(() => ''),
      },
      stubs: {
        CpIcon: '<div />',
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  /**
   * General
   */
  describe('General', () => {
    test('Component mounts without errors', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  /**
   * Computed Props
   */
  describe('Computed Props', () => {
    test.each`
      deliveryDate    | verboseDeliveryDate | expected
      ${{}}           | ${'not defined'}    | ${false}
      ${''}           | ${'empty'}          | ${false}
      ${'31-01-2020'} | ${'not empty'}      | ${true}
    `(
      '"hasDeliveryDate" returns $expected when delivery date is $verboseDeliveryDate',
      ({ deliveryDate, expected }) => {
        wrapper.setProps({
          activity: {
            ...activity,
            deliveryDate,
          },
        });

        expect((wrapper.vm as any).hasDeliveryDate).toBe(expected);
      },
    );

    test.each`
      deliveryMethod        | verboseDeliveryMethod | expected
      ${{}}                 | ${'not defined'}      | ${false}
      ${''}                 | ${'empty'}            | ${false}
      ${'delivery method'}  | ${'not empty'}        | ${true}
    `(
      '"hasDeliveryMethod" returns $expected when delivery method is $verboseDeliveryMethod',
      ({ deliveryMethod, expected }) => {
        wrapper.setProps({
          activity: {
            ...activity,
            deliveryMethod,
          },
        });

        expect((wrapper.vm as any).hasDeliveryMethod).toBe(expected);
      },
    );

    test.each`
      attachments     | verboseAttachments  | expected
      ${{}}           | ${'not defined'}    | ${false}
      ${''}           | ${'empty'}          | ${false}
      ${attachments}  | ${'not empty'}      | ${true}
    `(
      '"hasAttachments" returns $expected when attachments are $verboseAttachments',
      ({ attachments, expected }) => {
        wrapper.setProps({
          activity: {
            ...activity,
            attachments,
          },
        });

        expect((wrapper.vm as any).hasAttachments).toBe(expected);
      },
    );
  });

  /**
   * Methods
   */
  describe('Methods', () => {
    test.each`
      attachment        | verboseAttachment       | expected
      ${attachments[0]} | ${EAttachmentTypes.DOC} | ${'document'}
      ${attachments[1]} | ${EAttachmentTypes.URL} | ${'link'}
      ${attachments[2]} | ${'unknown'}            | ${'attachment'}
      ${{}}             | ${'not defined'}        | ${'attachment'}
    `(
      '"attachmentIcon" returns "$expected" when attachment type is $verboseAttachment',
      ({ attachment, expected }) => {
        expect((wrapper.vm as any).attachmentIcon(attachment)).toEqual(expected);
      },
    );
  });

  /**
   * Template / User Interaction
   */
  describe('Template / User Interaction', () => {
    test.each`
      isVisible | visibility  | expected
      ${true}   | ${'is'}     | ${true}
      ${false}  | ${'is not'} | ${false}
    `(
      'template $visibility rendered when isVisible is $isVisible',
      async ({ isVisible, expected }) => {
        wrapper.setProps({
          ...activity,
          isVisible,
        });
        await wrapper.vm.$nextTick();

        expect((wrapper.vm.$el.childElementCount || 0) > 0).toBe(expected);
      },
    );

    test.each`
      deliveryDate    | condition                       | expected
      ${''}           | ${'not rendered when not set'}  | ${false}
      ${'31-01-2020'} | ${'rendered when set'}          | ${true}
    `(
      'delivery date is $condition',
      async ({ deliveryDate, expected }) => {
        wrapper.setProps({
          activity: {
            ...activity,
            deliveryDate,
          },
        });
        await wrapper.vm.$nextTick();

        expect(wrapper.find(selectors.activityDeliveryDate).exists()).toBe(expected);
      },
    );

    test.each`
      deliveryMethod        | condition                       | expected
      ${''}                 | ${'not rendered when not set'}  | ${false}
      ${'delivery method'}  | ${'rendered when set'}          | ${true}
    `(
      'delivery method is $condition',
      async ({ deliveryMethod, expected }) => {
        wrapper.setProps({
          activity: {
            ...activity,
            deliveryMethod,
          },
        });
        await wrapper.vm.$nextTick();

        expect(wrapper.find(selectors.activityDeliveryMethod).exists()).toBe(expected);
      },
    );

    test.each`
      attachments     | condition                       | expected
      ${''}           | ${'not rendered when not set'}  | ${false}
      ${attachments}  | ${'rendered when set'}          | ${true}
    `(
      'attachments are $condition',
      async ({ attachments, expected }) => {
        wrapper.setProps({
          activity: {
            ...activity,
            attachments,
          },
        });
        await wrapper.vm.$nextTick();

        expect(wrapper.find(selectors.activityAttachments).exists()).toBe(expected);
      },
    );
  });
});
