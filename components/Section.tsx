import Container from "./Container";

export default function Section({
  children,
  className = "",
  tone = "ivory",
  as: As = "section",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "ivory" | "surface" | "forest";
  as?: keyof JSX.IntrinsicElements;
}) {
  const toneClass =
    tone === "forest" ? "bg-forest text-ivory" : tone === "surface" ? "bg-surface text-charcoal" : "bg-ivory text-charcoal";
  return (
    <As className={`${toneClass} py-16 md:py-24 ${className}`}>
      <Container>{children}</Container>
    </As>
  );
}
