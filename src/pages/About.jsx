import { useSite } from "../store/SiteStore";
import SiteImage from "../components/SiteImage";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import { CtaBand, PageHero, SectionHeading, sortVisible } from "../components/Common";

export default function About() {
  const { data } = useSite();
  const a = data.about;
  const s = data.settings;
  return (
    <>
      <PageHero eyebrow="About Us" title={a.heroHeading} text={a.heroText} image={a.heroImage} />
      <section className="container-x space-y-24 py-24">
        {sortVisible(a.sections).map((sec, i) => (
          <div key={sec.id} className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal className={`img-zoom overflow-hidden rounded-[2rem] ${i % 2 ? "lg:order-2" : ""}`}>
              <SiteImage src={sec.image} alt={sec.heading} className="aspect-[4/3] w-full" />
            </Reveal>
            <SectionHeading eyebrow={`0${i + 1}`} title={sec.heading} text={sec.body} />
          </div>
        ))}
      </section>
      <section className="bg-ice py-24">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[["Our Vision", a.vision, "globe"], ["Our Mission", a.mission, "star"]].map(([t, body, ic]) => (
            <Reveal key={t} className="card p-10">
              <Icon name={ic} className="h-8 w-8 text-aqua" />
              <h2 className="mt-5 text-2xl font-bold">{t}</h2>
              <p className="mt-3 leading-relaxed text-slate">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="container-x py-24">
        <SectionHeading center eyebrow="Our Values" title="The principles behind CASPIRA" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sortVisible(a.values).map((v, i) => (
            <Reveal key={v.id} delay={i * 70} className="border-t-2 border-aqua pt-6">
              <h3 className="text-lg font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-slate">{v.description}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand heading={s.ctaHeading} body={s.ctaBody} image={s.ctaImage} />
    </>
  );
}
