"use client";

import { useLang }     from "@/context/LangContext";
import { useWaitlist } from "@/context/WaitlistContext";

const content = {
  pt: {
    tagline: "Barbearia Digital · Luanda, Angola 🇦🇴",
    links: [
      { label: "Início",        href: "#"             },
      { label: "Barbeiros",     href: "#barbers"      },
      { label: "Como Funciona", href: "#how-it-works" },
      { label: "Marcações",     href: "#booking"      },
      { label: "FAQ",           href: "#faq"          },
      { label: "Sobre Nós",     href: "#about"        },
    ],
    cta:        "Entrar na Lista de Espera",
    copyright:  "Todos os direitos reservados.",
    madeIn:     "Feito com ❤️ em Luanda",
    legal: [
      { label: "Privacidade", href: "#" },
      { label: "Termos",      href: "#" },
      { label: "Contacto",    href: "#" },
    ],
  },
  en: {
    tagline: "Digital Barbershop · Luanda, Angola 🇦🇴",
    links: [
      { label: "Home",         href: "#"             },
      { label: "Barbers",      href: "#barbers"      },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Bookings",     href: "#booking"      },
      { label: "FAQ",          href: "#faq"          },
      { label: "About",        href: "#about"        },
    ],
    cta:        "Join the Waitlist",
    copyright:  "All rights reserved.",
    madeIn:     "Made with ❤️ in Luanda",
    legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms",   href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
};

export default function Footer() {
  const { lang }      = useLang();
  const { openModal } = useWaitlist();
  const c    = content[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ink-4">
      <div className="max-w-6xl mx-auto px-6 py-14">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-10">

          {/* Logo + tagline */}
          <div className="shrink-0">
            <p className="font-display text-2xl tracking-widest">
              NA VIA <span className="text-gold">CUTS</span>
            </p>
            <p className="text-stone text-sm mt-1">{c.tagline}</p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {c.links.map((link) => (
              <a
                key={`${lang}-${link.href}`}
                href={link.href}
                className="text-stone hover:text-cream text-sm transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Waitlist CTA */}
          <button
            onClick={openModal}
            className="relative flex items-center gap-2 bg-gold hover:bg-gold-light text-ink px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 shrink-0 overflow-hidden group"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative z-10">📱</span>
            <span className="relative z-10">{c.cta}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-ink-4 to-transparent mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-stone text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p>© {year} Na Via Cuts. {c.copyright}</p>
            <span className="hidden sm:block text-ink-4">·</span>
            <p>{c.madeIn}</p>
          </div>
          <div className="flex gap-5">
            {c.legal.map((l) => (
              <a
                key={`${lang}-${l.label}`}
                href={l.href}
                className="hover:text-cream transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
