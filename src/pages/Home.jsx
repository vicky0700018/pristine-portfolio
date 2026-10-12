import { Link } from "@tanstack/react-router";
import { useSite } from "../store/SiteStore";
import Icon from "../components/Icon";
import SiteImage from "../components/SiteImage";
import Reveal from "../components/Reveal";
import { CtaBand, ProductCard, SectionHeading, Waves, publishedProducts, sortVisible } from "../components/Common";
import { formatDate } from "../utils/navigation";

function Hero({ s }) {
  return (
    <section className="relative overflow-hidden bg-ice">
      <SiteImage src={s.heroImage} alt="Premium mineral water bottles with a fresh water splash" eager className="absolute inset-0 h-full w-full" />
      <div className="hero-overlay absolute inset-0" />
      <div className="container-x relative flex min-h-[78vh] items-center py-24">
        <div className="max-w-xl">
          <span className="eyebrow anim-fade-up"><span className="h-px w-8 bg-aqua" />{s.heroEyebrow}</span>
          <h1 className="anim-fade-up mt-5 text-5xl font-extrabold leading-[1.02] md:text-7xl" style={{ animationDelay: "120ms" }}>{s.heroHeading}</h1>
          <p className="anim-fade-up mt-6 text-lg leading-relaxed text-slate md:text-xl" style={{ animationDelay: "240ms" }}>{s.heroDescription}</p>
          <div className="anim-fade-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
            <Link to="/products" className="btn btn-primary">{s.primaryCta} <Icon name="arrow" className="h-4 w-4" /></Link>
            <Link to="/contact" className="btn btn-outline">{s.secondaryCta}</Link>
          </div>
        </div>
      </div>
      <Waves />
    </section>
  );
}

function Intro({ s }) {
  return (
    <section className="container-x grid items-center gap-12 py-24 lg:grid-cols-2">
      <Reveal className="img-zoom relative overflow-hidden rounded-[2rem]">
        <SiteImage src={s.introImage} alt="A glass of fresh, clear water" className="aspect-[4/5] w-full" />
        <div className="absolute bottom-5 left-5 rounded-2xl bg-background/95 px-5 py-4 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate">Based in</p>
          <p className="font-display font-bold text-ocean">Kannad, Maharashtra</p>
        </div>
      </Reveal>
      <div>
        <SectionHeading eyebrow="Brand Introduction" title={s.introHeading} text={s.introBody} />
        <Reveal delay={120}>
          <Link to="/about" className="btn btn-primary mt-8">Discover Our Company <Icon name="arrow" className="h-4 w-4" /></Link>
        </Reveal>
      </div>
    </section>
  );
}

function Products({ data }) {
  const list = publishedProducts(data.products);
  return (
    <section className="bg-ice py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Our Products" title="A range shaped around everyday hydration" text="Illustrative packaging formats — final product details will be confirmed by the business." />
          <Link to="/products" className="btn btn-outline">View All Products</Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {list.map((p, i) => <Reveal key={p.id} delay={i * 60}><ProductCard product={p} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function Why({ data }) {
  const list = sortVisible(data.features);
  return (
    <section className="container-x py-24">
      <SectionHeading center eyebrow="Why Choose CASPIRA" title="What our brand stands for" />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((f, i) => (
          <Reveal key={f.id} delay={i * 80} className="card card-hover p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ice text-royal"><Icon name={f.icon} className="h-6 w-6" /></span>
            <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">{f.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Manufacturing({ s }) {
  return (
    <section className="relative overflow-hidden bg-ocean">
      <div className="grid lg:grid-cols-2">
        <SiteImage src={s.mfgImage} alt="Illustrative bottling production line" className="h-80 w-full lg:h-full" />
        <div className="px-6 py-20 md:px-14">
          <SectionHeading light eyebrow="Manufacturing" title={s.mfgHeading} text={s.mfgBody} />
          <Reveal delay={120} className="mt-8 grid grid-cols-2 gap-4 text-sm text-primary-foreground/85">
            {["Processing", "Bottle filling", "Packaging", "Dispatch preparation"].map((t) => (
              <span key={t} className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-aqua" />{t}</span>
            ))}
          </Reveal>
          <Reveal delay={200}><Link to="/manufacturing" className="btn btn-aqua mt-9">Learn About Our Manufacturing <Icon name="arrow" className="h-4 w-4" /></Link></Reveal>
        </div>
      </div>
    </section>
  );
}

function Quality({ data }) {
  const list = sortVisible(data.quality.sections);
  return (
    <section className="water-pattern py-24">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading eyebrow="Quality & Purity" title="A quality-conscious approach" text={data.quality.statement} />
          <Reveal delay={100}><Link to="/quality" className="btn btn-outline mt-8">Our Quality Approach</Link></Reveal>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {list.map((q, i) => (
            <Reveal key={q.id} delay={i * 80} className="card p-6">
              <Icon name={q.icon} className="h-7 w-7 text-aqua" />
              <h3 className="mt-4 font-bold">{q.heading}</h3>
              <p className="mt-2 text-sm text-slate">{q.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats({ data }) {
  const list = sortVisible(data.stats);
  if (!list.length) return null;
  return (
    <section className="border-y bg-background py-16">
      <div className="container-x grid grid-cols-2 gap-8 lg:grid-cols-4">
        {list.map((st) => (
          <Reveal key={st.id} className="text-center">
            <p className="font-display text-4xl font-extrabold text-royal md:text-5xl">{st.value || "—"}</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-slate">{st.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function GalleryPreview({ data }) {
  const list = sortVisible(data.gallery).slice(0, 5);
  return (
    <section className="container-x py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Gallery" title="Moments of freshness" />
        <Link to="/gallery" className="btn btn-outline">View Full Gallery</Link>
      </div>
      <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
        {list.map((g, i) => (
          <Reveal key={g.id} delay={i * 60} className={`img-zoom overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
            <Link to="/gallery" className="block h-full"><SiteImage src={g.image} alt={g.title} className="h-full w-full" /></Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Updates({ data }) {
  const list = data.announcements.filter((a) => a.status === "published");
  if (!list.length) return null;
  return (
    <section className="bg-ice py-24">
      <div className="container-x">
        <SectionHeading eyebrow="Latest Updates" title="News from CASPIRA" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => (
            <Reveal key={a.id} className="card overflow-hidden">
              {a.image && <SiteImage src={a.image} alt="" className="aspect-[16/9] w-full" />}
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-aqua">{formatDate(a.date)}</p>
                <h3 className="mt-2 text-lg font-bold">{a.title}</h3>
                <p className="mt-2 text-sm text-slate">{a.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { data } = useSite();
  const s = data.settings;
  const blocks = {
    intro: <Intro s={s} />,
    products: <Products data={data} />,
    why: <Why data={data} />,
    manufacturing: <Manufacturing s={s} />,
    quality: <Quality data={data} />,
    stats: <Stats data={data} />,
    gallery: <GalleryPreview data={data} />,
    cta: <CtaBand heading={s.ctaHeading} body={s.ctaBody} image={s.ctaImage} />,
    updates: <Updates data={data} />,
  };
  return (
    <>
      <Hero s={s} />
      {data.homeSections.filter((h) => h.visible).map((h) => <div key={h.id}>{blocks[h.id]}</div>)}
    </>
  );
}
