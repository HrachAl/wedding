import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "field-surface flex min-h-[96px] w-full rounded-xl border border-gold/20 px-4 py-3 text-base text-ink shadow-sm transition-colors",
        "placeholder:text-ink/40",
        "focus-visible:outline-none focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
