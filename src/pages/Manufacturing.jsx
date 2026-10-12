import { Link } from "@tanstack/react-router";
import { useSite } from "../store/SiteStore";
import SiteImage from "../components/SiteImage";
import Reveal from "../components/Reveal";
import { CtaBand, PageHero, SectionHeading, sortVisible } from "../components/Common";

export default function Manufacturing() {
  const { data } = useSite();
  const m = data.manufacturing;
  const s = data.settings;
  const steps = sortVisible(m.steps);
  const gallery = sortVisible(data.gallery).filter((g) => ["Manufacturing", "Packaging"].includes(g.category)).slice(0, 3);
  return (
    <>
      <PageHero eyebrow="Manufacturing" title={m.heading} text={m.intro} image={m.image} />
      <section className="container-x py-24">
        <SectionHeading center eyebrow="Our Process" title="From water to dispatch" text="An illustrative outline of the manufacturing stages." />
        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((st, i) => (
            <Reveal as="li" key={st.id} delay={i * 70} className="card card-hover img-zoom overflow-hidden">
              <SiteImage src={st.image} alt={st.title} className="aspect-[4/3] w-full" />
              <div className="p-5">
                <span className="font-display text-3xl font-extrabold text-aqua">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-bold">{st.title}</h3>
                <p className="mt-2 text-sm text-slate">{st.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <p className="mt-6 text-center text-xs text-slate">Imagery is illustrative and does not depict the CASPIRA facility.</p>
      </section>
      <section className="bg-ice py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow="Packaging" title="Packaging overview" text={m.packagingText} />
          <Reveal className="img-zoom overflow-hidden rounded-[2rem]"><SiteImage src={m.packagingImage} alt="Packaged bottles ready for dispatch" className="aspect-[4/3] w-full" /></Reveal>
        </div>
      </section>
      <section className="container-x py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Quality-conscious practices" title="Care at every stage" text={data.quality.statement} />
          <Link to="/gallery" className="btn btn-outline">View Gallery</Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {gallery.map((g) => <div key={g.id} className="img-zoom overflow-hidden rounded-2xl"><SiteImage src={g.image} alt={g.title} className="aspect-[4/3] w-full" /></div>)}
        </div>
      </section>
      <CtaBand heading={s.ctaHeading} body={s.ctaBody} image={s.ctaImage} />
    </>
  );
}
