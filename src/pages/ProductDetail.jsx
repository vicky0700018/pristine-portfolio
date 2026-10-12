import { useEffect, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { useSite } from "../store/SiteStore";
import SiteImage from "../components/SiteImage";
import Icon from "../components/Icon";
import { EmptyState, ProductCard, publishedProducts } from "../components/Common";

export default function ProductDetail() {
  const { id } = useParams({ strict: false });
  const { data, ready } = useSite();
  const all = publishedProducts(data.products);
  const p = all.find((x) => x.id === id);
  const images = p ? [p.image, ...(p.gallery || [])].filter(Boolean) : [];
  const [active, setActive] = useState(0);
  useEffect(() => setActive(0), [id]);

  if (!p) {
    return (
      <section className="container-x py-24">
        <EmptyState icon="box" title={ready ? "Product not found" : "Loading…"} text="This product may have been removed or is not currently published.">
          <Link to="/products" className="btn btn-primary btn-sm mt-5">Back to products</Link>
        </EmptyState>
      </section>
    );
  }
  return (
    <>
      <section className="container-x py-12 md:py-16">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-royal hover:text-ocean"><Icon name="arrowLeft" className="h-4 w-4" />All products</Link>
        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-[2rem] bg-ice"><SiteImage src={images[active]} alt={`${p.name} ${p.capacity}`} eager className="aspect-square w-full" /></div>
            {images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {images.map((src, i) => (
                  <button key={i} onClick={() => setActive(i)} className={`overflow-hidden rounded-xl border-2 ${i === active ? "border-aqua" : "border-transparent"}`} aria-label={`Show image ${i + 1}`}>
                    <SiteImage src={src} alt="" className="h-20 w-20" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="lg:pt-6">
            <span className="rounded-full bg-ice px-3 py-1 text-xs font-semibold text-royal">{p.category}</span>
            <h1 className="mt-5 text-4xl font-extrabold md:text-5xl">{p.name}</h1>
            <p className="mt-2 font-display text-2xl font-bold text-aqua">{p.capacity}</p>
            <p className="mt-6 text-lg leading-relaxed text-slate">{p.description}</p>
            <dl className="mt-8 grid grid-cols-2 gap-4 border-y py-6 text-sm">
              <div><dt className="text-slate">Capacity</dt><dd className="mt-1 font-semibold text-navy">{p.capacity}</dd></div>
              <div><dt className="text-slate">Packaging</dt><dd className="mt-1 font-semibold text-navy">{p.packaging}</dd></div>
            </dl>
            <p className="mt-4 text-xs text-slate">Product details shown are illustrative and will be confirmed by the business.</p>
            <Link to="/contact" search={{ product: p.id }} className="btn btn-primary mt-8">Enquire About Product <Icon name="arrow" className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
      {all.length > 1 && (
        <section className="bg-ice py-16">
          <div className="container-x">
            <h2 className="text-2xl font-bold">Other products</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{all.filter((x) => x.id !== p.id).slice(0, 4).map((x) => <ProductCard key={x.id} product={x} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
