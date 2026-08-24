import Link from "next/link";

export default function ProgramCard({
  name,
  text,
  cta,
  href,
  badge,
}: {
  name: string;
  text: string;
  cta: string;
  href: string;
  badge?: string;
}) {
  return (
    <div className="flex flex-col justify-between border border-border bg-surface p-8">
      <div>
        <div className="flex items-center gap-3">
          <h3 className="font-heading text-xl font-semibold text-forest">{name}</h3>
          {badge && (
            <span className="rounded-button border border-ochre px-2 py-0.5 text-xs font-medium text-ochre">{badge}</span>
          )}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate">{text}</p>
      </div>
      <Link href={href} className="mt-6 text-sm font-medium text-forest underline-offset-4 hover:underline">
        {cta} →
      </Link>
    </div>
  );
}
