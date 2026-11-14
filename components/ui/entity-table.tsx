export type Entity = {
  name: string;
  fields: [key: string, value: string][];
  primary?: boolean;
};

export function EntityTable({ entity }: { entity: Entity }) {
  const edge = entity.primary ? "border-signal" : "border-edge";

  return (
    <div className={`relative w-full border bg-graphite font-mono text-[0.8rem] ${edge}`}>
      <p className={`border-b px-4 py-2 font-medium ${edge} ${entity.primary ? "text-signal" : ""}`}>
        {entity.name}
      </p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 px-4 py-3">
        {entity.fields.map(([key, value]) => (
          <div key={key} className="contents">
            <dt className="text-muted">{key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
