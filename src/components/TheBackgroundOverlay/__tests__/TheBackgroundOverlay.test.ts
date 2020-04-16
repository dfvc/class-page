import {
  shallowMount,
  Wrapper,
} from '@vue/test-utils';
import CpBackgroundOverlay from '@/components/TheBackgroundOverlay/TheBackgroundOverlay.component.vue';
import {
  events,
  methodMocks,
  selectors,
} from '@/components/TheBackgroundOverlay/__tests__/TheBackgroundOverlay.fixture';

describe('CpBackgroundOverlay', () => {
  let wrapper: Wrapper<CpBackgroundOverlay>;

  beforeEach((): void => {
    wrapper = shallowMount(CpBackgroundOverlay);
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
   * Methods
   */
  describe('Methods', () => {
    test(`"clickBackgroundOverlay" emits ${events.onClickBackgroundOverlay} event`, async () => {
      wrapper.setProps({
        isVisible: true,
      });
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted()[events.onClickBackgroundOverlay]).toBeFalsy();

      (wrapper.vm as any).clickBackgroundOverlay();
      expect(wrapper.emitted()[events.onClickBackgroundOverlay]).toBeTruthy();
    });
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
      isVisible,
    });
    await wrapper.vm.$nextTick();

    expect((wrapper.vm.$el.childElementCount || 0) > 0).toBe(expected);
  },
);

    test('click event on overlay triggers "clickBackgroundOverlay" method', async () => {
      wrapper.setProps({
        isVisible: true,
      });
      await wrapper.vm.$nextTick();

      wrapper.setMethods({
        clickBackgroundOverlay: methodMocks.clickBackgroundOverlay,
      });

      expect(methodMocks.clickBackgroundOverlay).not.toHaveBeenCalled();

      wrapper.find(selectors.backgroundOverlay).trigger(events.backgroundOverlayClick);
      expect(methodMocks.clickBackgroundOverlay).toHaveBeenCalled();
    });
  });
});
