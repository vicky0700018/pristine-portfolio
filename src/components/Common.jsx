import { Link } from "@tanstack/react-router";
import Icon from "./Icon";
import SiteImage from "./SiteImage";
import Reveal from "./Reveal";

export function SectionHeading({ eyebrow, title, text, center = false, light = false }) {
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className={`eyebrow ${light ? "text-aqua" : ""}`}>
          <span className="h-px w-8 bg-aqua" />
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-4 text-3xl font-bold leading-tight md:text-4xl ${light ? "text-primary-foreground" : ""}`}>{title}</h2>
      {text && <p className={`mt-4 text-base leading-relaxed md:text-lg ${light ? "text-primary-foreground/80" : "text-slate"}`}>{text}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, text, image }) {
  return (
    <section className="relative overflow-hidden bg-ice">
      <SiteImage src={image} alt="" eager className="absolute inset-0 h-full w-full" />
      <div className="hero-overlay absolute inset-0" />
      <div className="container-x relative py-20 md:py-28">
        <div className="anim-fade-up max-w-xl">
          {eyebrow && <span className="eyebrow"><span className="h-px w-8 bg-aqua" />{eyebrow}</span>}
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] md:text-6xl">{title}</h1>
          {text && <p className="mt-5 text-lg leading-relaxed text-slate">{text}</p>}
        </div>
      </div>
      <Waves />
    </section>
  );
}

export function Waves({ fill = "#ffffff" }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 2400 60" preserveAspectRatio="none" className="anim-wave h-full w-[200%]">
        <path d="M0 30 Q150 0 300 30 T600 30 T900 30 T1200 30 T1500 30 T1800 30 T2100 30 T2400 30 V60 H0z" fill={fill} />
      </svg>
    </div>
  );
}

export function ProductCard({ product }) {
  return (
    <article className="card card-hover img-zoom flex flex-col overflow-hidden">
      <Link to="/products/$id" params={{ id: product.id }} className="block bg-ice">
        <SiteImage src={product.image} alt={`${product.name} ${product.capacity}`} className="aspect-[4/3] w-full" />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-ice px-3 py-1 text-xs font-semibold text-royal">{product.category}</span>
          <span className="text-sm font-bold text-aqua">{product.capacity}</span>
        </div>
        <h3 className="mt-4 text-lg font-bold">
          <Link to="/products/$id" params={{ id: product.id }}>{product.name} — {product.capacity}</Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{product.description}</p>
        <p className="mt-3 text-xs font-medium uppercase tracking-wider text-slate">{product.packaging}</p>
        <Link to="/contact" search={{ product: product.id }} className="btn btn-outline btn-sm mt-5 self-start">
          Enquire About Product <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export function CtaBand({ heading, body, image }) {
  return (
    <section className="navy-band relative overflow-hidden">
      {image && <SiteImage src={image} alt="" className="absolute inset-y-0 right-0 hidden h-full w-1/2 opacity-25 md:block" />}
      <div className="container-x relative py-20 md:py-24">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-bold leading-tight text-primary-foreground md:text-5xl">{heading}</h2>
          <p className="mt-5 text-lg text-primary-foreground/80">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-aqua">Send an Enquiry <Icon name="arrow" className="h-4 w-4" /></Link>
            <Link to="/contact" hash="contact-details" className="btn btn-ghost-light">Contact Our Team</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function EmptyState({ icon = "drop", title, text, children }) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ice text-aqua"><Icon name={icon} className="h-7 w-7" /></span>
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      {text && <p className="mt-2 max-w-md text-sm text-slate">{text}</p>}
      {children}
    </div>
  );
}

export const sortVisible = (list, key = "visible") => (list || []).filter((x) => x[key] !== false);
export const publishedProducts = (products) => (products || []).filter((p) => p.active && p.published);
