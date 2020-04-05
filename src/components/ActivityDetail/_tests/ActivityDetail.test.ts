import {
  shallowMount,
  Wrapper,
} from '@vue/test-utils';
import CpActivityDetail from '@/components/ActivityDetail/ActivityDetail.component.vue';
import { EAttachmentTypes } from '@/enums/attachment-types.enum';
import {
  attachments,
  propsData,
} from '@/components/ActivityDetail/_tests/ActivityDetail.fixture';

describe('CpActivityDetail', () => {
  let wrapper: Wrapper<CpActivityDetail>;

  beforeEach((): void => {
    wrapper = shallowMount(CpActivityDetail, { propsData });
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
            ...propsData.activity,
            deliveryDate,
          }
        });
        // @ts-ignore
        expect(wrapper.vm.hasDeliveryDate).toBe(expected);
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
            ...propsData.activity,
            deliveryMethod,
          }
        });
        // @ts-ignore
        expect(wrapper.vm.hasDeliveryMethod).toBe(expected);
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
            ...propsData.activity,
            attachments,
          }
        });
        // @ts-ignore
        expect(wrapper.vm.hasAttachments).toBe(expected);
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
        // @ts-ignore
        expect(wrapper.vm.attachmentIcon(attachment)).toEqual(expected);
      },
    );
  });
});
