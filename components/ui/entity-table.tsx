export type Entity = {
  name: string;
  fields: [key: string, value: string][];
  primary?: boolean;
};

export function EntityTable({ entity }: { entity: Entity }) {
  // The primary entity is the one solid ink block, offset over an orange shadow
  const styles = entity.primary
    ? {
        box: "border-ink bg-ink text-on-ink shadow-[8px_8px_0_var(--accent)]",
        head: "border-ink-line text-accent",
        key: "text-on-ink-dim",
      }
    : { box: "border-ink bg-surface", head: "border-ink", key: "text-muted" };

  return (
    <div className={`relative w-full border font-mono text-[0.8rem] ${styles.box}`}>
      <p className={`border-b px-4 py-2 font-medium ${styles.head}`}>{entity.name}</p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 px-4 py-3">
        {entity.fields.map(([key, value]) => (
          <div key={key} className="contents">
            <dt className={styles.key}>{key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
