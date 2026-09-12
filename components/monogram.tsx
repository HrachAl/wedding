import { cn } from "@/lib/utils";

interface MonogramProps {
  className?: string;
  /** Draw the surrounding ring + laurels. */
  framed?: boolean;
}

/**
 * Couple monogram «Հ ❤ Լ» rendered as a self-contained gold SVG.
 * Used in the envelope seal, preloader, header mark and footer.
 */
export function Monogram({ className, framed = true }: MonogramProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="Հրաչ և Լիդա"
      className={cn("h-16 w-16", className)}
    >
      <defs>
        <linearGradient id="mono-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e7cfa0" />
          <stop offset="50%" stopColor="#b9935a" />
          <stop offset="100%" stopColor="#9a7740" />
        </linearGradient>
      </defs>

      {framed && (
        <>
          <circle
            cx="60"
            cy="60"
            r="56"
            fill="none"
            stroke="url(#mono-gold)"
            strokeWidth="1.4"
            opacity="0.9"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="url(#mono-gold)"
            strokeWidth="0.6"
            opacity="0.55"
          />
          {/* Small laurel ticks top & bottom */}
          <g stroke="url(#mono-gold)" strokeWidth="1.2" strokeLinecap="round">
            <line x1="60" y1="6" x2="60" y2="14" />
            <line x1="60" y1="106" x2="60" y2="114" />
          </g>
        </>
      )}

      {/* Letters + heart */}
      <text
        x="34"
        y="74"
        textAnchor="middle"
        fontFamily="var(--font-serif), Georgia, serif"
        fontSize="46"
        fontWeight="600"
        fill="url(#mono-gold)"
      >
        Հ
      </text>
      <text
        x="86"
        y="74"
        textAnchor="middle"
        fontFamily="var(--font-serif), Georgia, serif"
        fontSize="46"
        fontWeight="600"
        fill="url(#mono-gold)"
      >
        Լ
      </text>
      <path
        d="M60 64
           c-3.4-4.2-9-3.1-9 1.7
           c0 3.3 4.2 6.2 9 9.3
           c4.8-3.1 9-6 9-9.3
           c0-4.8-5.6-5.9-9-1.7 z"
        fill="url(#mono-gold)"
      />
    </svg>
  );
}
