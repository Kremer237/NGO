export default function SkipNav({ label }: { label: string }) {
  return (
    <a href="#main" className="skip-nav">
      {label}
    </a>
  );
}
