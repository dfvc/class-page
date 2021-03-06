import {
  shallowMount,
  Wrapper,
} from '@vue/test-utils';
import CpActivityDetailModal from '@/components/ActivityDetailModal/ActivityDetailModal.component.vue';
import {
  activity,
  events,
  methodMocks,
  selectors,
} from '@/components/ActivityDetailModal/__tests__/ActivityDetailModal.fixture';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

jest.mock('body-scroll-lock');

describe('CpActivityDetailModal', () => {
  let wrapper: Wrapper<CpActivityDetailModal>;

  beforeEach((): void => {
    wrapper = shallowMount(CpActivityDetailModal, {
      propsData: {
        activity,
        isVisible: true,
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
   * Events
   */
  describe('Events', () => {
    test('"enableBodyScroll" is called when isVisible changes to false', async () => {
      wrapper.setProps({
        activity: {
          ...activity,
        },
        isVisible: false,
      });
      await wrapper.vm.$nextTick();

      expect(enableBodyScroll).toHaveBeenCalledWith(wrapper.vm.$el);
    });

    test('"disableBodyScroll" is called when isVisible changes to true', async () => {
      wrapper.setProps({
        activity: {
          ...activity,
        },
        isVisible: true,
      });
      await wrapper.vm.$nextTick();

      expect(disableBodyScroll).toHaveBeenCalledWith(wrapper.vm.$el);
    });

    test.each`
      isVisible | action              | expected
      ${true}   | ${'is called'}      | ${1}
      ${false}  | ${'is not called'}  | ${0}
    `(
  '"disableBodyScroll" $action when mounting the component if isVisible is $isVisible',
  ({ isVisible, expected }) => {
    jest.clearAllMocks();
    expect(disableBodyScroll).toHaveBeenCalledTimes(0);

    wrapper = shallowMount(CpActivityDetailModal, {
      propsData: {
        activity,
        isVisible,
      },
    });

    expect(disableBodyScroll).toHaveBeenCalledTimes(expected);
  },
);

    test('"clearAllBodyScrollLocks" is called before the component is destroyed', async () => {
      jest.clearAllMocks();
      expect(clearAllBodyScrollLocks).not.toHaveBeenCalled();

      wrapper.destroy();

      expect(clearAllBodyScrollLocks).toHaveBeenCalled();
    });
  });

  /**
   * Methods
   */
  describe('Methods', () => {
    test(`"closeActivityDetail" emits ${events.onCloseActivityDetailModal} event`, () => {
      (wrapper.vm as any).closeActivityDetail();

      expect(wrapper.emitted()[events.onCloseActivityDetailModal]).toBeTruthy();
    });

    test.each`
      closeOnClickOutside | action            | expected
      ${true}             | ${'call'}         | ${1}
      ${false}            | ${'do not call'}  | ${0}
    `(
  '"clickBackgroundOverlay" $action "closeActivityDetail" when closeOnClickOutside is $closeOnClickOutside',
  async ({ closeOnClickOutside, expected }) => {
    wrapper.setProps({
      activity: {
        ...activity,
      },
      closeOnClickOutside,
    });

    wrapper.setMethods({
      closeActivityDetail: methodMocks.closeActivityDetail,
    });

    await wrapper.vm.$nextTick();
    (wrapper.vm as any).clickBackgroundOverlay();

    expect(methodMocks.closeActivityDetail).toHaveBeenCalledTimes(expected);
  },
);
  });

  /**
   * Template / User Interaction
   */
  describe('Template / User Interaction', () => {
    test('"on-click-background-overlay" event triggers "clickBackgroundOverlay" method', () => {
      wrapper.setMethods({
        clickBackgroundOverlay: methodMocks.clickBackgroundOverlay,
      });

      expect(methodMocks.clickBackgroundOverlay).not.toHaveBeenCalled();

      wrapper.find(selectors.CpBackgroundOverlay).vm.$emit(events.onClickBackgroundOverlay);
      expect(methodMocks.clickBackgroundOverlay).toHaveBeenCalled();
    });

    test('"on-close-activity-detail" event triggers "closeActivityDetail" method', () => {
      wrapper.setMethods({
        closeActivityDetail: methodMocks.closeActivityDetail,
      });

      expect(methodMocks.closeActivityDetail).not.toHaveBeenCalled();

      wrapper.find(selectors.CpActivityDetail).vm.$emit(events.onCloseActivityDetail);
      expect(methodMocks.closeActivityDetail).toHaveBeenCalled();
    });
  });
});
