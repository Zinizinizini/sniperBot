import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { handleMainMenu, handleCallbackQuery } from './handlers/menuHandlers.js';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Error handling for bot initialization
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

bot.on('error', (error) => {
  console.error('Bot error:', error);
});

// Start command handler
bot.onText(/\/start/, (msg) => {
  try {
    handleMainMenu(bot, msg);
  } catch (error) {
    console.error('Error in start command:', error);
    bot.sendMessage(msg.chat.id, '❌ An error occurred. Please try again.');
  }
});

// Handle callback queries from inline keyboards
bot.on('callback_query', (query) => {
  try {
    handleCallbackQuery(bot, query);
  } catch (error) {
    console.error('Error in callback query:', error);
    bot.sendMessage(query.message.chat.id, '❌ An error occurred. Please try again.');
  }
});

// Handle regular messages
bot.on('message', (msg) => {
  if (msg.reply_to_message) {
    // Handle replies to bot prompts
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '✅ Thank you for your input! Processing...');
  }
});

console.log('🤖 Bot is running with interactive menu system...');