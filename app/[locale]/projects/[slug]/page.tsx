import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, locales, resolveLocale, type Locale } from "@/lib/i18n";
import { projects, getProjectBySlug } from "@/content/projects";
import Section from "@/components/Section";
import Button from "@/components/Button";
import ProgressIndicator from "@/components/ProgressIndicator";

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug[locale] })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const project = getProjectBySlug(locale, slug);
  const dict = getDictionary(locale);
  if (!project) return { title: dict.nav.projects };
  return { title: project.name[locale], description: project.summary[locale] };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  const project = getProjectBySlug(locale, slug);
  if (!project) notFound();

  const detailRows: [string, string][] = [
    [dict.projects.detailLabels.location, project.location],
    [dict.projects.detailLabels.status, dict.projects.status[project.status]],
    [dict.projects.detailLabels.totalBudget, project.goal_amount ? String(project.goal_amount) : dict.projects.detailLabels.pending],
    [dict.projects.detailLabels.funded, project.amount_raised ? String(project.amount_raised) : dict.projects.detailLabels.pending],
    [dict.projects.detailLabels.remaining, dict.projects.detailLabels.pending],
    [
      dict.projects.detailLabels.expectedCompletion,
      project.target_completion_date ?? dict.projects.detailLabels.pending,
    ],
  ];

  return (
    <>
      <Section tone="ivory" className="pt-20 md:pt-28">
        <p className="text-xs font-semibold uppercase tracking-wide text-ochre">
          {dict.projects.filters[project.category]}
        </p>
        <h1 className="mt-3 max-w-2xl font-heading text-3xl font-semibold leading-tight text-forest md:text-5xl">
          {project.name[locale]}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-charcoal/85">{project.description[locale]}</p>
      </Section>

      <Section tone="surface">
        <div className="grid gap-10 md:grid-cols-2">
          <dl className="grid grid-cols-2 gap-6">
            {detailRows.map(([label, value]) => (
              <div key={label} className="border-t border-border pt-3">
                <dt className="text-xs uppercase tracking-wide text-slate">{label}</dt>
                <dd className="mt-1 text-sm font-medium text-charcoal">{value}</dd>
              </div>
            ))}
          </dl>
          <div>
            <ProgressIndicator
              raisedLabel={dict.projects.progress.raised}
              goalLabel={dict.projects.progress.goal}
              pendingNote={dict.projects.progress.pendingNote}
            />
            <Button href={`/${locale}/donate`} variant="primary" className="mt-6">
              {dict.projects.supportCta}
            </Button>
          </div>
        </div>

        {project.data_pending.length > 0 && (
          <div className="mt-12 border border-border bg-ivory p-6">
            <p className="text-sm font-semibold text-forest">{dict.projects.dataPendingLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.data_pending.map((item) => (
                <li key={item} className="rounded-button border border-border px-3 py-1 text-xs text-slate">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>
    </>
  );
}
