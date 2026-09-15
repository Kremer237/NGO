-- DB-backed blog posts ("Stories" — spec section 36), replacing the static
-- empty array in content/stories.ts once DATABASE_URL is configured (see
-- lib/stories-repo.ts). Mirrors the Story shape in lib/types.ts and the
-- content workflow from spec section 93: draft -> review -> approved ->
-- published -> archived. Only 'published' rows are ever readable by the
-- public site.

create table stories (
  id uuid primary key default gen_random_uuid(),
  slug_en text not null unique,
  slug_fr text not null unique,
  title_en text not null,
  title_fr text not null,
  category text not null check (
    category in ('field-updates', 'project-updates', 'impact', 'reports', 'news', 'calls-to-action')
  ),
  featured_image text,
  summary_en text,
  summary_fr text,
  body_en text not null,
  body_fr text not null,
  related_project text, -- CMS/content project_id, plain text — see db/README.md
  status text not null default 'draft' check (
    status in ('draft', 'review', 'approved', 'published', 'archived')
  ),
  author_id uuid references admin_users (id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index stories_status_idx on stories (status);
create index stories_published_at_idx on stories (published_at desc);
