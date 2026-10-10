import { useId, useState, type ReactNode } from "react";

type DisclosureProps = { title: string; children: ReactNode; defaultOpen?: boolean };

export function Disclosure({ title, children, defaultOpen = false }: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <div className="disclosure">
      <h3 className="disclosure-heading">
        <button
          type="button"
          className="disclosure-trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(value => !value)}
        >
          <span>{title}</span><span className={open ? "chevron is-open" : "chevron"} aria-hidden="true">⌄</span>
        </button>
      </h3>
      <div id={panelId} hidden={!open} className="disclosure-panel">{children}</div>
    </div>
  );
}
