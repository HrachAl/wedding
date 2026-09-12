"use client";

import { CalendarPlus, Check, Share2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { downloadIcs, googleCalendarUrl } from "@/lib/calendar";
import { WEDDING } from "@/lib/constants";

export function CalendarActions() {
  const [shared, setShared] = useState(false);

  const share = async () => {
    const data = {
      title: `${WEDDING.groom} 🤍 ${WEDDING.bride}`,
      text: WEDDING.invitation,
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(data.url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      /* user cancelled — no-op */
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button asChild variant="outline" size="sm">
        <a
          href={googleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <CalendarPlus className="h-4 w-4" />
          Google Calendar
        </a>
      </Button>

      <Button variant="outline" size="sm" onClick={downloadIcs}>
        <CalendarPlus className="h-4 w-4" />
        Apple / Outlook
      </Button>

      <Button variant="outline" size="sm" onClick={share}>
        {shared ? (
          <>
            <Check className="h-4 w-4" />
            Պատճենվեց
          </>
        ) : (
          <>
            <Share2 className="h-4 w-4" />
            Կիսվել
          </>
        )}
      </Button>
    </div>
  );
}
