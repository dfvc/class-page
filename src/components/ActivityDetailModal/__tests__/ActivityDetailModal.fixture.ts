export const activity = {
  subject: {
    name: 'Subject Name',
    shortName: 'SN',
    icon: 'subjects/iconfile',
    color: '#000',
  },
  description: 'activity description',
  dateCreation: '01-01-2020',
  dateChanged: '',
};

export const events = {
  onClickBackgroundOverlay: 'on-click-background-overlay',
  onCloseActivityDetailModal: 'on-close-activity-detail-modal',
  onCloseActivityDetail: 'on-close-activity-detail',
};

export const methodMocks = {
  clickBackgroundOverlay: jest.fn(),
  closeActivityDetail: jest.fn(),
};
