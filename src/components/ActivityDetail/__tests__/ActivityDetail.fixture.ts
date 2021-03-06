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

export const attachments = [
  {
    url: 'http://',
    text: 'Attachment 1',
    type: 'doc',
  },
  {
    url: 'http://',
    text: 'Attachment 2',
    type: 'url',
  },
  {
    url: 'http://',
    text: 'Attachment 3',
    type: 'jpg',
  },
];

export const selectors = {
  activityDeliveryDate: '.cp-activity-detail__item-delivery-date',
  activityDeliveryMethod: '.cp-activity-detail__item-delivery-method',
  activityAttachments: '.cp-activity-detail__item-attachments',
};
