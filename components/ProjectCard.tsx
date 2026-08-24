import Link from "next/link";
import type { Project } from "@/lib/types";
import type { Locale, Dictionary } from "@/lib/i18n";

export default function ProjectCard({ project, locale, dict }: { project: Project; locale: Locale; dict: Dictionary }) {
  return (
    <Link
      href={`/${locale}/projects/${project.slug[locale]}`}
      className="block border border-border bg-surface p-8 transition-colors hover:border-forest"
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate">
        <span>{dict.projects.filters[project.category]}</span>
        <span className="rounded-button border border-border px-2 py-0.5">{dict.projects.status[project.status]}</span>
      </div>
      <h3 className="mt-4 font-heading text-xl font-semibold text-forest">{project.name[locale]}</h3>
      <p className="mt-1 text-sm text-slate">{project.location}</p>
      <p className="mt-4 text-sm leading-relaxed text-charcoal/80">{project.summary[locale]}</p>
      <span className="mt-6 inline-block text-sm font-medium text-forest underline-offset-4 hover:underline">
        {dict.projects.viewProject} →
      </span>
    </Link>
  );
}
