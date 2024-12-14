import { MAIN_MENU, SUB_MENUS } from '../constants/menus.js';
import { chunk } from './helpers.js';

export function createMainMenuKeyboard() {
  const buttons = Object.entries(MAIN_MENU).map(([key, text]) => ({
    text,
    callback_data: `menu_${key.toLowerCase()}`
  }));

  return {
    reply_markup: {
      inline_keyboard: chunk(buttons, 2) // 2 buttons per row
    }
  };
}

export function createSubMenuKeyboard(menuType) {
  const subMenu = SUB_MENUS[menuType];
  if (!subMenu) return null;

  const buttons = Object.entries(subMenu).map(([key, text]) => ({
    text,
    callback_data: `submenu_${menuType.toLowerCase()}_${key.toLowerCase()}`
  }));

  return {
    reply_markup: {
      inline_keyboard: chunk(buttons, 1) // 1 button per row for sub-menus
    }
  };
}