"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import type { Project } from "@/lib/types";
import type { Locale } from "@/lib/i18n";
import Button from "./Button";

const AMOUNTS = [25, 50, 100, 250, 500];

export default function DonateForm({ dict, locale, projects }: { dict: Dictionary; locale: Locale; projects: Project[] }) {
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [currency, setCurrency] = useState<"CAD" | "USD">("CAD");
  const [amount, setAmount] = useState<number | "other">(50);
  const [customAmount, setCustomAmount] = useState("");
  const [allocation, setAllocation] = useState("greatest");
  const [coverFees, setCoverFees] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const d = dict.donate;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <fieldset>
        <legend className="text-sm font-semibold uppercase tracking-wide text-forest">{d.frequency.label}</legend>
        <div className="mt-3 flex gap-3">
          {(["one-time", "monthly"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFrequency(f)}
              aria-pressed={frequency === f}
              className={`rounded-button border px-5 py-3 text-sm font-medium ${
                frequency === f ? "border-forest bg-forest text-ivory" : "border-border text-charcoal"
              }`}
            >
              {f === "one-time" ? d.frequency.oneTime : d.frequency.monthly}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold uppercase tracking-wide text-forest">{d.currency.label}</legend>
        <div className="mt-3 flex gap-3">
          {(["CAD", "USD"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCurrency(c)}
              aria-pressed={currency === c}
              className={`rounded-button border px-5 py-3 text-sm font-medium ${
                currency === c ? "border-forest bg-forest text-ivory" : "border-border text-charcoal"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold uppercase tracking-wide text-forest">{d.amount.label}</legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {AMOUNTS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAmount(a)}
              aria-pressed={amount === a}
              className={`rounded-button border px-5 py-3 text-sm font-medium ${
                amount === a ? "border-forest bg-forest text-ivory" : "border-border text-charcoal"
              }`}
            >
              {currency === "CAD" ? "$" : "US$"}
              {a}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setAmount("other")}
            aria-pressed={amount === "other"}
            className={`rounded-button border px-5 py-3 text-sm font-medium ${
              amount === "other" ? "border-forest bg-forest text-ivory" : "border-border text-charcoal"
            }`}
          >
            {d.amount.other}
          </button>
          {amount === "other" && (
            <input
              type="number"
              min={1}
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-32 rounded-button border border-border px-4 py-3 text-sm"
              aria-label={d.amount.other}
            />
          )}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-semibold uppercase tracking-wide text-forest">{d.allocation.label}</legend>
        <select
          value={allocation}
          onChange={(e) => setAllocation(e.target.value)}
          aria-label={d.allocation.label}
          className="mt-3 w-full max-w-sm rounded-button border border-border px-4 py-3 text-sm"
        >
          <option value="greatest">{d.allocation.greatest}</option>
          <option value="education">{d.allocation.education}</option>
          <option value="nutrition">{d.allocation.nutrition}</option>
          <option value="healthcare">{d.allocation.healthcare}</option>
          {projects.map((p) => (
            <option key={p.project_id} value={p.project_id}>
              {p.name[locale]}
            </option>
          ))}
        </select>
      </fieldset>

      <label className="flex items-center gap-3 text-sm text-charcoal">
        <input type="checkbox" checked={coverFees} onChange={(e) => setCoverFees(e.target.checked)} className="h-5 w-5" />
        {d.feeCover}
      </label>

      <ul className="flex flex-col gap-2 border-t border-border pt-6 text-sm text-slate">
        {d.trust.map((t) => (
          <li key={t} className="flex items-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-success" />
            {t}
          </li>
        ))}
      </ul>

      {submitted ? (
        <div className="border border-ochre bg-ochre/10 p-5 text-sm text-charcoal">
          <p>{d.submitNote}</p>
          <Link href={`/${locale}/donation-terms`} className="mt-2 inline-block underline underline-offset-2 hover:text-forest">
            {dict.footer.donationTerms}
          </Link>
        </div>
      ) : (
        <Button type="submit" variant="primary" className="w-full sm:w-auto">
          {d.submit}
        </Button>
      )}
    </form>
  );
}
