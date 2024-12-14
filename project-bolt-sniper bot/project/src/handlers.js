export function handleStart(bot, msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Welcome! How can I assist you today? Type 'help' to see what I can do."
  );
}

export function handleHelp(bot, msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Here are the options:\n1. Ask me about something\n2. Tell me a joke\n3. Information about your account\nPlease type the number of the option you're interested in."
  );
}

export function handleOption(bot, msg) {
  const chatId = msg.chat.id;
  const option = msg.text;

  switch (option) {
    case '1':
      bot.sendMessage(chatId, "Sure! What would you like to know?");
      break;
    case '2':
      bot.sendMessage(
        chatId,
        "Here's a joke for you: Why don't scientists trust atoms? Because they make up everything!"
      );
      break;
    case '3':
      const userInfo = `Here is your account information:
User ID: ${msg.from.id}
First Name: ${msg.from.first_name}
Username: ${msg.from.username || 'Not set'}`;
      bot.sendMessage(chatId, userInfo);
      break;
  }
}

export function handleDefault(bot, msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "I didn't quite understand that. Type 'help' to see what I can do."
  );
}