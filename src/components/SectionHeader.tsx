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
    <div className="max-w-3xl">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="section-heading mt-3">{title}</h2>
      {subtitle ? <p className="mt-5 text-body-large text-body">{subtitle}</p> : null}
    </div>
  );
}
