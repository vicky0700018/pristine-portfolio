import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { clearData, getDefaults, loadData, saveData, uid } from "../utils/storage";

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const [data, setData] = useState(getDefaults);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setData(loadData());
    setReady(true);
  }, []);

  const commit = useCallback((updater, label) => {
    setData((prev) => {
      let next = typeof updater === "function" ? updater(prev) : updater;
      if (label) next = { ...next, activity: [{ id: uid("act"), label, at: new Date().toISOString() }, ...(next.activity || [])].slice(0, 30) };
      saveData(next);
      return next;
    });
  }, []);

  const api = useMemo(
    () => ({
      data,
      ready,
      setSection: (key, value, label) => commit((p) => ({ ...p, [key]: value }), label),
      patchSection: (key, patch, label) => commit((p) => ({ ...p, [key]: { ...p[key], ...patch } }), label),
      addEnquiry: (enq) => commit((p) => ({ ...p, enquiries: [{ ...enq, id: uid("enq"), status: "New", createdAt: new Date().toISOString() }, ...p.enquiries] })),
      replaceAll: (next, label) => commit(next, label),
      restoreDefaults: () => { clearData(); commit(getDefaults(), "Restored default demo content"); },
    }),
    [data, ready, commit],
  );

  return <SiteContext.Provider value={api}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}
