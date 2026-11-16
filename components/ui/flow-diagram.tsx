import { EntityTable, type Entity } from "@/components/ui/entity-table";

// Entities joined by relation lines: a column on mobile, a row from lg up
export function FlowDiagram({ entities, caption }: { entities: Entity[]; caption: string }) {
  return (
    <figure className="flex flex-col gap-4">
      <ol className="flex flex-col lg:flex-row lg:items-center">
        {entities.map((entity, index) => (
          <li key={entity.name} className="flex flex-col items-center lg:flex-1 lg:flex-row">
            {index > 0 && <span aria-hidden className="h-8 w-px shrink-0 bg-ink lg:h-px lg:w-8" />}
            <EntityTable entity={entity} />
          </li>
        ))}
      </ol>
      <figcaption className="text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}
