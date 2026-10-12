import { useState } from "react";
import { useSite } from "../store/SiteStore";
import SiteImage from "../components/SiteImage";
import Lightbox from "../components/Lightbox";
import { EmptyState, PageHero, sortVisible } from "../components/Common";
import { IMAGES } from "../data/initialData";

export default function Gallery() {
  const { data } = useSite();
  const all = sortVisible(data.gallery);
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(-1);
  const cats = ["All", ...new Set(all.map((g) => g.category))];
  const list = all.filter((g) => cat === "All" || g.category === cat);
  return (
    <>
      <PageHero eyebrow="Gallery" title="A closer look at CASPIRA" text="Product, water and manufacturing imagery. Manufacturing photographs are illustrative." image={IMAGES.splash} />
      <section className="container-x py-16">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${cat === c ? "bg-ocean text-primary-foreground" : "bg-ice text-ocean hover:bg-border"}`}>{c}</button>
          ))}
        </div>
        {list.length ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((g, i) => (
              <button key={g.id} onClick={() => setOpen(i)} className="group img-zoom relative overflow-hidden rounded-2xl text-left" aria-label={`Open ${g.title}`}>
                <SiteImage src={g.image} alt={g.title} className="aspect-[4/3] w-full" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent p-5 opacity-90 transition-opacity group-hover:opacity-100">
                  <span className="block text-xs font-semibold uppercase tracking-widest text-aqua">{g.category}</span>
                  <span className="mt-1 block font-bold text-primary-foreground">{g.title}</span>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-10"><EmptyState icon="image" title="No images published yet" text="Gallery images will appear here once they are published." /></div>
        )}
      </section>
      {open >= 0 && <Lightbox items={list} index={open} onIndex={setOpen} onClose={() => setOpen(-1)} />}
    </>
  );
}
