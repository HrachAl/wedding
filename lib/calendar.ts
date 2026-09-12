import { WEDDING } from "@/lib/constants";

const DURATION_HOURS = 6;

/** Format a Date as an ICS/Google UTC timestamp: YYYYMMDDTHHMMSSZ */
function toUTCStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function range(): { start: Date; end: Date } {
  const start = new Date(WEDDING.dateISO);
  const end = new Date(start.getTime() + DURATION_HOURS * 60 * 60 * 1000);
  return { start, end };
}

const TITLE = `${WEDDING.groomFull} 🤍 ${WEDDING.brideFull} — Հարսանիք`;

/** Google Calendar "add event" link. */
export function googleCalendarUrl(): string {
  const { start, end } = range();
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: TITLE,
    dates: `${toUTCStamp(start)}/${toUTCStamp(end)}`,
    details: WEDDING.invitation,
    location: WEDDING.venue,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Build a downloadable .ics file (Apple Calendar / Outlook). */
export function icsContent(): string {
  const { start, end } = range();
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Hrachya & Lida//Wedding//HY",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:wedding-${toUTCStamp(start)}@hrachya-lida`,
    `DTSTAMP:${toUTCStamp(start)}`,
    `DTSTART:${toUTCStamp(start)}`,
    `DTEND:${toUTCStamp(end)}`,
    `SUMMARY:${TITLE}`,
    `DESCRIPTION:${WEDDING.invitation}`,
    `LOCATION:${WEDDING.venue}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/** Trigger a download of the .ics file in the browser. */
export function downloadIcs(): void {
  const blob = new Blob([icsContent()], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "hrachya-lida-wedding.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
