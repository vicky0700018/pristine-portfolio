import { useEffect, useState } from "react";
import { useSearch } from "@tanstack/react-router";
import { useSite } from "../store/SiteStore";
import Icon from "../components/Icon";
import { PageHero, publishedProducts } from "../components/Common";
import { ENQUIRY_TYPES, IMAGES } from "../data/initialData";
import { telHref } from "../utils/navigation";

const empty = { type: ENQUIRY_TYPES[0], productId: "", name: "", business: "", email: "", phone: "", message: "" };

export function validateEnquiry(f) {
  const e = {};
  if (!f.name.trim()) e.name = "Please enter your name.";
  if (!f.email.trim()) e.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (f.phone && !/^[+\d][\d\s-]{6,}$/.test(f.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (!f.type) e.type = "Please choose an enquiry type.";
  if (f.message.trim().length < 10) e.message = "Please write a message of at least 10 characters.";
  return e;
}

export default function Contact() {
  const { data, addEnquiry } = useSite();
  const s = data.settings;
  const products = publishedProducts(data.products);
  const search = useSearch({ strict: false });
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setForm((f) => ({
      ...f,
      productId: search.product || f.productId,
      type: search.product ? "Product Enquiry" : ENQUIRY_TYPES.includes(search.type) ? search.type : f.type,
    }));
  }, [search.product, search.type]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const errs = validateEnquiry(form);
    setErrors(errs);
    if (Object.keys(errs).length) { setStatus("error"); return; }
    const product = products.find((p) => p.id === form.productId);
    addEnquiry({ ...form, productName: product ? `${product.name} — ${product.capacity}` : "" });
    setForm(empty);
    setStatus("success");
  };
  const err = (k) => errors[k] && <p id={`${k}-err`} className="mt-1 text-xs font-medium text-danger">{errors[k]}</p>;
  const aria = (k) => ({ id: k, "aria-invalid": Boolean(errors[k]), "aria-describedby": errors[k] ? `${k}-err` : undefined });

  const cards = [
    { icon: "pin", title: "Address", body: s.address },
    { icon: "phone", title: "Phone", body: s.phone, href: telHref(s.phone) },
    { icon: "mail", title: "Email", body: s.email, href: `mailto:${s.email}` },
  ];
  return (
    <>
      <PageHero eyebrow="Contact Us" title="Let's talk about your water requirements" text={`Reach ${s.companyName} for product and business enquiries.`} image={IMAGES.glass} />
      <section id="contact-details" className="container-x grid gap-6 py-16 md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="card p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ice text-royal"><Icon name={c.icon} /></span>
            <h2 className="mt-4 text-sm font-bold uppercase tracking-widest">{c.title}</h2>
            {c.href ? <a href={c.href} className="mt-2 block break-all font-semibold text-navy hover:text-royal">{c.body}</a> : <p className="mt-2 text-sm leading-relaxed text-navy">{c.body}</p>}
          </div>
        ))}
      </section>
      <section className="bg-ice py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="text-3xl font-bold">Send an enquiry</h2>
            <p className="mt-3 text-slate">Tell us about your requirements and choose the product you're interested in.</p>
            <div className="mt-6 rounded-2xl border border-aqua/40 bg-background p-5 text-sm text-slate">
              <p className="flex items-center gap-2 font-bold text-ocean"><Icon name="info" className="h-4 w-4 text-aqua" />Privacy notice — demo</p>
              <p className="mt-2">This website is a demonstration. Enquiries are saved only in this browser's local storage so they can be viewed in the admin panel. They are <strong>not</strong> sent to the company by email. For a real enquiry, please call or email directly.</p>
            </div>
          </div>
          <form onSubmit={submit} noValidate className="card grid gap-5 p-6 md:grid-cols-2 md:p-8">
            <div><label className="label" htmlFor="type">Enquiry type *</label>
              <select className="field" {...aria("type")} value={form.type} onChange={set("type")}>{ENQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}</select>{err("type")}</div>
            <div><label className="label" htmlFor="productId">Product</label>
              <select className="field" id="productId" value={form.productId} onChange={set("productId")}>
                <option value="">No specific product</option>
                {products.map((p) => <option key={p.id} value={p.id}>{p.name} — {p.capacity}</option>)}
              </select></div>
            <div><label className="label" htmlFor="name">Name *</label><input className="field" {...aria("name")} value={form.name} onChange={set("name")} autoComplete="name" />{err("name")}</div>
            <div><label className="label" htmlFor="business">Business name</label><input className="field" id="business" value={form.business} onChange={set("business")} autoComplete="organization" /></div>
            <div><label className="label" htmlFor="email">Email *</label><input type="email" className="field" {...aria("email")} value={form.email} onChange={set("email")} autoComplete="email" />{err("email")}</div>
            <div><label className="label" htmlFor="phone">Phone</label><input type="tel" className="field" {...aria("phone")} value={form.phone} onChange={set("phone")} autoComplete="tel" />{err("phone")}</div>
            <div className="md:col-span-2"><label className="label" htmlFor="message">Message *</label><textarea rows={5} className="field" {...aria("message")} value={form.message} onChange={set("message")} />{err("message")}</div>
            <div className="md:col-span-2">
              {status === "success" && <p role="status" className="mb-4 flex items-center gap-2 rounded-xl bg-success/10 p-3 text-sm font-semibold text-success"><Icon name="check" className="h-4 w-4" />Thank you — your enquiry has been saved in this browser's demo storage.</p>}
              {status === "error" && <p role="alert" className="mb-4 rounded-xl bg-danger/10 p-3 text-sm font-semibold text-danger">Please correct the highlighted fields.</p>}
              <button type="submit" className="btn btn-primary">Submit Enquiry <Icon name="arrow" className="h-4 w-4" /></button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
