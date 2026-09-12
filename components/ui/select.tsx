import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Lightweight styled native <select>. Native is intentional here: it gives the
 * best mobile experience (system picker) with zero extra dependencies.
 */
const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "field-surface flex h-12 w-full appearance-none rounded-xl border border-gold/20 px-4 py-2 pr-10 text-base text-ink shadow-sm transition-colors",
          "focus-visible:outline-none focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
    </div>
  );
});
Select.displayName = "Select";

export { Select };
