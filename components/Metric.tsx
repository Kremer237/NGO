import type { ImpactMetric } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

export default function Metric({
  metric,
  locale,
  pendingLabel,
}: {
  metric: ImpactMetric;
  locale: Locale;
  pendingLabel: string;
}) {
  return (
    <div className="border-t border-border pt-6">
      {metric.public ? (
        <p className="font-heading text-4xl font-semibold text-forest md:text-5xl">{metric.value}</p>
      ) : (
        <p className="font-heading text-2xl font-semibold text-slate md:text-3xl" aria-label={pendingLabel}>
          —
        </p>
      )}
      <p className="mt-2 text-sm text-slate">{metric.title[locale]}</p>
      {!metric.public && <p className="mt-1 text-xs italic text-slate/80">{pendingLabel}</p>}
    </div>
  );
}
