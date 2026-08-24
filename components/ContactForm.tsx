"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import Button from "./Button";

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const [submitted, setSubmitted] = useState(false);
  const f = dict.contact.form;

  if (submitted) {
    return <div className="border border-success bg-success/10 p-6 text-sm text-charcoal">{dict.forms.thankYou}</div>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-6"
    >
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
        <input type="checkbox" required className="h-5 w-5" />
        {f.consent}
      </label>
      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        {f.submit}
      </Button>
    </form>
  );
}
