import {
  shallowMount,
  Wrapper,
} from '@vue/test-utils';
import CpAboutPage from '@/components/TheAboutPage/TheAboutPage.component.vue';

describe('CpAboutPage', () => {
  let wrapper: Wrapper<CpAboutPage>;

  beforeEach((): void => {
    wrapper = shallowMount(CpAboutPage);
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
