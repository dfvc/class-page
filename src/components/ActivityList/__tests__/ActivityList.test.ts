import {
  shallowMount,
  Wrapper,
} from '@vue/test-utils';
import CpActivityList from '@/components/ActivityList/ActivityList.component.vue';
import {
  activities,
  events,
  methodMocks,
  selectedSubjects,
  selectors,
} from '@/components/ActivityList/__tests__/ActivityList.fixture';

describe('CpActivityList', () => {
  let wrapper: Wrapper<CpActivityList>;

  beforeEach((): void => {
    wrapper = shallowMount(CpActivityList, {
      propsData: {
        activities,
      },
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

  /**
   * Methods
   */
  describe('Methods', () => {
    test('"subjectSelectionChanged" sets selected subjects data properly', () => {
      expect(wrapper.vm.$data.selectedSubjects).not.toEqual(selectedSubjects);
      (wrapper.vm as any).subjectSelectionChanged(selectedSubjects);
      expect(wrapper.vm.$data.selectedSubjects).toEqual(selectedSubjects);
    });

    test.each`
      selectedSubjects    | activities                                        | condition                                                   | expected
      ${[]}               | ${'all activities'}                               | ${'selected subjects are empty'}                            | ${activities}
      ${selectedSubjects} | ${selectedSubjects[0].shortName + ' activities'}  | ${'selected subjects are ' + selectedSubjects[0].shortName} | ${[activities[0]]}
    `(
      '"filterActivities" returns $activities when $condition',
      ({ selectedSubjects, expected }) => {
        wrapper.setData({
          selectedSubjects,
        });

        expect((wrapper.vm as any).filterActivities(activities)).toEqual(expected);
      },
    );

    test('"sortActivitiesByDateCreation" returns activities properly sorted by creation date', () => {
      expect((wrapper.vm as any).sortActivitiesByDateCreation(activities)).toEqual([...activities].reverse());
    });

    test.each`
      maxActivities | activities          | condition                           | expected
      ${-1}         | ${'all activities'} | ${'maxActivities in not set (< 0)'} | ${activities}
      ${1}          | ${'first activity'} | ${'maxActivities is 1'}             | ${[activities[0]]}
    `(
      '"sliceActivities" returns $activities when $condition',
      ({ maxActivities, expected }) => {
        wrapper.setProps({
          activities: {
            ...activities,
          },
          maxActivities,
        });

        expect((wrapper.vm as any).sliceActivities(activities)).toEqual(expected);
      },
    );
  });

  /**
   * Template / User Interaction
   */
  describe('Template / User Interaction', () => {
    test.each`
      subjectFilter | verboseSubjectFilter  | expected
      ${true}       | ${'is'}               | ${true}
      ${false}      | ${'is not'}           | ${false}
    `(
      'subject dropdown $verboseSubjectFilter rendered when subjectFilter is $subjectFilter',
      async ({ subjectFilter, expected }) => {
        wrapper.setProps({
          activities: {
            ...activities,
          },
          subjectFilter,
        });
        await wrapper.vm.$nextTick();

        expect(wrapper.find(selectors.activityListFilter).exists()).toBe(expected);
      },
    );

    test('"onSelect" event triggers "subjectSelectionChanged" method',() => {
      wrapper.setMethods({
        subjectSelectionChanged: methodMocks.subjectSelectionChanged
      });

      expect(methodMocks.subjectSelectionChanged).not.toHaveBeenCalled();

      wrapper.find(selectors.activityListFilter).vm.$emit(events.onSelectSubjectFilter);
      expect(methodMocks.subjectSelectionChanged).toHaveBeenCalled();
    });
  });
});
