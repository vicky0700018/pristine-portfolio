import { Link } from "@tanstack/react-router";
import { useSite } from "../store/SiteStore";
import Icon from "../components/Icon";
import SiteImage from "../components/SiteImage";
import Reveal from "../components/Reveal";
import { PageHero, SectionHeading, sortVisible } from "../components/Common";

export default function Quality() {
  const { data } = useSite();
  const q = data.quality;
  const certs = q.certifications.filter((c) => c.verified && c.published);
  return (
    <>
      <PageHero eyebrow="Quality & Purity" title={q.heading} text={q.statement} image={q.image} />
      <section className="container-x py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sortVisible(q.sections).map((sec, i) => (
            <Reveal key={sec.id} delay={i * 70} className="card p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ice text-aqua"><Icon name={sec.icon} className="h-6 w-6" /></span>
              <h2 className="mt-5 text-lg font-bold">{sec.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate">{sec.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-ice py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Verified Certifications" title="Certifications" text="Only certifications verified and published by the business appear here." />
          {certs.length ? (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {certs.map((c) => (
                <div key={c.id} className="card p-6">
                  {c.image ? <SiteImage src={c.image} alt={c.name} className="h-24 w-24 object-contain" /> : <Icon name="award" className="h-10 w-10 text-royal" />}
                  <h3 className="mt-4 font-bold">{c.name}</h3>
                  <p className="text-sm text-slate">{c.authority}</p>
                  {c.validity && <p className="mt-2 text-xs font-semibold text-royal">Valid: {c.validity}</p>}
                  {c.notes && <p className="mt-2 text-sm text-slate">{c.notes}</p>}
                </div>
              ))}
            </div>
          ) : (
            <div className="card mt-10 flex items-center gap-4 p-6 text-sm text-slate"><Icon name="info" className="h-6 w-6 shrink-0 text-aqua" />Certification details will be shared here once verified documentation has been published.</div>
          )}
        </div>
      </section>
      <section className="container-x grid items-center gap-12 py-24 lg:grid-cols-2">
        <Reveal className="img-zoom overflow-hidden rounded-[2rem]"><SiteImage src={data.settings.introImage} alt="Fresh water" className="aspect-[4/3] w-full" /></Reveal>
        <div>
          <SectionHeading eyebrow="Quality Enquiry" title="Have a question about quality?" text="Our team is happy to respond to quality-related enquiries from customers and business partners." />
          <Link to="/contact" search={{ type: "Quality Enquiry" }} className="btn btn-primary mt-8">Send a Quality Enquiry <Icon name="arrow" className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
