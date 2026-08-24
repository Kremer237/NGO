import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "text";

const base =
  "inline-flex items-center justify-center rounded-button px-6 min-h-[48px] text-sm font-medium tracking-wide transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-ivory hover:bg-[#0f281f]",
  secondary: "border border-forest text-forest hover:bg-forest hover:text-ivory bg-transparent",
  ghost: "border border-border text-charcoal hover:border-forest",
  text: "text-forest underline-offset-4 hover:underline px-0 min-h-0",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
