import {
  shallowMount,
  Wrapper,
} from '@vue/test-utils';
import CpActivityPage from '@/components/TheActivityPage/TheActivityPage.component.vue';

describe('CpActivityPage', () => {
  let wrapper: Wrapper<CpActivityPage>;

  beforeEach((): void => {
    wrapper = shallowMount(CpActivityPage, {
      mocks: {
        $glossary: jest.fn(() => ''),
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
});
