"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import Button from "./Button";

export default function VolunteerForm({ dict }: { dict: Dictionary }) {
  const [submitted, setSubmitted] = useState(false);
  const f = dict.volunteer.form;

  if (submitted) {
    return <div className="border border-success bg-success/10 p-6 text-sm text-charcoal">{dict.forms.thankYou}</div>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="grid gap-6 sm:grid-cols-2"
    >
      <Field label={f.firstName} name="firstName" required />
      <Field label={f.lastName} name="lastName" required />
      <Field label={f.email} name="email" type="email" required />
      <Field label={f.phone} name="phone" type="tel" />
      <Field label={f.country} name="country" required />
      <Field label={f.city} name="city" />
      <Field label={f.volunteerType} name="volunteerType" />
      <Field label={f.profession} name="profession" />
      <Field label={f.skills} name="skills" className="sm:col-span-2" />
      <Field label={f.availability} name="availability" />
      <Field label={f.language} name="language" />
      <div className="sm:col-span-2">
        <label className="text-sm font-medium text-charcoal" htmlFor="motivation">
          {f.motivation}
        </label>
        <textarea id="motivation" name="motivation" rows={4} className="mt-2 w-full rounded-button border border-border px-4 py-3 text-sm" />
      </div>
      <label className="flex items-center gap-3 text-sm text-charcoal sm:col-span-2">
        <input type="checkbox" required className="h-5 w-5" />
        {f.ageConfirm}
      </label>
      <label className="flex items-center gap-3 text-sm text-charcoal sm:col-span-2">
        <input type="checkbox" required className="h-5 w-5" />
        {f.consent}
      </label>
      <div className="sm:col-span-2">
        <Button type="submit" variant="primary">
          {f.submit}
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
