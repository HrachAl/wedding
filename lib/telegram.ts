/**
 * Send a message to every organiser's Telegram chat via the Bot API.
 * TELEGRAM_CHAT_ID may list several ids separated by commas, so more than one
 * person can get RSVP notifications. No-ops (without throwing) when the bot
 * token / chat id aren't configured.
 */
export async function notifyTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = (process.env.TELEGRAM_CHAT_ID || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  if (!token || !chatIds.length) return;

  await Promise.all(
    chatIds.map(async (chatId) => {
      try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: "HTML",
          }),
        });
      } catch (error) {
        console.error(`[telegram] notification failed for ${chatId}:`, error);
      }
    })
  );
}
