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
  });

  /**
   * General
   */
  describe('General', () => {
    test('Component mounts without errors', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });
});
