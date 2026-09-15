"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import type { StoryCategory } from "@/lib/types";
import ImageUploader from "./ImageUploader";

const CATEGORIES: StoryCategory[] = [
  "field-updates",
  "project-updates",
  "impact",
  "reports",
  "news",
  "calls-to-action",
];

export interface StoryFormValues {
  slug_en: string;
  slug_fr: string;
  title_en: string;
  title_fr: string;
  category: StoryCategory;
  featured_image: string | null;
  summary_en: string;
  summary_fr: string;
  body_en: string;
  body_fr: string;
  related_project: string;
}

const EMPTY: StoryFormValues = {
  slug_en: "",
  slug_fr: "",
  title_en: "",
  title_fr: "",
  category: "field-updates",
  featured_image: null,
  summary_en: "",
  summary_fr: "",
  body_en: "",
  body_fr: "",
  related_project: "",
};

export default function StoryForm({
  storyId,
  initial,
}: {
  storyId?: string;
  initial?: StoryFormValues;
}) {
  const router = useRouter();
  const [values, setValues] = useState<StoryFormValues>(initial ?? EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function set<K extends keyof StoryFormValues>(key: K, value: StoryFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const url = storyId ? `/api/admin/posts/${storyId}` : "/api/admin/posts";
    const method = storyId ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = await res.json();
      if (!res.ok || !body.ok) {
        setError(body.error === "invalid_input" ? "Please fill in all required fields." : "Something went wrong.");
        setSubmitting(false);
        return;
      }
      router.push("/admin/posts");
      router.refresh();
    } catch {
      setError("Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Title (English)" value={values.title_en} onChange={(v) => set("title_en", v)} required />
        <Field label="Title (French)" value={values.title_fr} onChange={(v) => set("title_fr", v)} required />
        <Field label="Slug (English)" value={values.slug_en} onChange={(v) => set("slug_en", v)} required />
        <Field label="Slug (French)" value={values.slug_fr} onChange={(v) => set("slug_fr", v)} required />
        <div>
          <label className="text-sm font-medium text-charcoal">Category</label>
          <select
            value={values.category}
            onChange={(e) => set("category", e.target.value as StoryCategory)}
            className="mt-2 w-full rounded-button border border-border px-4 py-3 text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <Field
          label="Related project ID (optional)"
          value={values.related_project}
          onChange={(v) => set("related_project", v)}
        />
      </div>

      <ImageUploader value={values.featured_image} onChange={(url) => set("featured_image", url)} />

      <TextArea label="Summary (English)" value={values.summary_en} onChange={(v) => set("summary_en", v)} rows={2} />
      <TextArea label="Summary (French)" value={values.summary_fr} onChange={(v) => set("summary_fr", v)} rows={2} />
      <TextArea label="Body (English)" value={values.body_en} onChange={(v) => set("body_en", v)} rows={10} required />
      <TextArea label="Body (French)" value={values.body_fr} onChange={(v) => set("body_fr", v)} rows={10} required />

      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-button bg-forest px-5 py-3 text-sm font-medium text-ivory disabled:opacity-60"
        >
          {submitting ? "Saving..." : storyId ? "Save changes" : "Create post"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label className="text-sm font-medium text-charcoal" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-2 w-full rounded-button border border-border px-4 py-3 text-sm"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows: number;
  required?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label className="text-sm font-medium text-charcoal" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        required={required}
        className="mt-2 w-full rounded-button border border-border px-4 py-3 text-sm"
      />
    </div>
  );
}
