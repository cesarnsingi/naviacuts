"use client";

import { useState, useEffect, useRef } from "react";
import { useLang }     from "@/context/LangContext";
import { useWaitlist } from "@/context/WaitlistContext";

const copy = {
  pt: {
    nav: [
      { label: "Barbeiros",     href: "#barbers"      },
      { label: "Como Funciona", href: "#how-it-works"  },
      { label: "FAQ",           href: "#faq"           },
      { label: "Sobre Nós",     href: "#about"         },
    ],
    waitlist:      "Entrar na Lista de Espera",
    waitlistShort: "Lista de Espera",
    menuClose:     "Fechar",
    langLabel:     "Idioma",
    langPt:        "🇦🇴 Português",
    langEn:        "🇬🇧 English",
    freeTag:       "Gratuito · Luanda, Angola",
  },
  en: {
    nav: [
      { label: "Barbers",      href: "#barbers"      },
      { label: "How It Works", href: "#how-it-works"  },
      { label: "FAQ",          href: "#faq"           },
      { label: "About",        href: "#about"         },
    ],
    waitlist:      "Join the Waitlist",
    waitlistShort: "Join Waitlist",
    menuClose:     "Close",
    langLabel:     "Language",
    langPt:        "🇦🇴 Português",
    langEn:        "🇬🇧 English",
    freeTag:       "Free · Luanda, Angola",
  },
};

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const { lang, setLang } = useLang();
  const { openModal }     = useWaitlist();
  const drawerRef = useRef<HTMLDivElement>(null);
  const c = copy[lang];

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Close on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [menuOpen]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── Header bar ──────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-ink/95 backdrop-blur-md border-b border-ink-4"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="#" onClick={closeMenu} className="flex items-center gap-1 group shrink-0">
            <span className="font-display text-2xl tracking-widest text-cream group-hover:text-gold transition-colors">
              NA VIA
            </span>
            <span className="font-display text-2xl tracking-widest text-gold">CUTS</span>
          </a>

          {/* Desktop centre links — hidden below lg */}
          <ul key={lang} className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {c.nav.map((item) => (
              <li key={`${lang}-${item.href}`}>
                <a
                  href={item.href}
                  className="text-stone hover:text-cream transition-colors text-sm tracking-wide"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop right — hidden below lg */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <LangToggle lang={lang} setLang={setLang} />
            <button
              onClick={openModal}
              className="relative flex items-center gap-2 bg-gold hover:bg-gold-light text-ink px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 overflow-hidden group"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative z-10">{c.waitlistShort}</span>
              <span className="relative z-10 text-xs opacity-70 group-hover:opacity-100 transition-opacity">→</span>
            </button>
          </div>

          {/* Mobile right — hidden at lg and above */}
          <div className="flex lg:hidden items-center gap-3">
            <LangToggle lang={lang} setLang={setLang} />
            <BurgerButton open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
          </div>

        </nav>
      </header>

      {/* ── Overlay — always in DOM, opacity transition ──────────────── */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        style={{
          position:        "fixed",
          inset:           0,
          zIndex:          40,
          background:      "rgba(10,10,10,0.7)",
          backdropFilter:  "blur(4px)",
          pointerEvents:   menuOpen ? "auto" : "none",
          opacity:         menuOpen ? 1 : 0,
          transition:      "opacity 300ms ease",
        }}
      />

      {/* ── Drawer panel — always in DOM, transform transition ───────── */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position:   "fixed",
          top:        0,
          right:      0,
          bottom:     0,
          zIndex:     50,
          width:      "min(340px, 90vw)",
          display:    "flex",
          flexDirection: "column",
          background: "#111111",
          borderLeft: "1px solid #2a2a2a",
          transform:  menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 380ms cubic-bezier(0.32, 0.72, 0, 1)",
          visibility:  menuOpen ? "visible" : "hidden",
        }}
      >
        {/* Drawer header */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            padding:        "0 24px",
            height:         64,
            borderBottom:   "1px solid #2a2a2a",
            flexShrink:     0,
          }}
        >
          <span className="font-display text-xl tracking-widest text-gold">MENU</span>
          <button
            onClick={closeMenu}
            aria-label={c.menuClose}
            className="w-9 h-9 rounded-full border border-ink-4 flex items-center justify-center text-stone hover:text-cream hover:border-gold/50 transition-all"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable nav area */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "28px 24px" }}>
          <ul key={lang} className="flex flex-col gap-1">
            {c.nav.map((item) => (
              <li key={`${lang}-${item.href}`}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-center justify-between px-4 py-4 rounded-xl text-stone hover:text-cream hover:bg-ink-3 transition-all duration-200 group"
                >
                  <span className="text-base font-medium tracking-wide">{item.label}</span>
                  <span className="text-gold/40 group-hover:text-gold transition-colors text-lg">→</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="my-6 h-px bg-ink-4" />

          {/* Language switcher */}
          <div className="px-4 mb-4">
            <p className="text-stone text-xs tracking-widest uppercase mb-3 font-medium">
              {c.langLabel}
            </p>
            <div className="flex gap-2">
              {(["pt", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold tracking-wider border transition-all duration-200 ${
                    lang === l
                      ? "bg-gold text-ink border-gold"
                      : "bg-transparent text-stone border-ink-4 hover:border-gold/40 hover:text-cream"
                  }`}
                >
                  {l === "pt" ? c.langPt : c.langEn}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Waitlist CTA pinned at bottom */}
        <div
          style={{
            padding:      "24px",
            borderTop:    "1px solid #2a2a2a",
            flexShrink:   0,
          }}
        >
          <button
            onClick={() => { closeMenu(); openModal(); }}
            className="relative flex items-center justify-center gap-3 w-full bg-gold hover:bg-gold-light text-ink py-4 rounded-2xl font-display text-xl tracking-widest transition-all duration-200 active:scale-[0.98] overflow-hidden group"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative z-10">{c.waitlist.toUpperCase()}</span>
            <span className="relative z-10 text-ink/60">✦</span>
          </button>
          <p className="text-stone text-xs text-center mt-3 tracking-wide">{c.freeTag}</p>
        </div>
      </div>
    </>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function LangToggle({
  lang,
  setLang,
}: {
  lang: "pt" | "en";
  setLang: (l: "pt" | "en") => void;
}) {
  return (
    <div className="flex border border-ink-4 rounded-full overflow-hidden">
      {(["pt", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1.5 text-xs font-semibold tracking-wider transition-all ${
            lang === l ? "bg-gold text-ink" : "text-stone hover:text-cream"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function BurgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="w-9 h-9 rounded-full border border-ink-4 flex flex-col items-center justify-center gap-1.5 hover:border-gold/50 transition-all"
    >
      <span
        className={`block w-4 h-px bg-cream transition-all duration-300 origin-center ${
          open ? "rotate-45 translate-y-[2.5px]" : ""
        }`}
      />
      <span
        className={`block h-px bg-cream transition-all duration-300 ${
          open ? "w-0 opacity-0" : "w-4"
        }`}
      />
      <span
        className={`block w-4 h-px bg-cream transition-all duration-300 origin-center ${
          open ? "-rotate-45 -translate-y-[2.5px]" : ""
        }`}
      />
    </button>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
