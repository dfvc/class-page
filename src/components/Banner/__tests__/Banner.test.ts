import {
  shallowMount,
  Wrapper,
} from '@vue/test-utils';
import CpBanner from '@/components/Banner/Banner.component.vue';
import { banner, selectors } from '@/components/Banner/__tests__/Banner.fixture';

describe('CpBanner', () => {
  let wrapper: Wrapper<CpBanner>;

  beforeEach((): void => {
    wrapper = shallowMount(CpBanner, {
      propsData: {
        content: banner,
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

  /**
   * Computed Properties
   */
  describe('Computed Properties', () => {
    test.each`
      bannerLink                | verboseBannerLink | expected
      ${'http://www.link.test'} | ${'not empty'}    | ${'a'}
      ${''}                     | ${'empty'}        | ${'div'}
      ${undefined}              | ${'not defined'}  | ${'div'}
    `(
  '"tag" returns "$expected" when banner link is $verboseBannerLink',
  ({ bannerLink, expected }) => {
    wrapper.setProps({
      content: {
        ...banner,
        link: bannerLink,
      },
    });

    expect((wrapper.vm as any).tag).toEqual(expected);
  },
);

    test.each`
      bannerLink                | verboseBannerLink | expected
      ${'http://www.link.test'} | ${'not empty'}    | ${'http://www.link.test'}
      ${''}                     | ${'empty'}        | ${false}
      ${undefined}              | ${'not defined'}  | ${false}
    `(
  '"link" returns "$expected" when banner link is $verboseBannerLink',
  ({ bannerLink, expected }) => {
    wrapper.setProps({
      content: {
        ...banner,
        link: bannerLink,
      },
    });

    expect((wrapper.vm as any).link).toEqual(expected);
  },
);

    test.each`
      bannerHeadline  | verboseBannerHeadline | expected
      ${'Headline'}   | ${'not empty'}        | ${true}
      ${''}           | ${'empty'}            | ${false}
      ${undefined}    | ${'not defined'}      | ${false}
    `(
  '"hasHeadline" returns "$expected" when banner headline is $verboseBannerHeadline',
  ({ bannerHeadline, expected }) => {
    wrapper.setProps({
      content: {
        ...banner,
        headline: bannerHeadline,
      },
    });

    expect((wrapper.vm as any).hasHeadline).toEqual(expected);
  },
);

    test.each`
      bannerSubHeadline | verboseBannerSubHeadline  | expected
      ${'Sub Headline'} | ${'not empty'}            | ${true}
      ${''}             | ${'empty'}                | ${false}
      ${undefined}      | ${'not defined'}          | ${false}
    `(
  '"hasSubHeadline" returns "$expected" when banner subHeadline is $verboseBannerSubHeadline',
  ({ bannerSubHeadline, expected }) => {
    wrapper.setProps({
      content: {
        ...banner,
        subHeadline: bannerSubHeadline,
      },
    });

    expect((wrapper.vm as any).hasSubHeadline).toEqual(expected);
  },
);
  });

  /**
   * Template / User Interaction
   */
  describe('Template / User Interaction', () => {
    test.each`
      bannerHeadline  | condition   | expected
      ${'Headline'}   | ${'is'}     | ${true}
      ${''}           | ${'is not'} | ${false}
    `(
  'headline $condition rendered when banner headline $condition set',
  async ({ bannerHeadline, expected }) => {
    wrapper.setProps({
      content: {
        ...banner,
        headline: bannerHeadline,
      },
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.find(selectors.bannerHeadline).exists()).toBe(expected);
  },
);

    test.each`
      bannerSubHeadline | condition   | expected
      ${'Sub Headline'} | ${'is'}     | ${true}
      ${''}             | ${'is not'} | ${false}
    `(
  'sub-headline $condition rendered when banner subHeadline $condition set',
  async ({ bannerSubHeadline, expected }) => {
    wrapper.setProps({
      content: {
        ...banner,
        subHeadline: bannerSubHeadline,
      },
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.find(selectors.bannerSubHeadline).exists()).toBe(expected);
  },
);
  });
});
