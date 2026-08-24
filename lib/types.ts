export type ProjectStatus = "planning" | "fundraising" | "in-progress" | "completed" | "ongoing";
export type ProjectCategory = "education" | "nutrition" | "healthcare";

// Mirrors the CMS field list defined in the project spec (section 30) so a
// headless CMS (e.g. Sanity) can later replace this file with the same shape.
export interface Project {
  project_id: string;
  slug: { en: string; fr: string };
  name: { en: string; fr: string };
  category: ProjectCategory;
  location: string;
  status: ProjectStatus;
  summary: { en: string; fr: string };
  description: { en: string; fr: string };
  goal_amount: number | null;
  currency: "CAD" | "USD" | "XAF" | null;
  amount_raised: number | null;
  amount_spent: number | null;
  start_date: string | null;
  target_completion_date: string | null;
  beneficiary_metric: string | null;
  featured_image: string | null;
  reports: { title: string; url: string }[];
  data_pending: string[]; // fields intentionally left blank pending verification (spec section 116/31)
}

// Mirrors the Impact Metric model in section 90. A metric can only render on
// the public site once `public` is true — never invent a value in the meantime.
export interface ImpactMetric {
  metric_id: string;
  title: { en: string; fr: string };
  value: string | null;
  unit: string | null;
  period_start: string | null;
  period_end: string | null;
  definition: { en: string; fr: string };
  source_internal: string | null;
  verified_by: string | null;
  verified_at: string | null;
  public: boolean;
}

export type StoryCategory = "field-updates" | "project-updates" | "impact" | "reports" | "news" | "calls-to-action";

// Mirrors the article model in spec section 36. No entries exist yet — the
// content workflow (Draft -> Review -> Approved -> Published) has nothing
// approved to publish, so this stays an empty list until the org writes one.
export interface Story {
  slug: { en: string; fr: string };
  title: { en: string; fr: string };
  date: string;
  category: StoryCategory;
  featured_image: string | null;
  summary: { en: string; fr: string };
  body: { en: string; fr: string };
  related_project: string | null;
}

// Mirrors the Partner model in section 50 — a logo only renders when
// logo_usage_authorized is explicitly true.
export interface Partner {
  partner_name: string;
  website: string | null;
  logo: string | null;
  logo_usage_authorized: boolean;
  description: { en: string; fr: string };
  partnership_type: string;
  active: boolean;
}
