import { useMemo, useState } from "react";
import { useSite } from "../store/SiteStore";
import Icon from "../components/Icon";
import { EmptyState, PageHero, ProductCard, publishedProducts } from "../components/Common";
import { IMAGES } from "../data/initialData";

export default function Products() {
  const { data } = useSite();
  const all = publishedProducts(data.products);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [size, setSize] = useState("All");
  const cats = ["All", ...new Set(all.map((p) => p.category))];
  const sizes = ["All", ...new Set(all.map((p) => p.capacity))];
  const list = useMemo(
    () => all.filter((p) => (cat === "All" || p.category === cat) && (size === "All" || p.capacity === size) && `${p.name} ${p.capacity}`.toLowerCase().includes(q.trim().toLowerCase())),
    [all, cat, size, q],
  );
  return (
    <>
      <PageHero eyebrow="Our Products" title="The CASPIRA product range" text="Illustrative packaging formats. Contact our team to discuss your specific requirements." image={IMAGES.bottles} />
      <section className="container-x py-16">
        <div className="card grid gap-4 p-5 md:grid-cols-[1.5fr_1fr_1fr]">
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <Icon name="search" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
            <input className="field pl-9" placeholder="Search by product name…" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <label><span className="sr-only">Category</span>
            <select className="field" value={cat} onChange={(e) => setCat(e.target.value)}>{cats.map((c) => <option key={c} value={c}>{c === "All" ? "All categories" : c}</option>)}</select>
          </label>
          <label><span className="sr-only">Packaging size</span>
            <select className="field" value={size} onChange={(e) => setSize(e.target.value)}>{sizes.map((c) => <option key={c} value={c}>{c === "All" ? "All sizes" : c}</option>)}</select>
          </label>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${cat === c ? "bg-ocean text-primary-foreground" : "bg-ice text-ocean hover:bg-border"}`}>{c}</button>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate">{list.length} product{list.length === 1 ? "" : "s"} found</p>
        {list.length ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        ) : (
          <div className="mt-6"><EmptyState icon="search" title="No products match your search" text="Try a different name, category or size.">
            <button className="btn btn-outline btn-sm mt-5" onClick={() => { setQ(""); setCat("All"); setSize("All"); }}>Clear filters</button>
          </EmptyState></div>
        )}
      </section>
    </>
  );
}
