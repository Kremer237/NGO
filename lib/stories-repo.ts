import { getPool } from "./db";
import type { Story, StoryCategory } from "./types";

export interface StoryRecord {
  id: string;
  slug_en: string;
  slug_fr: string;
  title_en: string;
  title_fr: string;
  category: StoryCategory;
  featured_image: string | null;
  summary_en: string | null;
  summary_fr: string | null;
  body_en: string;
  body_fr: string;
  related_project: string | null;
  status: "draft" | "review" | "approved" | "published" | "archived";
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

function toStory(row: StoryRecord): Story {
  return {
    slug: { en: row.slug_en, fr: row.slug_fr },
    title: { en: row.title_en, fr: row.title_fr },
    date: row.published_at ?? row.created_at,
    category: row.category,
    featured_image: row.featured_image,
    summary: { en: row.summary_en ?? "", fr: row.summary_fr ?? "" },
    body: { en: row.body_en, fr: row.body_fr },
    related_project: row.related_project,
  };
}

function requirePool() {
  const pool = getPool();
  if (!pool) throw new Error("DATABASE_URL is not set.");
  return pool;
}

// Public-site reads — only ever published rows, silently returns [] if no
// database is configured so app/[locale]/stories/* can fall back to the
// static content/stories.ts list rather than crash.
export async function getPublishedStories(): Promise<Story[]> {
  const pool = getPool();
  if (!pool) return [];
  const { rows } = await pool.query<StoryRecord>(
    "select * from stories where status = 'published' order by published_at desc"
  );
  return rows.map(toStory);
}

export async function getPublishedStoryBySlug(locale: "en" | "fr", slug: string): Promise<Story | null> {
  const pool = getPool();
  if (!pool) return null;
  const column = locale === "en" ? "slug_en" : "slug_fr";
  const { rows } = await pool.query<StoryRecord>(
    `select * from stories where status = 'published' and ${column} = $1 limit 1`,
    [slug]
  );
  return rows[0] ? toStory(rows[0]) : null;
}

// Admin reads/writes — every status, used by /admin/posts.
export async function listAllStories(): Promise<StoryRecord[]> {
  const pool = requirePool();
  const { rows } = await pool.query<StoryRecord>("select * from stories order by updated_at desc");
  return rows;
}

export async function getStoryById(id: string): Promise<StoryRecord | null> {
  const pool = requirePool();
  const { rows } = await pool.query<StoryRecord>("select * from stories where id = $1", [id]);
  return rows[0] ?? null;
}

export interface StoryInput {
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
  related_project: string | null;
}

export async function createStory(input: StoryInput, authorId: string): Promise<StoryRecord> {
  const pool = requirePool();
  const { rows } = await pool.query<StoryRecord>(
    `insert into stories
       (slug_en, slug_fr, title_en, title_fr, category, featured_image, summary_en, summary_fr, body_en, body_fr, related_project, author_id)
     values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
     returning *`,
    [
      input.slug_en,
      input.slug_fr,
      input.title_en,
      input.title_fr,
      input.category,
      input.featured_image,
      input.summary_en,
      input.summary_fr,
      input.body_en,
      input.body_fr,
      input.related_project,
      authorId,
    ]
  );
  return rows[0];
}

export async function updateStory(id: string, input: StoryInput): Promise<StoryRecord | null> {
  const pool = requirePool();
  const { rows } = await pool.query<StoryRecord>(
    `update stories set
       slug_en = $2, slug_fr = $3, title_en = $4, title_fr = $5, category = $6,
       featured_image = $7, summary_en = $8, summary_fr = $9, body_en = $10, body_fr = $11,
       related_project = $12, updated_at = now()
     where id = $1
     returning *`,
    [
      id,
      input.slug_en,
      input.slug_fr,
      input.title_en,
      input.title_fr,
      input.category,
      input.featured_image,
      input.summary_en,
      input.summary_fr,
      input.body_en,
      input.body_fr,
      input.related_project,
    ]
  );
  return rows[0] ?? null;
}

export type StoryStatus = StoryRecord["status"];

export async function setStoryStatus(id: string, status: StoryStatus): Promise<StoryRecord | null> {
  const pool = requirePool();
  const publishedAtClause = status === "published" ? ", published_at = coalesce(published_at, now())" : "";
  const { rows } = await pool.query<StoryRecord>(
    `update stories set status = $2, updated_at = now()${publishedAtClause} where id = $1 returning *`,
    [id, status]
  );
  return rows[0] ?? null;
}

export async function deleteStory(id: string): Promise<void> {
  const pool = requirePool();
  await pool.query("delete from stories where id = $1", [id]);
}
