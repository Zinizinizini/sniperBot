import { createMainMenuKeyboard, createSubMenuKeyboard } from '../utils/keyboard.js';
import { formatMenuTitle } from '../utils/helpers.js';

export function handleMainMenu(bot, msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    '🤖 *Welcome to the Main Menu*\nPlease select an option:',
    {
      parse_mode: 'Markdown',
      ...createMainMenuKeyboard()
    }
  );
}

export function handleCallbackQuery(bot, callbackQuery) {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const data = callbackQuery.data;

  try {
    // Acknowledge the callback query
    bot.answerCallbackQuery(callbackQuery.id);

    if (data.startsWith('menu_')) {
      const menuType = data.replace('menu_', '').toUpperCase();
      handleSubMenu(bot, chatId, messageId, menuType);
    } else if (data.startsWith('submenu_')) {
      handleSubMenuAction(bot, chatId, messageId, data);
    }
  } catch (error) {
    console.error('Error handling callback query:', error);
    bot.sendMessage(chatId, '❌ An error occurred. Please try again.');
  }
}

function handleSubMenu(bot, chatId, messageId, menuType) {
  const keyboard = createSubMenuKeyboard(menuType);
  if (!keyboard) {
    bot.sendMessage(chatId, '❌ Menu not available');
    return;
  }

  const menuTitle = formatMenuTitle(menuType);
  bot.editMessageText(
    `📍 *${menuTitle} Menu*\nSelect an option:`,
    {
      chat_id: chatId,
      message_id: messageId,
      parse_mode: 'Markdown',
      ...keyboard
    }
  );
}

function handleSubMenuAction(bot, chatId, messageId, data) {
  const [, menuType, action] = data.split('_');
  
  if (action === 'back') {
    handleMainMenu(bot, { chat: { id: chatId } });
    return;
  }

  const actionKey = `${menuType}_${action}`;
  const responses = {
    'wallets_add': '➕ Please send your wallet address:',
    'wallets_view': '👁️ Here are your connected wallets:',
    'wallets_remove': '❌ Select a wallet to remove:',
    'balance_check': '💰 Fetching your balance...',
    'balance_transaction': '📝 Loading transaction history...',
    'transfer_send': '📤 Enter the recipient address and amount:',
    'transfer_receive': '📥 Here\'s your receiving address:',
    'tonfun_fun': '🎯 Loading fun features...',
    'tonfun_mini': '🎮 Choose a mini game:',
    'sniper_market': '🎯 Configure your sniper settings:',
    'sniper_active': '📊 Your active snipes:',
    'limitorders_create': '📝 Create a new limit order:',
    'limitorders_view': '👁️ Your active limit orders:',
    'copytrade_connect': '🔗 Enter trader\'s address to connect:',
    'copytrade_manage': '⚙️ Manage your copy trades:',
    'settings_update': '👤 Update your profile:',
    'settings_notifications': '🔔 Notification preferences:',
    'settings_security': '🔒 Security settings:'
  };

  const response = responses[actionKey] || '⚠️ Action not implemented yet';
  
  bot.sendMessage(chatId, response, {
    parse_mode: 'Markdown',
    reply_markup: {
      force_reply: true
    }
  });
}