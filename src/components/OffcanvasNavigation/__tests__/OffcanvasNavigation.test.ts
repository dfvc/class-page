import {
  createLocalVue,
  shallowMount,
  Wrapper,
} from '@vue/test-utils';
import CpOffcanvasNavigation from '@/components/OffcanvasNavigation/OffcanvasNavigation.component.vue';
import {
  events,
  items,
  methodMocks,
  selectors,
} from '@/components/OffcanvasNavigation/__tests__/OffcanvasNavigation.fixture';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('CpOffcanvasNavigation', () => {
  let wrapper: Wrapper<CpOffcanvasNavigation>;

  beforeEach((): void => {
    wrapper = shallowMount(CpOffcanvasNavigation, {
      propsData: {
        items,
      },
      mocks: {
        $glossary: jest.fn(() => ''),
      },
      stubs: {
        CpIcon: '<div />',
      },
      localVue,
      router,
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
   * Methods
   */
  describe('Methods', () => {
    test(`"onClickCloseButton" emits ${events.closeOffcanvasNavigation} event`, () => {
      (wrapper.vm as any).onClickCloseButton();

      expect(wrapper.emitted()[events.closeOffcanvasNavigation]).toBeTruthy();
    });
  });

  /**
   * Template / User Interaction
   */
  describe('Template / User Interaction', () => {
    test('click event on close button triggers "onClickCloseButton" method', async () => {
      wrapper.setProps({
        items: {
          ...items,
        },
        isVisible: true,
      });
      wrapper.setMethods({
        onClickCloseButton: methodMocks.onClickCloseButton,
      });

      await wrapper.vm.$nextTick();
      expect(methodMocks.onClickCloseButton).not.toHaveBeenCalled();

      wrapper.find(selectors.offcanvasNavigationCloseButton).trigger(events.offcanvasNavigationCloseButtonClick);
      expect(methodMocks.onClickCloseButton).toHaveBeenCalled();
    });

    test('click event on link/item triggers "onClickCloseButton" method', async () => {
      wrapper.setProps({
        items: {
          ...items,
        },
        isVisible: true,
      });
      wrapper.setMethods({
        onClickCloseButton: methodMocks.onClickCloseButton,
      });

      await wrapper.vm.$nextTick();
      expect(methodMocks.onClickCloseButton).not.toHaveBeenCalled();

      wrapper.find(selectors.offcanvasNavigationLink).trigger(events.offcanvasNavigationLinkClick);
      expect(methodMocks.onClickCloseButton).toHaveBeenCalled();
    });
  });
});
