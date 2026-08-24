"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import Button from "./Button";

type Status = "idle" | "sending" | "success" | "error";

export default function VolunteerForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<Status>("idle");
  const f = dict.volunteer.form;

  if (status === "success") {
    return <div className="border border-success bg-success/10 p-6 text-sm text-charcoal">{dict.forms.thankYou}</div>;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // The CV field has nowhere to upload to yet (no storage/ATS destination
    // configured — see ARCHITECTURE.md), so it's dropped here rather than
    // silently discarded server-side after implying it was received.
    const entries = Array.from(new FormData(e.currentTarget).entries()).filter(
      ([, value]) => !(value instanceof File)
    );
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(entries)),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
      <Field label={f.firstName} name="firstName" required />
      <Field label={f.lastName} name="lastName" required />
      <Field label={f.email} name="email" type="email" required />
      <Field label={f.phone} name="phone" type="tel" />
      <Field label={f.country} name="country" required />
      <Field label={f.city} name="city" />
      <Field label={f.volunteerType} name="volunteerType" />
      <Field label={f.profession} name="profession" />
      <Field label={f.location} name="location" />
      <Field label={f.language} name="language" />
      <Field label={f.skills} name="skills" className="sm:col-span-2" />
      <Field label={f.availability} name="availability" className="sm:col-span-2" />
      <div className="sm:col-span-2">
        <label className="text-sm font-medium text-charcoal" htmlFor="motivation">
          {f.motivation}
        </label>
        <textarea id="motivation" name="motivation" rows={4} className="mt-2 w-full rounded-button border border-border px-4 py-3 text-sm" />
      </div>
      <div className="sm:col-span-2">
        <label className="text-sm font-medium text-charcoal" htmlFor="cv">
          {f.cv}
        </label>
        <input id="cv" name="cv" type="file" className="mt-2 w-full text-sm" />
      </div>
      <label className="flex items-center gap-3 text-sm text-charcoal sm:col-span-2">
        <input type="checkbox" name="ageConfirm" required className="h-5 w-5" />
        {f.ageConfirm}
      </label>
      <label className="flex items-center gap-3 text-sm text-charcoal sm:col-span-2">
        <input type="checkbox" name="consent" required className="h-5 w-5" />
        {f.consent}
      </label>
      {status === "error" && <p className="text-sm text-red-700 sm:col-span-2">{dict.forms.error}</p>}
      <div className="sm:col-span-2">
        <Button type="submit" variant="primary">
          {status === "sending" ? dict.forms.sending : f.submit}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-charcoal" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-button border border-border px-4 py-3 text-sm"
      />
    </div>
  );
}
