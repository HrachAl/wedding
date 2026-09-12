#!/usr/bin/env node
/**
 * Telegram bot for the wedding RSVP.
 *
 * - Reads submissions from data/rsvp.json (written by the /api/rsvp route).
 * - Commands (organisers only):
 *     /list             — every confirmation (name, going/not, guests)
 *     /count            — totals: responses, going + total people, not coming
 *     /delete <number>  — delete one entry by its /list number
 *     /clear confirm    — delete ALL entries (test cleanup)
 *
 * Run from the project root:
 *     node --env-file=.env.local bot/telegram-bot.mjs
 * (or `npm run bot`)
 *
 * Requires TELEGRAM_BOT_TOKEN. TELEGRAM_CHAT_ID restricts the commands to the
 * organisers' chat; if it's empty the bot replies with your chat id so you can
 * set it.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN = String(process.env.TELEGRAM_CHAT_ID || "").trim();

if (!TOKEN) {
  console.error("✗ TELEGRAM_BOT_TOKEN is not set. See .env.example.");
  process.exit(1);
}

const API = `https://api.telegram.org/bot${TOKEN}`;
const FILE = path.join(process.cwd(), "data", "rsvp.json");
const MAX_LINES_PER_MSG = 40;

async function readEntries() {
  try {
    return JSON.parse(await readFile(FILE, "utf8"));
  } catch {
    return [];
  }
}

async function writeEntries(entries) {
  await writeFile(FILE, JSON.stringify(entries, null, 2), "utf8");
}

function escapeHtml(str) {
  return String(str).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );
}

async function send(chatId, text) {
  await fetch(`${API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
}

function summarize(entries) {
  const going = entries.filter((e) => e.attending === "yes");
  const not = entries.filter((e) => e.attending === "no");
  const people = going.reduce((s, e) => s + (Number(e.guests) || 0), 0);
  const groomPeople = going
    .filter((e) => e.side === "groom")
    .reduce((s, e) => s + (Number(e.guests) || 0), 0);
  const bridePeople = going
    .filter((e) => e.side === "bride")
    .reduce((s, e) => s + (Number(e.guests) || 0), 0);
  return {
    total: entries.length,
    going: going.length,
    not: not.length,
    people,
    groomPeople,
    bridePeople,
  };
}

function sideTag(e) {
  return e.side === "groom" ? "Փ" : e.side === "bride" ? "Հ" : "";
}

function countText(s) {
  return (
    `📊 <b>Ընդհանուր</b>\n\n` +
    `📝 Պատասխաններ՝ <b>${s.total}</b>\n` +
    `✅ Գալիս են՝ <b>${s.going}</b>  (👥 <b>${s.people}</b> հոգի)\n` +
    `❌ Չեն կարող՝ <b>${s.not}</b>\n\n` +
    `💍 Փեսայի կողմից՝ <b>${s.groomPeople}</b> հոգի\n` +
    `💍 Հարսի կողմից՝ <b>${s.bridePeople}</b> հոգի`
  );
}

async function handle(msg) {
  const chatId = msg.chat.id;
  const text = (msg.text || "").trim();

  if (!ADMIN) {
    await send(
      chatId,
      `👋 Ձեր chat id-ն է՝ <code>${chatId}</code>\n\nԱվելացրեք այն <code>.env.local</code>-ում որպես <code>TELEGRAM_CHAT_ID</code> և վերագործարկեք բոտը։`
    );
    return;
  }
  if (String(chatId) !== ADMIN) {
    await send(chatId, "⛔️ Այս բոտը միայն կազմակերպիչների համար է։");
    return;
  }

  if (text.startsWith("/clear")) {
    if (text !== "/clear confirm") {
      await send(
        chatId,
        "⚠️ Սա կջնջի ԲՈԼՈՐ պատասխանները։ Հաստատելու համար գրեք՝\n/clear confirm"
      );
      return;
    }
    await writeEntries([]);
    await send(chatId, "🗑 Բոլոր պատասխանները ջնջվեցին։");
    return;
  }

  if (text.startsWith("/delete")) {
    const entries = await readEntries();
    const idx = Number(text.split(/\s+/)[1]);
    if (!idx || idx < 1 || idx > entries.length) {
      await send(
        chatId,
        `Սխալ համար։ Օգտագործեք /list-ից համարը (1-${entries.length})։\n/delete <համար>`
      );
      return;
    }
    const [removed] = entries.splice(idx - 1, 1);
    await writeEntries(entries);
    await send(chatId, `🗑 Ջնջվեց <b>${escapeHtml(removed.name)}</b>`);
    return;
  }

  const entries = await readEntries();
  const s = summarize(entries);

  if (text.startsWith("/count")) {
    await send(chatId, countText(s));
    return;
  }

  if (text.startsWith("/list")) {
    if (!entries.length) {
      await send(chatId, "Դեռ պատասխաններ չկան։");
      return;
    }
    const lines = entries.map((e, i) => {
      const st = e.attending === "yes" ? `✅ ${e.guests} հոգի` : "❌";
      const tag = sideTag(e);
      return `${i + 1}. <b>${escapeHtml(e.name)}</b> ${tag ? `(${tag})` : ""} — ${st}`;
    });
    for (let i = 0; i < lines.length; i += MAX_LINES_PER_MSG) {
      const chunk = lines.slice(i, i + MAX_LINES_PER_MSG).join("\n");
      const header = i === 0 ? `📋 <b>Ցուցակ</b> (${s.total})\n\n` : "";
      await send(chatId, header + chunk);
    }
    await send(chatId, countText(s));
    return;
  }

  await send(
    chatId,
    "👋 Հրամաններ՝\n/list — բոլոր հաստատումները\n/count — ընդհանուր թիվ\n/delete <համար> — ջնջել մեկը\n/clear confirm — ջնջել բոլորը"
  );
}

async function main() {
  // Sanity check the token
  const me = await fetch(`${API}/getMe`).then((r) => r.json());
  if (!me.ok) {
    console.error("✗ Invalid TELEGRAM_BOT_TOKEN:", me.description);
    process.exit(1);
  }
  console.log(`✓ Bot @${me.result.username} started. Polling…`);
  if (!ADMIN) {
    console.log("ℹ️  TELEGRAM_CHAT_ID not set — message the bot to get your id.");
  }

  let offset = 0;
  // Drop any backlog so old messages aren't reprocessed on restart.
  const first = await fetch(`${API}/getUpdates?timeout=0&offset=-1`).then((r) =>
    r.json()
  );
  if (first.ok && first.result.length) {
    offset = first.result[first.result.length - 1].update_id + 1;
  }

  while (true) {
    try {
      const res = await fetch(
        `${API}/getUpdates?timeout=30&offset=${offset}`
      ).then((r) => r.json());
      for (const u of res.result || []) {
        offset = u.update_id + 1;
        if (u.message) await handle(u.message);
      }
    } catch (err) {
      console.error("poll error:", err.message);
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

main();
