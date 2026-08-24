import type { Metadata } from "next";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";
import { projects } from "@/content/projects";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  return { title: dict.nav.projects, description: dict.projects.heroTitle };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);

  return (
    <Section tone="ivory" className="pt-20 md:pt-28">
      <h1 className="max-w-2xl font-heading text-3xl font-semibold leading-tight text-forest md:text-5xl">
        {dict.projects.heroTitle}
      </h1>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.project_id} project={project} locale={locale} dict={dict} />
        ))}
      </div>
    </Section>
  );
}
