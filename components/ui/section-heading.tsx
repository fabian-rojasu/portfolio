export function SectionHeading({
  id,
  label,
  title,
  inverted = false,
}: {
  id: string;
  label: string;
  title: string;
  inverted?: boolean;
}) {
  return (
    <header className="flex flex-col gap-3">
      <p className={`flex items-center gap-2 font-mono text-xs ${inverted ? "text-on-ink-dim" : "text-muted"}`}>
        <span aria-hidden className="size-2 bg-accent" />
        {label}
      </p>
      <h2 id={id} className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight font-light tracking-[-0.01em]">
        {title}
      </h2>
    </header>
  );
}
