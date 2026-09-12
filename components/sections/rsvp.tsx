"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { ConfettiBurst } from "@/components/effects/confetti-burst";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SectionPhoto } from "@/components/section-photo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { rsvpSchema, SIDE_LABELS, type RsvpFormValues } from "@/lib/rsvp-schema";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-500/90">{message}</p>;
}

export function Rsvp() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { name: "", attending: "yes", guests: 1 },
  });

  const attending = watch("attending");

  // Posts to /api/rsvp, which notifies the Telegram bot and stores the entry.
  const onSubmit = async (values: RsvpFormValues) => {
    try {
      await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    } catch (error) {
      console.error("RSVP submission failed:", error);
    }
  };

  return (
    <section id="rsvp" className="relative bg-surface-alt py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Հաստատեք Ձեր մասնակցությունը"
          title="Հաստատում"
        />

        <Reveal className="mx-auto mt-14 max-w-md" delay={0.1}>
          <div className="glass-panel relative rounded-3xl p-7 sm:p-10">
            <AnimatePresence mode="wait">
              {isSubmitSuccessful ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative flex flex-col items-center py-8 text-center"
                >
                  <ConfettiBurst />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient text-white shadow-soft"
                  >
                    <Check className="h-8 w-8" />
                  </motion.div>
                  <h3 className="relative z-10 mt-6 font-serif text-2xl text-ink">
                    Շնորհակալություն
                  </h3>
                  <p className="relative z-10 mt-2 text-ink/70">
                    Ձեր պատասխանն ընդունված է։ Անհամբեր սպասում ենք Ձեզ։
                  </p>
                  <Button
                    variant="outline"
                    className="relative z-10 mt-6"
                    onClick={() => reset()}
                  >
                    Լրացնել նորից
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                >
                  <div>
                    <Label htmlFor="name">Նշեք Ձեր Անուն/Ազգանունը</Label>
                    <Input
                      id="name"
                      className="mt-1.5"
                      placeholder="Ձեր անունը"
                      {...register("name")}
                    />
                    <FieldError message={errors.name?.message} />
                  </div>

                  <div>
                    <Label htmlFor="side">Ու՞մ կողմից եք հրավիրված</Label>
                    <Select id="side" className="mt-1.5" {...register("side")}>
                      <option value="">Ընտրեք</option>
                      <option value="groom">{SIDE_LABELS.groom}</option>
                      <option value="bride">{SIDE_LABELS.bride}</option>
                    </Select>
                    <FieldError message={errors.side?.message} />
                  </div>

                  <div>
                    <Label htmlFor="attending">Կմասնակցե՞ք</Label>
                    <Select
                      id="attending"
                      className="mt-1.5"
                      {...register("attending")}
                    >
                      <option value="yes">Այո, անպայման կգամ</option>
                      <option value="no">Ցավոք, չեմ կարող</option>
                    </Select>
                    <FieldError message={errors.attending?.message} />
                  </div>

                  {attending === "yes" ? (
                    <div>
                      <Label htmlFor="guests">Քանի՞ հոգով</Label>
                      <Input
                        id="guests"
                        type="number"
                        min={1}
                        max={15}
                        className="mt-1.5"
                        {...register("guests")}
                      />
                      <FieldError message={errors.guests?.message} />
                    </div>
                  ) : null}

                  <Magnetic>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Ուղարկվում է...
                        </>
                      ) : (
                        "Ուղարկել պատասխանը"
                      )}
                    </Button>
                  </Magnetic>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        <SectionPhoto src="/photos/rsvp.jpg" />
      </div>
    </section>
  );
}
