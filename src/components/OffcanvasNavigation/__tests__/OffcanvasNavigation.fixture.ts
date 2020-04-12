export const items = [
  {
    url: 'http://www.url1.test',
    text: 'url text 1',
  },
  {
    url: 'http://www.url2.test',
    text: 'url text 2',
  },
];

export const selectors = {
  offcanvasNavigationCloseButton: '.cp-offcanvas-navigation__close-button',
  offcanvasNavigationLink: '.cp-offcanvas-navigation__link',
};

export const events = {
  closeOffcanvasNavigation: 'on-close-offcanvas-navigation',
  offcanvasNavigationCloseButtonClick: 'click',
  offcanvasNavigationLinkClick: 'click',
};

export const methodMocks = {
  onClickCloseButton: jest.fn(),
};
