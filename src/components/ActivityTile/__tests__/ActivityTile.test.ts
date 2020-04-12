import {
  shallowMount,
  Wrapper,
} from '@vue/test-utils';
import CpActivityTile from '@/components/ActivityTile/ActivityTile.component.vue';
import {
  activity,
  events,
  methodMocks,
  selectors,
} from '@/components/ActivityTile/__tests__/ActivityTile.fixture';

describe('CpActivityTile', () => {
  let wrapper: Wrapper<CpActivityTile>;

  beforeEach((): void => {
    wrapper = shallowMount(CpActivityTile, {
      propsData: {
        activity,
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
    jest.clearAllMocks();
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
   * Computed Properties
   */
  describe('Computed Properties', () => {
    test.each`
      deliveryDate    | verboseDeliveryDate | expected
      ${undefined}    | ${'not defined'}    | ${false}
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
  });

  /**
   * Methods
   */
  describe('Methods', () => {
    test('"openActivityDetailModal" set isActivityDetailModalOpen to true',() => {
      wrapper.setData({
        isActivityDetailModalOpen: false,
      });
      (wrapper.vm as any).openActivityDetailModal();

      expect((wrapper.vm as any).isActivityDetailModalOpen).toBe(true);
    });

    test('"closeActivityDetailModal" set isActivityDetailModalOpen to false',() => {
      wrapper.setData({
        isActivityDetailModalOpen: true,
      });
      (wrapper.vm as any).closeActivityDetailModal();

      expect((wrapper.vm as any).isActivityDetailModalOpen).toBe(false);
    });
  });

  /**
   * Template / User Interaction
   */
  describe('Template / User Interaction', () => {
    test('click event on activity tile triggers "openActivityDetailModal" method',() => {
      wrapper.setMethods({
        openActivityDetailModal: methodMocks.openActivityDetailModal
      });

      expect(methodMocks.openActivityDetailModal).not.toHaveBeenCalled();

      wrapper.find(selectors.activityTile).trigger(events.activityTileClick);
      expect(methodMocks.openActivityDetailModal).toHaveBeenCalled();
    });

    test('close activity modal event triggers "closeActivityDetailModal" method',() => {
      wrapper.setMethods({
        closeActivityDetailModal: methodMocks.closeActivityDetailModal
      });

      expect(methodMocks.closeActivityDetailModal).not.toHaveBeenCalled();

      wrapper.find(selectors.activityDetailModal).vm.$emit(events.closeActivityDetailModal);
      expect(methodMocks.closeActivityDetailModal).toHaveBeenCalled();
    });

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
  });
});
