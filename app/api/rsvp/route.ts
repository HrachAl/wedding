import { NextResponse } from "next/server";

import { rsvpSchema } from "@/lib/rsvp-schema";
import { addEntry } from "@/lib/rsvp-store";
import { notifyTelegram } from "@/lib/telegram";

/**
 * RSVP endpoint. Validates server-side, stores the entry to data/rsvp.json
 * (which the Telegram bot reads for /list and /count), and pushes an instant
 * notification to the organisers' Telegram chat.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = rsvpSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const entry = {
    ...parsed.data,
    submittedAt: new Date().toISOString(),
  };

  await addEntry(entry);

  const status =
    entry.attending === "yes"
      ? `✅ Գալիս է · 👥 ${entry.guests} հոգի`
      : "❌ Չի կարող գալ";
  const side = entry.side === "groom" ? "Փեսայի կողմից" : "Հարսի կողմից";
  await notifyTelegram(
    `🎉 <b>Նոր հաստատում</b>\n\n👤 <b>${entry.name}</b>\n💍 ${side}\n${status}`
  );

  return NextResponse.json({ ok: true });
}
