export const activities = [
  {
    subject: {
      name: 'Subject Name 1',
      shortName: 'SN1',
      icon: 'subjects/iconfile',
      color: '#f00',
    },
    description: 'activity description 1',
    dateCreation: '01-01-2020',
    dateChanged: '',
  },
  {
    subject: {
      name: 'Subject Name 2',
      shortName: 'SN2',
      icon: 'subjects/iconfile',
      color: '#0f0',
    },
    description: 'activity description2',
    dateCreation: '02-01-2020',
    dateChanged: '',
  },
  {
    subject: {
      name: 'Subject Name 3',
      shortName: 'SN3',
      icon: 'subjects/iconfile',
      color: '#00f',
    },
    description: 'activity description 3',
    dateCreation: '03-01-2020',
    dateChanged: '',
  },
];

export const selectedSubjects = [
  {
    name: 'Subject Name 1',
    shortName: 'SN1',
    icon: 'subjects/iconfile',
    color: '#f00',
  },
];

export const selectors = {
  activityListFilter: '.cp-activity-list__filter',
};

export const events = {
  onSelectSubjectFilter: 'onSelect',
};

export const methodMocks = {
  subjectSelectionChanged: jest.fn(),
};
