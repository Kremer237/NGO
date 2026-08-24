import type { Metadata } from "next";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";
import Section from "@/components/Section";
import VolunteerForm from "@/components/VolunteerForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  return { title: dict.nav.volunteer, description: dict.volunteer.heroTitle };
}

export default async function VolunteerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  const v = dict.volunteer;

  return (
    <>
      <Section tone="ivory" className="pt-20 md:pt-28">
        <h1 className="max-w-2xl font-heading text-3xl font-semibold leading-tight text-forest md:text-5xl">
          {v.heroTitle}
        </h1>
      </Section>

      <Section tone="surface">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-heading text-lg font-semibold text-forest">{v.cameroonTitle}</h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-charcoal/85">
              {v.cameroonAreas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-forest">{v.remoteTitle}</h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-charcoal/85">
              {v.remoteAreas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          {v.steps.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <span className="rounded-button border border-border px-4 py-2 text-sm text-slate">{s}</span>
              {i < v.steps.length - 1 && <span className="text-slate">→</span>}
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ivory">
        <h2 className="font-heading text-2xl font-semibold text-forest">{v.formTitle}</h2>
        <div className="mt-8 max-w-2xl">
          <VolunteerForm dict={dict} />
        </div>
      </Section>
    </>
  );
}
