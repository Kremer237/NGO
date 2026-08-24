"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import Button from "./Button";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<Status>("idle");
  const f = dict.contact.form;

  if (status === "success") {
    return <div className="border border-success bg-success/10 p-6 text-sm text-charcoal">{dict.forms.thankYou}</div>;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-charcoal" htmlFor="name">
            {f.name}
          </label>
          <input id="name" name="name" required className="mt-2 w-full rounded-button border border-border px-4 py-3 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-charcoal" htmlFor="organization">
            {f.organization}
          </label>
          <input id="organization" name="organization" className="mt-2 w-full rounded-button border border-border px-4 py-3 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-charcoal" htmlFor="email">
            {f.email}
          </label>
          <input id="email" name="email" type="email" required className="mt-2 w-full rounded-button border border-border px-4 py-3 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-charcoal" htmlFor="category">
            {f.subject}
          </label>
          <select id="category" name="category" className="mt-2 w-full rounded-button border border-border px-4 py-3 text-sm">
            {f.categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-charcoal" htmlFor="message">
          {f.message}
        </label>
        <textarea id="message" name="message" required rows={5} className="mt-2 w-full rounded-button border border-border px-4 py-3 text-sm" />
      </div>
      <label className="flex items-center gap-3 text-sm text-charcoal">
        <input type="checkbox" name="consent" required className="h-5 w-5" />
        {f.consent}
      </label>
      {status === "error" && <p className="text-sm text-red-700">{dict.forms.error}</p>}
      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        {status === "sending" ? dict.forms.sending : f.submit}
      </Button>
    </form>
  );
}
