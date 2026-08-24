import type { Metadata } from "next";
import { getDictionary, resolveLocale, type Locale } from "@/lib/i18n";
import Section from "@/components/Section";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);
  return { title: dict.nav.about, description: dict.about.heroText };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dict = getDictionary(locale);

  return (
    <>
      <Section tone="ivory" className="pt-20 md:pt-28">
        <h1 className="max-w-2xl font-heading text-3xl font-semibold leading-tight text-forest md:text-5xl">
          {dict.about.heroText}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-charcoal/85">{dict.about.heroSubtext}</p>
      </Section>

      <Section tone="surface">
        <h2 className="font-heading text-2xl font-semibold text-forest">{dict.about.storyTitle}</h2>
        <div className="mt-6 flex max-w-2xl flex-col gap-4 text-base leading-relaxed text-charcoal/85">
          {dict.about.story.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>

      <Section tone="ivory">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-xl font-semibold text-forest">{dict.about.missionTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal/85">{dict.about.mission}</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold text-forest">{dict.about.visionTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal/85">{dict.about.vision}</p>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <h2 className="font-heading text-2xl font-semibold text-forest">{dict.about.principlesTitle}</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {dict.about.principles.map((p) => (
            <div key={p.number} className="border-t border-border pt-4">
              <p className="text-xs font-semibold text-ochre">{p.number}</p>
              <h3 className="mt-2 font-heading text-lg font-semibold text-forest">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/80">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ivory">
        <h2 className="font-heading text-2xl font-semibold text-forest">{dict.about.teamTitle}</h2>
        <p className="mt-4 max-w-2xl text-lg font-medium text-charcoal">{dict.about.teamText}</p>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-charcoal/85">{dict.about.teamSubtext}</p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {dict.about.teamRoles.map((role) => (
            <li key={role} className="rounded-button border border-border px-4 py-2 text-sm text-slate">
              {role}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs italic text-slate">{dict.about.teamNote}</p>
      </Section>

      <Section tone="forest">
        <h2 className="font-heading text-2xl font-semibold">{dict.about.futureVisionTitle}</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ivory/90">{dict.about.futureVision}</p>
      </Section>
    </>
  );
}
