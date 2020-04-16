import {
  shallowMount,
  Wrapper,
} from '@vue/test-utils';
import CpOffcanvasMenu from '@/components/TheOffcanvasMenu/TheOffcanvasMenu.component.vue';
import {
  navigationItems,
  events,
  methodMocks,
  selectors,
} from '@/components/TheOffcanvasMenu/__tests__/TheOffcanvasMenu.fixture';
import {
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';

jest.mock('body-scroll-lock');

describe('CpOffcanvasMenu', () => {
  let wrapper: Wrapper<CpOffcanvasMenu>;

  beforeEach((): void => {
    wrapper = shallowMount(CpOffcanvasMenu, {
      propsData: {
        navigationItems,
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
    jest.clearAllMocks();
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
    test('"openMenu" sets isMenuOpen to true', () => {
      (wrapper.vm as any).isMenuOpen = false;
      (wrapper.vm as any).openMenu();

      expect((wrapper.vm as any).isMenuOpen).toBe(true);
    });

    test('"closeMenu" sets isMenuOpen to false', () => {
      (wrapper.vm as any).isMenuOpen = true;
      (wrapper.vm as any).closeMenu();

      expect((wrapper.vm as any).isMenuOpen).toBe(false);
    });
  });

  /**
   * Events / User Interaction
   */
  describe('Events / User Interaction', () => {
    test('"disableBodyScroll" is called when isMenuOpen changes to true', async () => {
      expect(disableBodyScroll).not.toHaveBeenCalled();

      wrapper.setData({
        isMenuOpen: true,
      });
      await wrapper.vm.$nextTick();

      expect(disableBodyScroll).toHaveBeenCalledWith(
        wrapper.vm.$el,
        { reserveScrollBarGap: true },
      );
    });

    test('"enableBodyScroll" is called when isMenuOpen changes to false', async () => {
      wrapper.setData({
        isMenuOpen: true,
      });
      await wrapper.vm.$nextTick();

      expect(enableBodyScroll).not.toHaveBeenCalled();

      wrapper.setData({
        isMenuOpen: false,
      });
      await wrapper.vm.$nextTick();

      expect(enableBodyScroll).toHaveBeenCalledWith(wrapper.vm.$el);
    });

    test('"click" event on menu button triggers "closeMenu" method', () => {
      wrapper.setMethods({
        openMenu: methodMocks.openMenu,
      });

      expect(methodMocks.openMenu).not.toHaveBeenCalled();

      wrapper.find(selectors.menuButton).trigger(events.clickMenuButton);
      expect(methodMocks.openMenu).toHaveBeenCalled();
    });

    test(`"${events.clickBackgroundOverlay}" event triggers "closeMenu" method`, () => {
      wrapper.setMethods({
        closeMenu: methodMocks.closeMenu,
      });

      expect(methodMocks.closeMenu).not.toHaveBeenCalled();

      wrapper.find(selectors.CpBackgroundOverlay).vm.$emit(events.clickBackgroundOverlay);
      expect(methodMocks.closeMenu).toHaveBeenCalled();
    });

    test(`"${events.closeOffcanvasNavigation}" event triggers "closeMenu" method`, () => {
      wrapper.setMethods({
        closeMenu: methodMocks.closeMenu,
      });

      expect(methodMocks.closeMenu).not.toHaveBeenCalled();

      wrapper.find(selectors.CpOffcanvasNavigation).vm.$emit(events.closeOffcanvasNavigation);
      expect(methodMocks.closeMenu).toHaveBeenCalled();
    });
  });
});
