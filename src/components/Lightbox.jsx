import { useEffect, useRef } from "react";
import Icon from "./Icon";
import SiteImage from "./SiteImage";

export default function Lightbox({ items, index, onClose, onIndex }) {
  const closeRef = useRef(null);
  const item = items[index];
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [index, items.length, onClose, onIndex]);
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/90 p-4" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} onClick={onClose} className="absolute -top-12 right-0 rounded-full p-2 text-primary-foreground hover:bg-primary-foreground/10" aria-label="Close preview">
          <Icon name="close" className="h-6 w-6" />
        </button>
        <SiteImage src={item.image} alt={item.title} eager className="max-h-[75vh] w-full rounded-2xl object-contain" />
        <div className="mt-4 flex items-start justify-between gap-4 text-primary-foreground">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-aqua">{item.category}</p>
            <h3 className="mt-1 text-xl font-bold text-primary-foreground">{item.title}</h3>
            <p className="mt-1 text-sm text-primary-foreground/75">{item.description}</p>
          </div>
          {items.length > 1 && (
            <div className="flex shrink-0 gap-2">
              <button className="rounded-full border border-primary-foreground/40 p-2 hover:bg-primary-foreground/10" onClick={() => onIndex((index - 1 + items.length) % items.length)} aria-label="Previous image"><Icon name="arrowLeft" /></button>
              <button className="rounded-full border border-primary-foreground/40 p-2 hover:bg-primary-foreground/10" onClick={() => onIndex((index + 1) % items.length)} aria-label="Next image"><Icon name="arrow" /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
