import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type TabItem = { id: string; label: string; content: ReactNode };
type TabsProps = { items: TabItem[]; label: string };

export function Tabs({ items, label }: TabsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = Math.max(0, items.findIndex(item => item.id === activeId));

  const moveFocus = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % items.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    setActiveId(items[next].id);
    tabRefs.current[next]?.focus();
  };

  if (items.length === 0) return null;
  const active = items[activeIndex];
  return (
    <div className="tabs-root">
      <div className="tab-list" role="tablist" aria-label={label}>
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={node => { tabRefs.current[index] = node; }}
            id={`tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={item.id === active.id}
            aria-controls={`panel-${item.id}`}
            tabIndex={item.id === active.id ? 0 : -1}
            className={item.id === active.id ? "tab-button is-active" : "tab-button"}
            onClick={() => setActiveId(item.id)}
            onKeyDown={event => moveFocus(event, index)}
          >{item.label}</button>
        ))}
      </div>
      <section id={`panel-${active.id}`} role="tabpanel" aria-labelledby={`tab-${active.id}`} tabIndex={0} className="tab-panel">
        {active.content}
      </section>
    </div>
  );
}
