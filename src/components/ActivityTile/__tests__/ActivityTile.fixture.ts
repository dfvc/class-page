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

export const selectors = {
  activityTile: '.cp-activity-tile',
  activityDetailModal: '.cp-activity-tile__detail-modal',
  activityDeliveryDate: '.cp-activity-tile__delivery-date',
};

export const methodMocks = {
  openActivityDetailModal: jest.fn(),
  closeActivityDetailModal: jest.fn(),
};

export const events = {
  activityTileClick: 'click',
  closeActivityDetailModal: 'on-close-activity-detail-modal',
};
