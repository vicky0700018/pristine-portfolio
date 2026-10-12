// Initial demo content. All entries are illustrative and editable from the admin panel.
import hero from "../assets/hero.jpg";
import bottles from "../assets/bottles.jpg";
import factory from "../assets/factory.jpg";
import splash from "../assets/splash.jpg";
import jar from "../assets/jar.jpg";
import packaging from "../assets/packaging.jpg";
import glass from "../assets/glass.jpg";

export const IMAGES = { hero, bottles, factory, splash, jar, packaging, glass };

export const DATA_VERSION = 1;

export const initialData = {
  version: DATA_VERSION,
  settings: {
    companyName: "CASPIRA MINERAL WATER PRIVATE LIMITED",
    logoText: "CASPIRA",
    logoSubtext: "MINERAL WATER PRIVATE LIMITED",
    accentColor: "#18B6D2",
    heroEyebrow: "Mineral Water Manufacturing",
    heroHeading: "Pure Hydration. Naturally Inspired.",
    heroDescription:
      "Discover the refreshing world of CASPIRA MINERAL WATER PRIVATE LIMITED, committed to presenting a clean, refreshing and professional mineral water brand experience.",
    heroImage: hero,
    primaryCta: "Explore Our Products",
    secondaryCta: "Contact Our Team",
    phone: "2451324553",
    email: "caspiramineramineralwater@gmail.com",
    address:
      "Mikat No. 198, Kannad, Chhatrapati Sambhajinagar, Aurala, Kannad, Aurangabad, Maharashtra, India – 431103",
    contactAction: "tel",
    footerDescription:
      "CASPIRA MINERAL WATER PRIVATE LIMITED is a mineral water manufacturing business based in Kannad, Chhatrapati Sambhajinagar, Maharashtra.",
    copyright: "© CASPIRA MINERAL WATER PRIVATE LIMITED. All rights reserved.",
    introHeading: "A mineral water brand built around clarity",
    introBody:
      "CASPIRA MINERAL WATER PRIVATE LIMITED is engaged in the manufacture of mineral water. Operating from Kannad in Chhatrapati Sambhajinagar, Maharashtra, the company focuses on presenting a clean, refreshing and dependable product experience for its customers.",
    introImage: glass,
    mfgHeading: "A manufacturing business focused on care",
    mfgBody:
      "Our identity is shaped by the work of manufacturing mineral water — from processing and filling to packaging and dispatch preparation. Imagery shown is illustrative.",
    mfgImage: factory,
    ctaHeading: "Let's Talk About Your Water Requirements.",
    ctaBody:
      "Connect with CASPIRA MINERAL WATER PRIVATE LIMITED to discuss your product enquiries and business requirements.",
    ctaImage: splash,
  },
  socials: [
    { id: "s1", label: "Facebook", url: "", visible: false },
    { id: "s2", label: "Instagram", url: "", visible: false },
    { id: "s3", label: "LinkedIn", url: "", visible: false },
  ],
  seo: {
    siteTitle: "CASPIRA Mineral Water",
    metaDescription:
      "CASPIRA MINERAL WATER PRIVATE LIMITED — mineral water manufacturing in Kannad, Chhatrapati Sambhajinagar, Maharashtra.",
    homeTitle: "CASPIRA Mineral Water — Pure Hydration. Naturally Inspired.",
    ogTitle: "CASPIRA Mineral Water",
    ogDescription: "Mineral water manufacturing from Kannad, Maharashtra.",
    favicon: "/favicon.svg",
  },
  nav: [
    { id: "home", label: "Home", path: "/", visible: true },
    { id: "about", label: "About Us", path: "/about", visible: true },
    { id: "products", label: "Our Products", path: "/products", visible: true },
    { id: "manufacturing", label: "Manufacturing", path: "/manufacturing", visible: true },
    { id: "quality", label: "Quality & Purity", path: "/quality", visible: true },
    { id: "gallery", label: "Gallery", path: "/gallery", visible: true },
    { id: "contact", label: "Contact Us", path: "/contact", visible: true },
  ],
  homeSections: [
    { id: "intro", label: "Brand Introduction", visible: true },
    { id: "products", label: "Product Showcase", visible: true },
    { id: "why", label: "Why Choose CASPIRA", visible: true },
    { id: "manufacturing", label: "Manufacturing Overview", visible: true },
    { id: "quality", label: "Quality & Purity", visible: true },
    { id: "stats", label: "Corporate Statistics", visible: true },
    { id: "gallery", label: "Gallery Preview", visible: true },
    { id: "cta", label: "Business Enquiry CTA", visible: true },
    { id: "updates", label: "Latest Updates", visible: true },
  ],
  products: [
    { id: "p250", name: "Mineral Water Bottle", capacity: "250 ml", category: "Bottles", packaging: "Single-serve bottle", description: "A compact bottle suited to meetings, events and on-the-go refreshment.", image: bottles, gallery: [splash], active: true, published: true },
    { id: "p500", name: "Mineral Water Bottle", capacity: "500 ml", category: "Bottles", packaging: "Single-serve bottle", description: "An everyday bottle size for personal hydration through the day.", image: hero, gallery: [bottles], active: true, published: true },
    { id: "p1l", name: "Mineral Water Bottle", capacity: "1 L", category: "Bottles", packaging: "Family bottle", description: "A versatile size for home, office desks and travel.", image: bottles, gallery: [glass], active: true, published: true },
    { id: "p2l", name: "Mineral Water Bottle", capacity: "2 L", category: "Bottles", packaging: "Family bottle", description: "A larger bottle for households and group use.", image: packaging, gallery: [bottles], active: true, published: true },
    { id: "p20l", name: "Bulk Water Jar", capacity: "20 L", category: "Bulk Jars", packaging: "Dispenser jar", description: "A bulk jar format intended for offices, institutions and dispensers.", image: jar, gallery: [packaging], active: true, published: true },
  ],
  features: [
    { id: "f1", title: "A Refreshing Product Experience", description: "Clean, crisp presentation designed around everyday refreshment.", icon: "drop", visible: true },
    { id: "f2", title: "A Focus on Quality", description: "A quality-conscious mindset guides how we present our products.", icon: "shield", visible: true },
    { id: "f3", title: "Customer-Focused Service", description: "We listen to business requirements and respond with care.", icon: "users", visible: true },
    { id: "f4", title: "A Professional Manufacturing Identity", description: "A modern, organised approach to mineral water manufacturing.", icon: "factory", visible: true },
  ],
  stats: [
    { id: "st1", label: "Product Categories", value: "", visible: true },
    { id: "st2", label: "Packaging Options", value: "", visible: true },
    { id: "st3", label: "Business Locations", value: "", visible: true },
    { id: "st4", label: "Customer Reach", value: "", visible: true },
  ],
  about: {
    heroHeading: "About CASPIRA",
    heroText: "A mineral water manufacturing business from Kannad, Chhatrapati Sambhajinagar.",
    heroImage: glass,
    sections: [
      { id: "a1", heading: "Company Overview", body: "CASPIRA MINERAL WATER PRIVATE LIMITED is a private limited company engaged in the manufacture of mineral water, located at Mikat No. 198, Kannad, Chhatrapati Sambhajinagar, Maharashtra.", image: glass, visible: true },
      { id: "a2", heading: "Our Business Activity", body: "Our core activity is the manufacture of mineral water. We aim to serve customers and businesses looking for a clean and professional mineral water brand.", image: factory, visible: true },
      { id: "a3", heading: "Brand Positioning", body: "CASPIRA is positioned as a fresh, trustworthy and modern mineral water brand — clear in presentation and focused on the customer.", image: bottles, visible: true },
    ],
    vision: "To become a recognised and trusted mineral water brand in our region. (Demo text — edit in admin.)",
    mission: "To deliver a refreshing product experience supported by responsive, customer-focused service. (Demo text — edit in admin.)",
    values: [
      { id: "v1", title: "Integrity", description: "Honest communication with every customer.", visible: true },
      { id: "v2", title: "Care", description: "Attention to detail in how products are handled.", visible: true },
      { id: "v3", title: "Responsiveness", description: "Prompt replies to enquiries and requirements.", visible: true },
      { id: "v4", title: "Consistency", description: "A dependable brand experience over time.", visible: true },
    ],
  },
  manufacturing: {
    heading: "Manufacturing at CASPIRA",
    intro: "CASPIRA MINERAL WATER PRIVATE LIMITED is a mineral water manufacturing business. The process outline below is illustrative and will be updated once confirmed by the business.",
    image: factory,
    packagingText: "Products are presented in bottle and jar formats. Packaging details shown on this website are illustrative.",
    packagingImage: packaging,
    steps: [
      { id: "m1", title: "Water Processing", description: "Illustrative description of water processing. Editable by admin.", image: splash, verified: false, visible: true },
      { id: "m2", title: "Quality Checks", description: "Technical details will be published only after verification.", image: glass, verified: false, visible: true },
      { id: "m3", title: "Bottle Filling", description: "Illustrative overview of bottle filling.", image: factory, verified: false, visible: true },
      { id: "m4", title: "Packaging", description: "Illustrative overview of the packaging process.", image: packaging, verified: false, visible: true },
      { id: "m5", title: "Dispatch Preparation", description: "Editable description of dispatch preparation.", image: bottles, verified: false, visible: true },
    ],
  },
  quality: {
    heading: "Quality & Purity",
    statement: "Quality is a mindset we bring to how our products are presented, packed and handled. Technical quality claims will be published only once supporting information is provided.",
    image: splash,
    sections: [
      { id: "q1", heading: "Quality Commitment", body: "A quality-conscious approach guides our day-to-day manufacturing activity.", icon: "shield", visible: true },
      { id: "q2", heading: "Product Presentation", body: "Clean, clear packaging that reflects the freshness of the product.", icon: "drop", visible: true },
      { id: "q3", heading: "Packaging and Handling", body: "Care in packaging and handling until products are ready for dispatch.", icon: "box", visible: true },
      { id: "q4", heading: "Customer Assurance", body: "Open communication — customers can raise quality enquiries with our team.", icon: "users", visible: true },
    ],
    certifications: [
      { id: "c1", name: "Example certification (placeholder)", authority: "To be provided", validity: "", notes: "Placeholder only. Do not publish until verified documents are supplied.", image: "", verified: false, published: false },
    ],
  },
  gallery: [
    { id: "g1", title: "Fresh bottles", category: "Products", description: "Illustrative product photography.", image: hero, visible: true },
    { id: "g2", title: "Bottle range", category: "Products", description: "Illustrative bottle sizes.", image: bottles, visible: true },
    { id: "g3", title: "Water splash", category: "Water", description: "Pure, clear water.", image: splash, visible: true },
    { id: "g4", title: "Bottling line", category: "Manufacturing", description: "Illustrative manufacturing imagery — not the CASPIRA facility.", image: factory, visible: true },
    { id: "g5", title: "Packed for dispatch", category: "Packaging", description: "Illustrative packaging imagery.", image: packaging, visible: true },
    { id: "g6", title: "Bulk jar", category: "Products", description: "Illustrative 20 L jar.", image: jar, visible: true },
    { id: "g7", title: "Refreshment", category: "Water", description: "A glass of fresh water.", image: glass, visible: true },
  ],
  announcements: [
    { id: "n1", title: "Demo update: Welcome to the new CASPIRA website", description: "This is demonstration content. Replace it with a real announcement from the admin panel.", image: "", date: "2026-10-01", status: "published" },
    { id: "n2", title: "Demo update: Product range information", description: "Demonstration entry showing how product news can appear here.", image: bottles, date: "2026-09-20", status: "published" },
    { id: "n3", title: "Draft: Upcoming announcement", description: "Draft entries are not visible on the public website.", image: "", date: "2026-10-10", status: "draft" },
  ],
  enquiries: [],
  activity: [],
};

export const ENQUIRY_TYPES = ["General Enquiry", "Product Enquiry", "Bulk / Business Order", "Distribution Partnership", "Quality Enquiry"];
export const ENQUIRY_STATUSES = ["New", "In Progress", "Resolved"];
export const ICON_OPTIONS = ["drop", "shield", "users", "factory", "star", "box", "truck", "award", "globe", "layers"];
