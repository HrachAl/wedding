import { z } from "zod";

export const rsvpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Խնդրում ենք նշել Ձեր անունը" })
    .max(80),
  side: z.enum(["groom", "bride"], {
    message: "Խնդրում ենք ընտրել",
  }),
  attending: z.enum(["yes", "no"], {
    message: "Խնդրում ենք ընտրել",
  }),
  guests: z.coerce
    .number({ message: "Նշեք հյուրերի թիվը" })
    .int()
    .min(1, { message: "Առնվազն 1 հյուր" })
    .max(15, { message: "Առավելագույնը 15 հյուր" }),
});

export type RsvpFormValues = z.infer<typeof rsvpSchema>;

export const SIDE_LABELS: Record<"groom" | "bride", string> = {
  groom: "Հրաչ",
  bride: "Լիդա",
};
