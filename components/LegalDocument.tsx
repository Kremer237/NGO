import type { Locale } from "@/lib/i18n";
import type { LegalDocument } from "@/content/legal";
import { draftBanner } from "@/content/legal";
import Section from "./Section";

export default function LegalDocumentView({ doc, locale }: { doc: LegalDocument; locale: Locale }) {
  return (
    <Section tone="ivory" className="pt-20 md:pt-28">
      <h1 className="font-heading text-3xl font-semibold text-forest md:text-4xl">{doc.title[locale]}</h1>
      <p className="mt-3 text-sm text-slate">{doc.effectiveDateNote[locale]}</p>
      <div role="note" className="mt-6 max-w-2xl border border-ochre/40 bg-ochre/10 p-4 text-sm text-charcoal">
        {draftBanner[locale]}
      </div>
      <div className="mt-10 flex max-w-2xl flex-col gap-8">
        {doc.sections.map((section) => (
          <div key={section.heading.en}>
            <h2 className="font-heading text-lg font-semibold text-forest">{section.heading[locale]}</h2>
            <div className="mt-2 flex flex-col gap-3 text-sm leading-relaxed text-charcoal/90">
              {section.body.map((paragraph) => (
                <p key={paragraph.en.slice(0, 40)}>{paragraph[locale]}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
