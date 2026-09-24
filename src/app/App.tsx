import { useState, useEffect, useRef } from "react";
import {
  Menu, X, Phone, Mail, MapPin, ArrowRight, Heart, Star,
  ChevronDown, Instagram, Facebook, Quote, Flower2, Users,
  Calendar, MessageCircle, CheckCircle, Clock
} from "lucide-react";

type Page = "home" | "weddings" | "funerals" | "about" | "gallery" | "testimonials" | "contact";

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

// ─── Navigation ────────────────────────────────────────────────────────────────

function Navbar({ page, nav }: { page: Page; nav: (p: Page) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: { label: string; page: Page }[] = [
    { label: "Weddings", page: "weddings" },
    { label: "Funerals", page: "funerals" },
    { label: "About", page: "about" },
    { label: "Gallery", page: "gallery" },
    { label: "Testimonials", page: "testimonials" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open ? "bg-[#FAF7F2]/97 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={() => nav("home")} className="text-left group">
            <span
              className="block text-xl leading-none tracking-wide"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: scrolled || open ? "#3D3028" : "#FAF7F2" }}
            >
              Jacqueline Ruddy
            </span>
            <span
              className="block text-[10px] tracking-[0.25em] uppercase mt-0.5"
              style={{ color: scrolled || open ? "#C4963C" : "rgba(250,247,242,0.8)" }}
            >
              Independent Celebrant
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.page}
                onClick={() => nav(l.page)}
                className={`text-sm tracking-wide transition-colors duration-200 hover:text-accent ${
                  page === l.page ? "text-accent" : scrolled ? "text-foreground" : "text-[#FAF7F2]/90"
                }`}
                style={{ letterSpacing: "0.05em" }}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => nav("contact")}
              className="px-5 py-2.5 text-sm tracking-wide border transition-all duration-200"
              style={{
                borderColor: scrolled ? "#C4963C" : "rgba(250,247,242,0.6)",
                color: scrolled ? "#C4963C" : "#FAF7F2",
                letterSpacing: "0.06em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#C4963C";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#C4963C";
                (e.currentTarget as HTMLButtonElement).style.color = "#FAF7F2";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLButtonElement).style.borderColor = scrolled ? "#C4963C" : "rgba(250,247,242,0.6)";
                (e.currentTarget as HTMLButtonElement).style.color = scrolled ? "#C4963C" : "#FAF7F2";
              }}
            >
              Check Availability
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            style={{ color: scrolled || open ? "#3D3028" : "#FAF7F2" }}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border px-6 pb-6 pt-4 bg-[#FAF7F2]">
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => { nav(l.page); setOpen(false); }}
              className="block w-full text-left py-3 text-foreground text-sm tracking-wide border-b border-border/50 last:border-0"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { nav("contact"); setOpen(false); }}
            className="mt-4 w-full py-3 text-sm tracking-wide text-center bg-accent text-accent-foreground"
          >
            Check Availability
          </button>
        </div>
      )}
    </header>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer({ nav }: { nav: (p: Page) => void }) {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-lg mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Jacqueline Ruddy
          </h3>
          <p className="text-xs tracking-[0.2em] text-accent mb-4 uppercase">Independent Celebrant</p>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            Creating personal, heartfelt ceremonies across Aberdeenshire and Scotland for over a decade.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-accent mb-5">Services</p>
          {(["Weddings", "Vow Renewals", "Naming Ceremonies", "Funerals"] as const).map((s) => (
            <button
              key={s}
              onClick={() => nav(s === "Funerals" ? "funerals" : "weddings")}
              className="block text-sm text-primary-foreground/70 hover:text-primary-foreground mb-2.5 transition-colors text-left"
            >
              {s}
            </button>
          ))}
        </div>

        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-accent mb-5">Contact</p>
          <div className="space-y-3 text-sm text-primary-foreground/70">
            <div className="flex gap-3 items-start">
              <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
              <span>Aberdeenshire, Scotland<br />Available throughout Scotland</span>
            </div>
            <div className="flex gap-3 items-center">
              <Phone size={15} className="shrink-0 text-accent" />
              <span>+44 (0) 7XXX XXX XXX</span>
            </div>
            <div className="flex gap-3 items-center">
              <Mail size={15} className="shrink-0 text-accent" />
              <span>hello@jacquelineruddy.co.uk</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row justify-between gap-3 text-xs text-primary-foreground/40">
        <span>© 2024 Jacqueline Ruddy. All rights reserved.</span>
        <div className="flex gap-5">
          <a href="#" className="hover:text-primary-foreground/70 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary-foreground/70 transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

// ─── Shared ────────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs tracking-[0.25em] uppercase text-accent mb-3 font-medium">
      {children}
    </p>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="h-px bg-accent/40 w-8" />
      <Flower2 size={10} className="text-accent" />
      <div className="h-px bg-accent/40 w-8" />
    </div>
  );
}

function PrimaryBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground text-sm tracking-wide transition-all duration-200 hover:bg-accent group"
      style={{ letterSpacing: "0.07em" }}
    >
      {children}
      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
    </button>
  );
}

function OutlineBtn({ children, onClick, light = false }: { children: React.ReactNode; onClick?: () => void; light?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-7 py-3.5 text-sm tracking-wide border transition-all duration-200 group ${
        light
          ? "border-white/60 text-white hover:bg-white hover:text-primary"
          : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
      }`}
      style={{ letterSpacing: "0.07em" }}
    >
      {children}
      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
    </button>
  );
}

// ─── Home Page ─────────────────────────────────────────────────────────────────

function HomePage({ nav }: { nav: (p: Page) => void }) {
  return (
    <>
      <HeroSection nav={nav} />
      <WeddingIntroSection nav={nav} />
      <WhyJacquelineSection />
      <CredibilityBanner />
      <GalleryGridSection nav={nav} />
      <ServicesSection nav={nav} />
      <AboutPreviewSection nav={nav} />
      <TestimonialsSection />
      <ProcessSection />
      <ContactCTASection nav={nav} />
    </>
  );
}

function HeroSection({ nav }: { nav: (p: Page) => void }) {
  return (
    <section className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-primary/20">
        <img
          src={img("1519741497674-611481863552", 1800, 1200)}
          alt="Outdoor wedding ceremony in Scotland with couple at the altar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/30 to-primary/70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <p className="text-xs tracking-[0.3em] uppercase mb-6 text-white/70">
          Independent Celebrant · Aberdeenshire, Scotland
        </p>
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-normal leading-tight mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Personal, heartfelt ceremonies
          <em className="block italic text-white/90">across Scotland</em>
        </h1>
        <Divider />
        <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mt-6 mb-10 leading-relaxed font-light">
          From intimate elopements on windswept hillsides to grand celebrations in historic venues,
          Jacqueline crafts ceremonies that are unmistakably, beautifully yours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryBtn onClick={() => nav("weddings")}>Wedding Ceremonies</PrimaryBtn>
          <OutlineBtn onClick={() => nav("contact")} light>Check Availability</OutlineBtn>
        </div>
      </div>

      <a
        href="#intro"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce"
      >
        <ChevronDown size={24} />
      </a>
    </section>
  );
}

function WeddingIntroSection({ nav }: { nav: (p: Page) => void }) {
  const types = [
    "Traditional ceremonies",
    "Symbolic ceremonies",
    "Elopements",
    "Outdoor weddings",
    "Vow renewals",
    "Personal vows",
  ];

  return (
    <section id="intro" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden bg-card">
            <img
              src={img("1537633552985-df8429e8048b", 900, 1100)}
              alt="Couple sharing a tender moment on their wedding day"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div
            className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 hidden lg:block"
            style={{ maxWidth: "180px" }}
          >
            <p className="text-3xl font-light" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>10+</p>
            <p className="text-xs tracking-wide mt-1 leading-snug">years creating ceremonies across Scotland</p>
          </div>
        </div>

        <div className="lg:pl-8">
          <SectionLabel>Wedding Ceremonies</SectionLabel>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            A ceremony as unique
            <em className="block italic text-muted-foreground"> as your love story</em>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            No scripts. No one-size-fits-all vows. Jacqueline works closely with every couple to
            understand who you are, how you met, and what matters most — then weaves it into a
            ceremony that truly reflects you.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Whether you dream of exchanging vows barefoot on a beach, beneath ancient oak trees,
            or in a grand Scottish estate, Jacqueline will be there — calm, warm, and fully
            present — to guide you through every word.
          </p>

          <div className="grid grid-cols-2 gap-2 mb-10">
            {types.map((t) => (
              <div key={t} className="flex items-center gap-2 text-sm text-foreground/80">
                <div className="w-1 h-1 rounded-full bg-accent" />
                {t}
              </div>
            ))}
          </div>

          <PrimaryBtn onClick={() => nav("weddings")}>Explore Wedding Services</PrimaryBtn>
        </div>
      </div>
    </section>
  );
}

function WhyJacquelineSection() {
  const qualities = [
    {
      icon: Heart,
      title: "Warm & Approachable",
      desc: "Jacqueline puts couples at ease from the first conversation. Her warmth is felt by every guest in the room.",
    },
    {
      icon: Star,
      title: "Skilled Storyteller",
      desc: "Every ceremony she crafts has a narrative arc — drawing guests in, building emotion, and ending with joy.",
    },
    {
      icon: CheckCircle,
      title: "Calm Under Pressure",
      desc: "Years of experience mean nothing fazes her. Whatever the day brings, Jacqueline handles it with grace.",
    },
    {
      icon: Users,
      title: "Deeply Professional",
      desc: "From the first enquiry to the final words, you receive a meticulous, considered service throughout.",
    },
  ];

  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <SectionLabel>Why Choose Jacqueline</SectionLabel>
          <h2
            className="text-3xl md:text-4xl font-normal"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The difference a great celebrant makes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {qualities.map((q) => (
            <div key={q.title} className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 border border-accent/30 text-accent mb-5 transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <q.icon size={22} />
              </div>
              <h3
                className="text-lg font-normal mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {q.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{q.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CredibilityBanner() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={img("1506905925346-21bda4d32df4", 1800, 700)}
          alt="Misty Scottish highland landscape with rolling hills"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/75" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <SectionLabel>Experience &amp; Trust</SectionLabel>
        <h2
          className="text-3xl md:text-5xl font-normal leading-tight mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          A time-served celebrant trusted
          <em className="italic block mt-1">by thousands of families</em>
        </h2>
        <p className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto">
          Having guided families through several thousand ceremonies — from the most joyful
          celebrations to the most tender farewells — Jacqueline brings a depth of experience
          and emotional intelligence that can only be earned through years of genuine service.
        </p>
        <div className="flex flex-col sm:flex-row gap-12 justify-center mt-14">
          {[["Thousands", "of ceremonies conducted"], ["10+", "years of experience"], ["All Scotland", "travel available"]].map(
            ([num, label]) => (
              <div key={num} className="text-center">
                <p
                  className="text-4xl font-light text-white mb-1"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {num}
                </p>
                <p className="text-xs tracking-widest uppercase text-white/60">{label}</p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

function GalleryGridSection({ nav }: { nav: (p: Page) => void }) {
  const photos = [
    { id: "1519741497674-611481863552", label: "Wedding ceremony" },
    { id: "1525328437458-0c4d4db7cab4", label: "Floral arrangements" },
    { id: "1558618666-fcd25c85cd64", label: "Scottish countryside" },
    { id: "1522673607200-164d1b6ce486", label: "Couple portrait" },
    { id: "1515372039744-b8f02a3ae446", label: "Wedding rings detail" },
    { id: "1464822759023-fed622ff2c3b", label: "Highland landscape" },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <SectionLabel>Gallery</SectionLabel>
            <h2
              className="text-3xl md:text-4xl font-normal"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Moments worth cherishing
            </h2>
          </div>
          <button
            onClick={() => nav("gallery")}
            className="hidden sm:flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4"
          >
            View full gallery <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {photos.map((p, i) => (
            <div
              key={p.id}
              className={`overflow-hidden bg-card cursor-pointer group ${i === 0 ? "row-span-2" : ""}`}
              onClick={() => nav("gallery")}
            >
              <img
                src={img(p.id, 700, i === 0 ? 900 : 450)}
                alt={p.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: i === 0 ? "100%" : "220px" }}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <button
            onClick={() => nav("gallery")}
            className="text-sm text-accent hover:underline underline-offset-4 flex items-center gap-2 mx-auto"
          >
            View full gallery <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ nav }: { nav: (p: Page) => void }) {
  const services = [
    {
      img: "1606216794074-735e91aa2c92",
      title: "Wedding Ceremonies",
      desc: "Bespoke ceremonies crafted around your love story. Fully legal or symbolic — entirely yours.",
      page: "weddings" as Page,
    },
    {
      img: "1490750967868-88df5691cc6e",
      title: "Vow Renewals",
      desc: "Celebrate your journey together with a heartfelt renewal of the promises that matter most.",
      page: "weddings" as Page,
    },
    {
      img: "1476703993599-0035a21b18ac",
      title: "Naming Ceremonies",
      desc: "Welcome a new life with a meaningful celebration surrounded by the people who love them.",
      page: "weddings" as Page,
    },
    {
      img: "1419242902214-272b3f66ee7a",
      title: "Funeral Ceremonies",
      desc: "A dignified, personal tribute that honours a life lived and gives comfort to those left behind.",
      page: "funerals" as Page,
    },
  ];

  return (
    <section className="py-24 bg-muted/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <SectionLabel>Services</SectionLabel>
          <h2
            className="text-3xl md:text-4xl font-normal"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            How Jacqueline can help
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-card group cursor-pointer"
              onClick={() => nav(s.page)}
            >
              <div className="overflow-hidden aspect-[4/3]">
                <img
                  src={img(s.img, 600, 450)}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3
                  className="text-lg font-normal mb-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <span className="text-xs tracking-wide text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPreviewSection({ nav }: { nav: (p: Page) => void }) {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="lg:pr-8">
          <SectionLabel>About Jacqueline</SectionLabel>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Rooted in Aberdeenshire,
            <em className="block italic text-muted-foreground">loved across Scotland</em>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Jacqueline Ruddy has been creating meaningful ceremonies in Aberdeenshire and beyond
            for over a decade. Born and raised in the north-east of Scotland, she has an
            instinctive understanding of the landscapes, communities, and traditions that make
            this region so special.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Her approach is always personal, never formulaic. She listens first, then crafts.
            The result is a ceremony that feels like it could only have been written for you —
            because it was.
          </p>
          <PrimaryBtn onClick={() => nav("about")}>Meet Jacqueline</PrimaryBtn>
        </div>

        <div className="relative">
          <div className="aspect-[3/4] overflow-hidden bg-card max-w-md mx-auto">
            <img
              src={img("1567532939604-b6b5b0db2604", 700, 900)}
              alt="Jacqueline Ruddy, Independent Celebrant — portrait"
              className="w-full h-full object-cover"
            />
          </div>
          <blockquote
            className="absolute -bottom-4 left-4 right-4 lg:left-auto lg:-left-8 bg-[#FAF7F2] p-5 border-l-2 border-accent shadow-md max-w-xs"
          >
            <p
              className="text-sm leading-relaxed text-foreground/80 italic"
              style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1rem" }}
            >
              "Every ceremony I create is a privilege. It is an honour to stand with people
              in their most important moments."
            </p>
            <footer className="text-xs tracking-wide text-accent mt-2 uppercase">— Jacqueline</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Jacqueline was absolutely everything we could have hoped for and more. She made our ceremony feel so natural, so personal — our guests couldn't stop saying how beautiful it was.",
      author: "Sarah & James",
      event: "Wedding · Balmoral Estate",
    },
    {
      quote:
        "From the first phone call I knew she was right for us. She listened to every detail and created something truly magical. I cried reading our ceremony for the first time.",
      author: "Fiona & Mark",
      event: "Wedding · Dunnottar Castle",
    },
    {
      quote:
        "Jacqueline guided us through the most difficult day of our lives with such warmth and dignity. She made us feel held. We will be forever grateful.",
      author: "The Henderson Family",
      event: "Funeral Ceremony · Aberdeen",
    },
  ];

  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <SectionLabel>Testimonials</SectionLabel>
          <h2
            className="text-3xl md:text-4xl font-normal"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Words from those who know best
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.author} className="bg-background p-8 relative">
              <Quote size={28} className="text-accent/30 mb-4" />
              <p
                className="leading-relaxed text-foreground/80 mb-6 italic"
                style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.05rem" }}
              >
                {t.quote}
              </p>
              <div className="border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground">{t.author}</p>
                <p className="text-xs text-muted-foreground tracking-wide mt-0.5">{t.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { icon: MessageCircle, num: "01", title: "Enquire", desc: "Reach out via the contact form or phone. No pressure, no obligation — just a friendly conversation." },
    { icon: Users, num: "02", title: "Let's Chat", desc: "A relaxed video or phone call where Jacqueline gets to know you, your story, and your vision." },
    { icon: Flower2, num: "03", title: "Create Together", desc: "Jacqueline writes your bespoke ceremony, sharing drafts until every word feels exactly right." },
    { icon: Heart, num: "04", title: "Celebrate", desc: "On the day, Jacqueline is calm, focused, and fully present — so you can simply enjoy every moment." },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <SectionLabel>The Process</SectionLabel>
          <h2
            className="text-3xl md:text-4xl font-normal"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Simple, personal, stress-free
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-accent/20 hidden lg:block" />
          {steps.map((s) => (
            <div key={s.title} className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-muted border border-border mb-5 relative z-10">
                <s.icon size={22} className="text-accent" />
              </div>
              <p className="text-xs tracking-[0.2em] text-accent/60 mb-2">{s.num}</p>
              <h3
                className="text-lg font-normal mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTASection({ nav }: { nav: (p: Page) => void }) {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={img("1530103862676-de8c9debad1d", 1800, 600)}
          alt="Beautiful Scottish wedding venue with romantic lighting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80" />
      </div>
      <div className="relative z-10 text-center text-white max-w-2xl mx-auto px-6">
        <SectionLabel>Get in Touch</SectionLabel>
        <h2
          className="text-3xl md:text-4xl font-normal mb-5"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Ready to start planning your ceremony?
        </h2>
        <p className="text-white/75 mb-8 leading-relaxed">
          Dates book up quickly, especially for summer weekends. Reach out today and let's
          make sure Jacqueline is available for your special day.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryBtn onClick={() => nav("contact")}>Check Availability</PrimaryBtn>
          <div className="flex items-center gap-2 text-white/70 text-sm justify-center">
            <Phone size={14} />
            <span>+44 (0) 7XXX XXX XXX</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Weddings Page ─────────────────────────────────────────────────────────────

function WeddingsPage({ nav }: { nav: (p: Page) => void }) {
  const ceremonies = [
    {
      title: "Fully Legal Ceremonies",
      desc: "Jacqueline is fully licensed to conduct legally binding wedding ceremonies in Scotland. Everything is taken care of — all legal documents and registration paperwork.",
    },
    {
      title: "Symbolic Ceremonies",
      desc: "Already legally married or planning a separate legal moment? A symbolic ceremony lets you focus entirely on the ritual, without any administrative formality.",
    },
    {
      title: "Outdoor & Countryside Weddings",
      desc: "Scotland's landscapes deserve to be part of your ceremony. Jacqueline is experienced with outdoor settings across Aberdeenshire's coast, hills, and glens.",
    },
    {
      title: "Elopements",
      desc: "Intimate, romantic, and deeply personal. Jacqueline is passionate about elopements — just the two of you (and her), somewhere breathtaking.",
    },
    {
      title: "Vow Renewals",
      desc: "A beautiful way to celebrate a milestone anniversary or simply reaffirm your love. Jacqueline creates renewals that are as meaningful as the original day.",
    },
    {
      title: "Handfasting & Traditions",
      desc: "Celtic handfasting, unity ceremonies, ring warming — Jacqueline weaves traditions from any culture or background into a seamless, personal ceremony.",
    },
  ];

  return (
    <>
      <PageHero
        image="1606216794074-735e91aa2c92"
        label="Wedding Ceremonies"
        title="Your wedding, written just for you"
        subtitle="Jacqueline creates ceremonies that tell your story — honest, warm, and completely unique."
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionLabel>The Approach</SectionLabel>
            <h2
              className="text-3xl md:text-4xl font-normal mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              No scripts. No fuss.
              <em className="italic block">Just the real you.</em>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Jacqueline begins every wedding with a proper get-to-know-you session — a relaxed
              conversation about your relationship, your values, your humour, and your hopes for
              the ceremony. From there, she crafts every word specifically for you.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-5">
              You will receive drafts to review and refine. Your vows can be private or shared —
              completely your choice. The ceremony can be funny, tender, solemn, or all three.
              Jacqueline follows your lead.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              On the day itself, she arrives early, liaises with your venue and other suppliers,
              and takes care of everything so you can be fully present in the moment.
            </p>
            <PrimaryBtn onClick={() => nav("contact")}>Enquire About Your Wedding</PrimaryBtn>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-[3/4] overflow-hidden bg-card">
              <img src={img("1519741497674-611481863552", 500, 650)} alt="Outdoor wedding ceremony" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="aspect-[3/4] overflow-hidden bg-card mt-8">
              <img src={img("1522673607200-164d1b6ce486", 500, 650)} alt="Wedding couple portrait" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <SectionLabel>Ceremony Types</SectionLabel>
            <h2
              className="text-3xl md:text-4xl font-normal"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Every type of wedding ceremony
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ceremonies.map((c) => (
              <div key={c.title} className="bg-background p-7 border-t-2 border-accent">
                <h3
                  className="text-lg font-normal mb-3"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {c.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={img("1537633552985-df8429e8048b", 1800, 600)} alt="Wedding ceremony outdoors" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/75" />
        </div>
        <div className="relative z-10 text-center text-white max-w-xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-normal mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Let's start with a conversation
          </h2>
          <p className="text-white/75 mb-8">Check Jacqueline's availability for your date and begin the journey.</p>
          <PrimaryBtn onClick={() => nav("contact")}>Get in Touch</PrimaryBtn>
        </div>
      </section>
    </>
  );
}

// ─── Funerals Page ─────────────────────────────────────────────────────────────

function FuneralsPage({ nav }: { nav: (p: Page) => void }) {
  return (
    <>
      <PageHero
        image="1419242902214-272b3f66ee7a"
        label="Funeral Ceremonies"
        title="A tribute as unique as the life it honours"
        subtitle="Compassionate, unhurried, deeply personal — Jacqueline is experienced in guiding families through some of their most difficult days."
        dark
      />

      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionLabel>Funeral Ceremonies</SectionLabel>
            <h2
              className="text-3xl md:text-4xl font-normal mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Guided by your family,
              <em className="italic block text-muted-foreground">crafted with care</em>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              When someone we love dies, finding the right words can feel impossible. Jacqueline
              takes that weight from your shoulders. She listens with patience and empathy,
              gathering memories, stories, and details that paint a true picture of the person you're remembering.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Every funeral ceremony she conducts is different — because every life is different.
              Whether you want a traditional, a secular, or a deeply personal ceremony, she will
              create something that gives real comfort and genuine tribute.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Having conducted several thousand funeral ceremonies across Aberdeenshire and beyond,
              Jacqueline understands the delicate balance between formality and intimacy, between
              grief and celebration. Families regularly tell her that the ceremony was the one part
              of the day that truly felt right.
            </p>
            <PrimaryBtn onClick={() => nav("contact")}>Speak with Jacqueline</PrimaryBtn>
          </div>

          <div>
            {[
              { title: "Initial Contact", desc: "Jacqueline can often be reached at short notice. She works directly with families or alongside funeral directors, whichever you prefer." },
              { title: "A Personal Meeting", desc: "At a time that suits you, Jacqueline will meet (in person or by video) to hear about your loved one and your wishes for the ceremony." },
              { title: "A Ceremony Written for Them", desc: "She will write a ceremony that reflects who they truly were — their character, their passions, their relationships, their legacy." },
              { title: "Delivered with Dignity", desc: "On the day, Jacqueline is steady, compassionate, and professional. She carries the ceremony so your family can simply grieve and be together." },
            ].map((item) => (
              <div key={item.title} className="flex gap-5 mb-8 last:mb-0">
                <div className="w-px bg-accent/40 mt-1 flex-shrink-0 relative">
                  <div className="w-2 h-2 bg-accent rounded-full absolute -left-[3px] top-0" />
                </div>
                <div>
                  <h3
                    className="text-base font-normal mb-1.5"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5 border-y border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <blockquote>
            <p
              className="text-xl md:text-2xl text-foreground/80 italic leading-relaxed"
              style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.35rem" }}
            >
              "Jacqueline guided us through the most difficult day of our lives with such
              warmth and dignity. She made us feel held throughout. We will be forever grateful
              for the ceremony she created for our father."
            </p>
            <footer className="text-xs tracking-[0.2em] uppercase text-accent mt-6">
              — The Morrison Family, Aberdeen
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SectionLabel>When You Need to Talk</SectionLabel>
          <h2
            className="text-2xl md:text-3xl font-normal mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Jacqueline is here when you need her
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            There is no obligation, no pressure. If you simply want to talk through what you're
            facing and hear a calm, experienced voice, please don't hesitate to get in touch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryBtn onClick={() => nav("contact")}>Contact Jacqueline</PrimaryBtn>
            <div className="flex items-center gap-2 text-foreground/60 text-sm justify-center">
              <Phone size={14} />
              <span>+44 (0) 7XXX XXX XXX</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── About Page ────────────────────────────────────────────────────────────────

function AboutPage({ nav }: { nav: (p: Page) => void }) {
  return (
    <>
      <PageHero
        image="1506905925346-21bda4d32df4"
        label="About Jacqueline"
        title="Born in the north-east, rooted in community"
        subtitle="Aberdeenshire isn't just where Jacqueline works — it's where she belongs."
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden bg-card max-w-md">
              <img
                src={img("1567532939604-b6b5b0db2604", 700, 900)}
                alt="Jacqueline Ruddy — Independent Celebrant portrait"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-card p-7 mt-4 border-l-2 border-accent max-w-md">
              <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">Credentials</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle size={13} className="text-secondary" /> Licensed under Scottish Law</li>
                <li className="flex items-center gap-2"><CheckCircle size={13} className="text-secondary" /> Member of the Celebrant Network</li>
                <li className="flex items-center gap-2"><CheckCircle size={13} className="text-secondary" /> 10+ years professional experience</li>
                <li className="flex items-center gap-2"><CheckCircle size={13} className="text-secondary" /> Several thousand ceremonies conducted</li>
                <li className="flex items-center gap-2"><CheckCircle size={13} className="text-secondary" /> Full PVG / enhanced disclosure</li>
              </ul>
            </div>
          </div>

          <div>
            <SectionLabel>Jacqueline's Story</SectionLabel>
            <h2
              className="text-3xl md:text-4xl font-normal mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              A calling, not just a career
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Jacqueline Ruddy grew up in Aberdeenshire, surrounded by the rugged coastlines,
                rolling farmland, and tight-knit communities that define the north-east of Scotland.
                That upbringing instilled in her a deep respect for the rituals and gatherings
                that mark the significant moments in life.
              </p>
              <p>
                Her path to becoming a celebrant began over a decade ago, when she realised that
                the ceremonies that meant the most to people were rarely the ones that followed a
                prescribed script. The ones people remembered were the ones that told real stories,
                reflected real personalities, and made guests feel genuinely moved.
              </p>
              <p>
                Since then, Jacqueline has conducted several thousand ceremonies — weddings, funerals,
                naming days, and everything in between. Each one is approached with the same
                commitment: to listen deeply, write carefully, and deliver with absolute presence.
              </p>
              <p>
                Outside her work, Jacqueline is a lover of wild swimming, long coastal walks,
                and the kind of unhurried conversations that go on well past the point you intended.
                Those qualities — patience, curiosity, warmth — find their way into every ceremony she creates.
              </p>
            </div>
            <div className="mt-10">
              <PrimaryBtn onClick={() => nav("contact")}>Work With Jacqueline</PrimaryBtn>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
    </>
  );
}

// ─── Gallery Page ──────────────────────────────────────────────────────────────

function GalleryPage() {
  const [filter, setFilter] = useState<"all" | "weddings" | "landscapes" | "details">("all");

  const photos = [
    { id: "1583939003579-93e78d9d5b73", cat: "weddings", label: "Outdoor ceremony" },
    { id: "1519741497674-611481863552", cat: "weddings", label: "Venue ceremony" },
    { id: "1537633552985-df8429e8048b", cat: "weddings", label: "Couple at altar" },
    { id: "1522673607200-164d1b6ce486", cat: "weddings", label: "Couple portrait" },
    { id: "1606216794074-735e91aa2c92", cat: "weddings", label: "Wedding arch ceremony" },
    { id: "1530103862676-de8c9debad1d", cat: "weddings", label: "Romantic ceremony" },
    { id: "1506905925346-21bda4d32df4", cat: "landscapes", label: "Highland misty mountains" },
    { id: "1558618666-fcd25c85cd64", cat: "landscapes", label: "Scottish countryside" },
    { id: "1464822759023-fed622ff2c3b", cat: "landscapes", label: "Coastal cliffs" },
    { id: "1477959858617-67f85cf4f1df", cat: "landscapes", label: "Forest path" },
    { id: "1525328437458-0c4d4db7cab4", cat: "details", label: "Wedding flowers" },
    { id: "1515372039744-b8f02a3ae446", cat: "details", label: "Wedding rings" },
    { id: "1490750967868-88df5691cc6e", cat: "details", label: "Floral detail" },
    { id: "1476703993599-0035a21b18ac", cat: "details", label: "Ceremony flowers" },
  ];

  const filtered = filter === "all" ? photos : photos.filter((p) => p.cat === filter);

  return (
    <>
      <PageHero
        image="1522673607200-164d1b6ce486"
        label="Gallery"
        title="Moments, memories, and landscapes"
        subtitle="A glimpse into the ceremonies and settings that make Aberdeenshire such a magical place to celebrate."
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex gap-3 justify-center mb-12 flex-wrap">
            {(["all", "weddings", "landscapes", "details"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 text-xs tracking-[0.15em] uppercase transition-all border ${
                  filter === f
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-transparent text-foreground border-border hover:border-accent hover:text-accent"
                }`}
              >
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((p) => (
              <div key={p.id} className="overflow-hidden bg-card break-inside-avoid group">
                <img
                  src={img(p.id, 700, 500)}
                  alt={p.label}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Testimonials Page ─────────────────────────────────────────────────────────

function TestimonialsPage() {
  const all = [
    {
      quote: "Jacqueline was absolutely everything we could have hoped for and more. She made our ceremony feel so natural, so personal — our guests couldn't stop saying how beautiful it was.",
      author: "Sarah & James",
      event: "Wedding · Balmoral Estate · June 2023",
      stars: 5,
    },
    {
      quote: "From the first phone call I knew she was right for us. She listened to every detail and created something truly magical. I cried reading our ceremony for the first time.",
      author: "Fiona & Mark",
      event: "Wedding · Dunnottar Castle · September 2023",
      stars: 5,
    },
    {
      quote: "Jacqueline guided us through the most difficult day of our lives with such warmth and dignity. She made us feel held. We will be forever grateful.",
      author: "The Henderson Family",
      event: "Funeral Ceremony · Aberdeen · 2022",
      stars: 5,
    },
    {
      quote: "We had an outdoor elopement with just our two witnesses. Jacqueline made it feel like the most important ceremony in the world — because to us, it was.",
      author: "Anna & Thomas",
      event: "Elopement · Cairngorms · May 2023",
      stars: 5,
    },
    {
      quote: "We renewed our vows on our 25th anniversary. Jacqueline wrote something so beautifully personal, so full of our actual story, that several of our guests said it moved them more than our original wedding.",
      author: "Margaret & Donald",
      event: "Vow Renewal · Braemar · August 2023",
      stars: 5,
    },
    {
      quote: "Our guests keep telling us ours was the best wedding ceremony they've ever attended. We know exactly why — it was Jacqueline. She is simply exceptional.",
      author: "Rachel & Connor",
      event: "Wedding · Crathes Castle · July 2023",
      stars: 5,
    },
  ];

  return (
    <>
      <PageHero
        image="1530103862676-de8c9debad1d"
        label="Testimonials"
        title="What families and couples say"
        subtitle="The greatest measure of Jacqueline's work is the words of those who've experienced it."
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {all.map((t) => (
              <div key={t.author} className="bg-card p-8 flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={13} className="text-accent fill-accent" />
                  ))}
                </div>
                <Quote size={22} className="text-accent/25 mb-3" />
                <p
                  className="flex-1 text-foreground/80 italic leading-relaxed mb-6"
                  style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.05rem" }}
                >
                  {t.quote}
                </p>
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-medium">{t.author}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 tracking-wide">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Contact Page ──────────────────────────────────────────────────────────────

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", date: "", type: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full border border-border bg-input-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors";

  return (
    <>
      <PageHero
        image="1477959858617-67f85cf4f1df"
        label="Contact"
        title="Let's start with hello"
        subtitle="Whether you're ready to book or simply want to ask a question — Jacqueline would love to hear from you."
      />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: form */}
          <div>
            <SectionLabel>Enquiry Form</SectionLabel>
            <h2
              className="text-2xl md:text-3xl font-normal mb-8"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Tell Jacqueline a little about your ceremony
            </h2>

            {submitted ? (
              <div className="bg-card border border-secondary/30 p-10 text-center">
                <CheckCircle size={36} className="text-secondary mx-auto mb-4" />
                <h3
                  className="text-xl font-normal mb-3"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Thank you, {form.name.split(" ")[0] || "there"}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Jacqueline will be in touch within 24–48 hours. She looks forward to hearing
                  more about your plans.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-wide uppercase text-muted-foreground mb-2">Full Name *</label>
                    <input
                      required
                      className={inputClass}
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wide uppercase text-muted-foreground mb-2">Email Address *</label>
                    <input
                      required
                      type="email"
                      className={inputClass}
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-wide uppercase text-muted-foreground mb-2">Phone Number</label>
                    <input
                      className={inputClass}
                      placeholder="+44 7XXX XXX XXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wide uppercase text-muted-foreground mb-2">Ceremony Date</label>
                    <input
                      type="date"
                      className={inputClass}
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-wide uppercase text-muted-foreground mb-2">Ceremony Type *</label>
                  <select
                    required
                    className={`${inputClass} cursor-pointer`}
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="">Please select</option>
                    <option value="wedding">Wedding Ceremony</option>
                    <option value="vow-renewal">Vow Renewal</option>
                    <option value="naming">Naming Ceremony</option>
                    <option value="elopement">Elopement</option>
                    <option value="funeral">Funeral Ceremony</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs tracking-wide uppercase text-muted-foreground mb-2">Your Message *</label>
                  <textarea
                    required
                    rows={5}
                    className={inputClass}
                    placeholder="Tell Jacqueline a little about your ceremony plans, your venue, and anything else that might be helpful..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase hover:bg-accent transition-colors duration-200 group"
                >
                  Send Enquiry
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>

          {/* Right: contact details */}
          <div className="lg:pl-8">
            <SectionLabel>Get in Touch</SectionLabel>
            <h2
              className="text-2xl md:text-3xl font-normal mb-8"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Reach Jacqueline directly
            </h2>

            <div className="space-y-6 mb-12">
              {[
                { icon: Phone, label: "Phone", val: "+44 (0) 7XXX XXX XXX", sub: "Monday–Friday, 9am–6pm" },
                { icon: Mail, label: "Email", val: "hello@jacquelineruddy.co.uk", sub: "Replies within 24–48 hours" },
                { icon: MapPin, label: "Location", val: "Aberdeenshire, Scotland", sub: "Available throughout Scotland" },
                { icon: Clock, label: "Availability", val: "Booking into 2025 & 2026", sub: "Summer weekends book quickly" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-5">
                  <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0 text-accent">
                    <item.icon size={17} />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-0.5">{item.label}</p>
                    <p className="text-sm text-foreground font-medium">{item.val}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card p-7 border-l-2 border-accent">
              <p className="text-xs tracking-[0.2em] uppercase text-accent mb-3">A Note From Jacqueline</p>
              <p
                className="text-foreground/80 italic leading-relaxed"
                style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "1.05rem" }}
              >
                "I love hearing from couples and families at every stage of their planning.
                Even if your date is still a year or two away — please do get in touch. I
                would love to learn about your plans and be part of your special day."
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Page Hero (shared) ────────────────────────────────────────────────────────

function PageHero({
  image, label, title, subtitle, dark = false,
}: {
  image: string;
  label: string;
  title: string;
  subtitle: string;
  dark?: boolean;
}) {
  return (
    <section className="relative h-[60vh] min-h-[480px] flex items-end pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-primary/20">
        <img
          src={img(image, 1800, 900)}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${dark ? "from-primary/90 via-primary/50" : "from-primary/80 via-primary/35"} to-transparent`}
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-white">
        <p className="text-xs tracking-[0.25em] uppercase text-white/60 mb-3">{label}</p>
        <h1
          className="text-3xl md:text-5xl font-normal leading-tight mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {title}
        </h1>
        <p className="text-white/75 max-w-xl leading-relaxed">{subtitle}</p>
      </div>
    </section>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const nav = (p: Page) => {
    setPage(p);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 10);
  };

  return (
    <div
      className="min-h-screen bg-background"
      style={{ fontFamily: "'Lato', system-ui, sans-serif" }}
    >
      <Navbar page={page} nav={nav} />
      <main>
        {page === "home" && <HomePage nav={nav} />}
        {page === "weddings" && <WeddingsPage nav={nav} />}
        {page === "funerals" && <FuneralsPage nav={nav} />}
        {page === "about" && <AboutPage nav={nav} />}
        {page === "gallery" && <GalleryPage />}
        {page === "testimonials" && <TestimonialsPage />}
        {page === "contact" && <ContactPage />}
      </main>
      <Footer nav={nav} />
    </div>
  );
}
