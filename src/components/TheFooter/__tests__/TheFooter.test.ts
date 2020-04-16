import {
  shallowMount,
  Wrapper,
} from '@vue/test-utils';
import CpFooter from '@/components/TheFooter/TheFooter.component.vue';

describe('CpFooter', () => {
  let wrapper: Wrapper<CpFooter>;

  beforeEach((): void => {
    wrapper = shallowMount(CpFooter, {
      mocks: {
        $glossary: jest.fn(() => ''),
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
