import { useEffect, useState } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import Logo from "../components/Logo";
import Icon from "../components/Icon";
import { useSite } from "../store/SiteStore";
import { isActivePath, telHref } from "../utils/navigation";
import { publishedProducts } from "../components/Common";
import { applySeo } from "../utils/seo";

function Header() {
  const { data } = useSite();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const nav = data.nav.filter((n) => n.visible);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b bg-background/95 backdrop-blur transition-shadow ${scrolled ? "shadow-soft" : "border-transparent"}`}>
      <div className="container-x flex h-20 items-center justify-between gap-4">
        <Link to="/" aria-label={`${data.settings.logoText} home`}><Logo /></Link>
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.id} to={n.path} className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors ${isActivePath(path, n.path) ? "bg-ice text-royal" : "text-navy hover:text-royal"}`} aria-current={isActivePath(path, n.path) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/contact" className="btn btn-primary btn-sm hidden sm:inline-flex">Enquire Now</Link>
          <button className="rounded-full p-2 text-ocean hover:bg-ice xl:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className="border-t bg-background xl:hidden" aria-label="Mobile">
          <div className="container-x flex flex-col py-4">
            {nav.map((n) => (
              <Link key={n.id} to={n.path} onClick={() => setOpen(false)} className={`rounded-xl px-4 py-3 font-semibold ${isActivePath(path, n.path) ? "bg-ice text-royal" : "text-navy"}`}>{n.label}</Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn btn-primary mt-3">Enquire Now</Link>
          </div>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  const { data } = useSite();
  const s = data.settings;
  const products = publishedProducts(data.products).slice(0, 5);
  const socials = data.socials.filter((x) => x.visible && x.url);
  return (
    <footer className="navy-band text-primary-foreground/80">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-5 text-sm leading-relaxed">{s.footerDescription}</p>
          {socials.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {socials.map((x) => (
                <a key={x.id} href={x.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-aqua hover:text-primary-foreground">{x.label}<Icon name="external" className="h-3.5 w-3.5" /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary-foreground">Quick Links</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {data.nav.filter((n) => n.visible).map((n) => <li key={n.id}><Link to={n.path} className="hover:text-aqua">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary-foreground">Products</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {products.map((p) => <li key={p.id}><Link to="/products/$id" params={{ id: p.id }} className="hover:text-aqua">{p.name} — {p.capacity}</Link></li>)}
            <li><Link to="/products" className="font-semibold text-aqua hover:text-primary-foreground">View all products</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary-foreground">Contact</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex gap-3"><Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />{s.address}</li>
            <li className="flex gap-3"><Icon name="phone" className="h-4 w-4 shrink-0 text-aqua" /><a href={telHref(s.phone)} className="hover:text-aqua">{s.phone}</a></li>
            <li className="flex gap-3"><Icon name="mail" className="h-4 w-4 shrink-0 text-aqua" /><a href={`mailto:${s.email}`} className="break-all hover:text-aqua">{s.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-x flex flex-col gap-3 py-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>{s.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/admin/login" className="font-semibold hover:text-aqua">Admin Login</Link>
            <p className="font-semibold text-primary-foreground">Designed and development by SOSynch Ai Tech</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

const TITLES = { "/about": "About Us", "/products": "Our Products", "/manufacturing": "Manufacturing", "/quality": "Quality & Purity", "/gallery": "Gallery", "/contact": "Contact Us" };

export default function PublicLayout() {
  const { data, ready } = useSite();
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (!ready) return;
    const key = Object.keys(TITLES).find((k) => isActivePath(path, k));
    applySeo(data.seo, key ? TITLES[key] : null);
  }, [ready, path, data.seo]);
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] btn btn-primary btn-sm">Skip to content</a>
      <Header />
      <main id="main" className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}
