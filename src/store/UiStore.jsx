import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Icon from "../components/Icon";

const UiContext = createContext(null);

export function UiProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [dialog, setDialog] = useState(null);
  const resolver = useRef(null);

  const toast = useCallback((message, type = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  const confirm = useCallback((opts) => {
    setDialog(typeof opts === "string" ? { message: opts } : opts);
    return new Promise((resolve) => { resolver.current = resolve; });
  }, []);

  const close = (value) => { resolver.current?.(value); resolver.current = null; setDialog(null); };

  return (
    <UiContext.Provider value={{ toast, confirm }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} role="status" className={`anim-toast flex max-w-sm items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-primary-foreground shadow-lift ${t.type === "error" ? "bg-danger" : "bg-ocean"}`}>
            <Icon name={t.type === "error" ? "info" : "check"} className="h-4 w-4 shrink-0" />
            {t.message}
          </div>
        ))}
      </div>
      {dialog && <ConfirmDialog dialog={dialog} onClose={close} />}
    </UiContext.Provider>
  );
}

function ConfirmDialog({ dialog, onClose }) {
  const btn = useRef(null);
  useEffect(() => {
    btn.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-navy/60 p-4" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="card w-full max-w-md p-6">
        <h2 id="confirm-title" className="text-lg font-bold">{dialog.title || "Please confirm"}</h2>
        <p className="mt-2 text-sm text-slate">{dialog.message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button className="btn btn-outline btn-sm" onClick={() => onClose(false)}>Cancel</button>
          <button ref={btn} className={`btn btn-sm ${dialog.danger === false ? "btn-primary" : "btn-danger"}`} onClick={() => onClose(true)}>{dialog.confirmText || "Confirm"}</button>
        </div>
      </div>
    </div>
  );
}

export function useUi() {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be used inside UiProvider");
  return ctx;
}
