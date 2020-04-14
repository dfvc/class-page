import {
  createLocalVue,
  shallowMount,
  Wrapper,
} from '@vue/test-utils';
import CpStartPage from '@/components/TheStartPage/TheStartPage.component.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('CpStartPage', () => {
  let wrapper: Wrapper<CpStartPage>;

  beforeEach((): void => {
    wrapper = shallowMount(CpStartPage, {
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
