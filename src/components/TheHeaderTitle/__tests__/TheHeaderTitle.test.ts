import {
  shallowMount,
  Wrapper,
} from '@vue/test-utils';
import CpHeaderTitle from '@/components/TheHeaderTitle/TheHeaderTitle.component.vue';
import {selectors, title} from '@/components/TheHeaderTitle/__tests__/TheHeaderTitle.fixture';

describe('CpHeaderTitle', () => {
  let wrapper: Wrapper<CpHeaderTitle>;

  beforeEach((): void => {
    wrapper = shallowMount(CpHeaderTitle, {
      propsData: {
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

  /**
   * Computed Properties
   */
  describe('Computed Properties', () => {
    test.each`
      subHeadlineRow1 | subHeadlineRow2 | verboseSubHeadlineRow1  | verboseSubHeadlineRow2  | expected
      ${''}           | ${''}           | ${'empty'}              | ${'empty'}              | ${false}
      ${undefined}    | ${undefined}    | ${'not defined'}        | ${'not defined'}        | ${false}
      ${'subtitle 1'} | ${''}           | ${'defined'}            | ${'empty'}              | ${true}
      ${'subtitle 1'} | ${undefined}    | ${'defined'}            | ${'not defined'}        | ${true}
      ${''}           | ${'subtitle 2'} | ${'empty'}              | ${'defined'}            | ${true}
      ${undefined}    | ${'subtitle 2'} | ${'not defined'}        | ${'defined'}            | ${true}
      ${'subtitle 1'} | ${'subtitle 2'} | ${'defined'}            | ${'defined'}            | ${true}
    `(
      '"displaySubHeadline" returns $expected when subHeadlineRow1 is $verboseSubHeadlineRow1 and subHeadlineRow2 is $verboseSubHeadlineRow2',
      ({ subHeadlineRow1, subHeadlineRow2, expected }) => {
        wrapper.setProps({
          title: {
            ...title,
            subHeadlineRow1,
            subHeadlineRow2,
          },
        });

        expect((wrapper.vm as any).displaySubHeadline()).toBe(expected);
      },
    );
  });

  /**
   * Events / User Interaction
   */
  describe('Events / User Interaction', () => {
    test.each`
      displaySubHeadline  | render      | expected
      ${true}             | ${'is'}     | ${true}
      ${false}            | ${'is not'} | ${false}
    `(
      'sub-headline $render rendered when displaySubHeadline is $displaySubHeadline',
      ({ displaySubHeadline, expected }) => {
        wrapper.destroy();
        wrapper = shallowMount(CpHeaderTitle, {
          propsData: {
            title,
          },
          computed: {
            displaySubHeadline: {
              set: jest.fn(),
              get: jest.fn(() => displaySubHeadline),
            },
          },
        });

        expect((wrapper.find(selectors.subHeadline)).exists()).toBe(expected);
      },
    );

    test.each`
      subHeadlineRow1 | verboseSubHeadlineRow1  | render      | expected
      ${''}           | ${'empty'}              | ${'is not'} | ${false}
      ${undefined}    | ${'not defined'}        | ${'is not'} | ${false}
      ${'subtitle 1'} | ${'defined'}            | ${'is'}     | ${true}
    `(
      'sub-headline first row $render rendered when subHeadlineRow1 is $verboseSubHeadlineRow1',
      async ({ subHeadlineRow1, expected }) => {
        wrapper.setProps({
          title: {
            ...title,
            subHeadlineRow1,
          },
        });
        await wrapper.vm.$nextTick();

        expect((wrapper.find(selectors.subHeadlineRow1)).exists()).toBe(expected);
      },
    );

    test.each`
      subHeadlineRow2 | verboseSubHeadlineRow2  | render      | expected
      ${''}           | ${'empty'}              | ${'is not'} | ${false}
      ${undefined}    | ${'not defined'}        | ${'is not'} | ${false}
      ${'subtitle 1'} | ${'defined'}            | ${'is'}     | ${true}
    `(
      'sub-headline second row $render rendered when subHeadlineRow2 is $verboseSubHeadlineRow2',
      async ({ subHeadlineRow2, expected }) => {
        wrapper.setProps({
          title: {
            ...title,
            subHeadlineRow2,
          },
        });
        await wrapper.vm.$nextTick();

        expect((wrapper.find(selectors.subHeadlineRow2)).exists()).toBe(expected);
      },
    );
  });
});
