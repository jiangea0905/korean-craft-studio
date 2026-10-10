import type { KeyboardEvent, ReactNode } from "react";

interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: readonly TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  ariaLabel: string;
}

interface TabPanelProps {
  id: string;
  activeId: string;
  children: ReactNode;
}

export function Tabs({ tabs, activeId, onChange, ariaLabel }: TabsProps) {
  function moveTo(index: number) {
    const next = tabs[(index + tabs.length) % tabs.length];
    onChange(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        moveTo(index + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        moveTo(index - 1);
        break;
      case "Home":
        e.preventDefault();
        moveTo(0);
        break;
      case "End":
        e.preventDefault();
        moveTo(tabs.length - 1);
        break;
    }
  }

  return (
    <div role="tablist" aria-label={ariaLabel} className="flex gap-1 border-b border-line">
      {tabs.map((tab, index) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active}
            aria-controls={`panel-${tab.id}`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`-mb-px min-h-11 flex-1 border-b-2 px-3 py-2 text-sm sm:flex-none sm:px-6 sm:text-base ${
              active
                ? "border-celadon-deep font-bold text-ink underline decoration-celadon-deep decoration-2 underline-offset-8"
                : "border-transparent font-normal text-muted hover:text-ink"
            } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-celadon-deep`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({ id, activeId, children }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      hidden={id !== activeId}
      tabIndex={0}
      className="pt-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-celadon-deep"
    >
      {children}
    </div>
  );
}
