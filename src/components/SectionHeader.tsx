export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-[640px]">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="heading mt-2 text-ink">{title}</h2>
      {subtitle ? <p className="lead mt-4">{subtitle}</p> : null}
    </div>
  );
}
