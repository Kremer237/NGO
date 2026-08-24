"use client";

import { useEffect } from "react";
import Section from "@/components/Section";
import Button from "@/components/Button";

export default function LocaleError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section tone="ivory" className="pt-28 text-center">
      <h1 className="mx-auto max-w-lg font-heading text-2xl font-semibold text-forest md:text-3xl">
        Something went wrong.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm text-slate">
        The team has been notified. You can try again, or return to the homepage.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button onClick={reset} variant="primary">
          Try again
        </Button>
        <Button href="/" variant="secondary">
          Return home
        </Button>
      </div>
    </Section>
  );
}
