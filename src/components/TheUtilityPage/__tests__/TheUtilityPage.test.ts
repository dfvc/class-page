import {
  shallowMount,
  Wrapper,
} from '@vue/test-utils';
import CpUtilityPage from '@/components/TheUtilityPage/TheUtilityPage.component.vue';

describe('CpUtilityPage', () => {
  let wrapper: Wrapper<CpUtilityPage>;

  beforeEach((): void => {
    wrapper = shallowMount(CpUtilityPage);
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
