export function TagList({ items, label }: { items: readonly string[]; label?: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2 font-mono text-[0.8rem]">
      {items.map((item) => (
        <li key={item} className="border border-grid bg-canvas px-2 py-1">
          {item}
        </li>
      ))}
    </ul>
  );
}
