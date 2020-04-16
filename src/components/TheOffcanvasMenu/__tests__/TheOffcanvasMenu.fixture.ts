export const navigationItems = [
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
  menuButton: '.cp-offcanvas-menu__trigger',
  CpBackgroundOverlay: 'cp-background-overlay-stub',
  CpOffcanvasNavigation: 'cp-offcanvas-navigation-stub',
};

export const events = {
  clickMenuButton: 'click',
  clickBackgroundOverlay: 'on-click-background-overlay',
  closeOffcanvasNavigation: 'on-close-offcanvas-navigation',
};

export const methodMocks = {
  openMenu: jest.fn(),
  closeMenu: jest.fn(),
};
