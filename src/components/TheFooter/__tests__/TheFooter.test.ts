import { shallowMount } from '@vue/test-utils';
import CpFooter from '@/components/TheFooter/TheFooter.component.vue';

describe('CpFooter component', () => {
  test('mount without errors', () => {
    const wrapper = shallowMount(CpFooter);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
