import { getDictionary, defaultLocale } from "@/lib/i18n";
import Section from "@/components/Section";
import Button from "@/components/Button";

export default function NotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <Section tone="ivory" className="pt-28 text-center">
      <h1 className="mx-auto max-w-lg font-heading text-2xl font-semibold text-forest md:text-3xl">
        {dict.notFound.title}
      </h1>
      <Button href={`/${defaultLocale}`} variant="primary" className="mt-8">
        {dict.notFound.cta}
      </Button>
    </Section>
  );
}
