import { useEffect, useRef, type ReactNode } from "react";

type ModalDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
};

const FOCUSABLE = [
  'a[href]:not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  'input:not([disabled]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function ModalDialog({ open, title, description, onClose, children }: ModalDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = "custom-dialog-title";
  const descriptionId = "custom-dialog-description";

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => {
      const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? dialogRef.current)?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
        .filter(element => element.offsetWidth > 0 || element.offsetHeight > 0);
      if (items.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div
        ref={dialogRef}
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
      >
        <div className="modal-heading">
          <div><h3 id={titleId}>{title}</h3>{description && <p id={descriptionId}>{description}</p>}</div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog">×</button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
