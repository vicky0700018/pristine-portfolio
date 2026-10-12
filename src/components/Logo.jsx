import { useSite } from "../store/SiteStore";

export function LogoMark({ accent = "#18B6D2", className = "h-11 w-11", light = false }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M24 4C24 4 10 20.5 10 30a14 14 0 0 0 28 0C38 20.5 24 4 24 4z" fill={light ? "#ffffff" : "#073B66"} />
      <path d="M24 10.5C24 10.5 15 22 15 29a9 9 0 0 0 4 7.5" stroke={accent} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M13 32c3.6-3 7.2 1.6 11 0s7.4-3 11 0" stroke={accent} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="29.5" cy="22" r="2.2" fill={light ? "#073B66" : "#ffffff"} opacity=".85" />
    </svg>
  );
}

export default function Logo({ light = false, compact = false }) {
  const { data } = useSite();
  const { logoText, logoSubtext, accentColor } = data.settings;
  return (
    <span className="inline-flex items-center gap-3">
      <LogoMark accent={accentColor} light={light} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl font-extrabold tracking-[0.18em] ${light ? "text-primary-foreground" : "text-ocean"}`}>{logoText}</span>
        {!compact && <span className="mt-1 text-[0.55rem] font-semibold tracking-[0.2em]" style={{ color: accentColor }}>{logoSubtext}</span>}
      </span>
    </span>
  );
}
