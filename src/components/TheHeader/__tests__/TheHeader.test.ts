import {
  shallowMount,
  Wrapper,
} from '@vue/test-utils';
import CpHeader from '@/components/TheHeader/TheHeader.component.vue';
import {
  navigationItems,
  title,
} from '@/components/TheHeader/__tests__/TheHeader.fixture';

describe('CpHeader', () => {
  let wrapper: Wrapper<CpHeader>;

  beforeEach((): void => {
    wrapper = shallowMount(CpHeader, {
      propsData: {
        navigationItems,
        title,
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
      scrollTopPosition | verboseScrollTopPosition  | expected
      ${0}              | ${'0'}                    | ${false}
      ${100}            | ${'> 0'}                  | ${true}
    `(
      '"hasShadow" returns $expected when scrollTopPosition is $verboseScrollTopPosition',
      ({ scrollTopPosition, expected }) => {
        wrapper.setData({
          scrollTopPosition,
        });
        expect((wrapper.vm as any).hasShadow).toBe(expected);
      },
    );
  });

  /**
   * Events
   */
  describe('Events', () => {
    test('scroll event listener is added to the window when mounting the component', () => {
      window.addEventListener = jest.fn();

      expect(window.addEventListener).toHaveBeenCalledTimes(0);

      wrapper.destroy();
      wrapper = shallowMount(CpHeader, {
        propsData: {
          navigationItems,
          title,
        },
      });

      expect(window.addEventListener).toHaveBeenCalledTimes(1);
      expect(window.addEventListener).toHaveBeenCalledWith(
        'scroll',
        (wrapper.vm as any).updateScrollTopPosition,
      );
    });
  });

  /**
   * Methods
   */
  describe('Methods', () => {
    test('"updateScrollTopPosition" set scrollTopPosition with document scrollTop value', () => {
      const scrollTopMock = 100;
      document.documentElement.scrollTop = scrollTopMock;

      expect((wrapper.vm as any).scrollTopPosition).toEqual(0);
      (wrapper.vm as any).updateScrollTopPosition();
      expect((wrapper.vm as any).scrollTopPosition).toEqual(scrollTopMock);
    });
  });
});
