"use client";

import StoreBadge      from "@/components/StoreBadge";
import { useLang }     from "@/context/LangContext";
import { useWaitlist } from "@/context/WaitlistContext";

const content = {
  pt: {
    badge:      "EM BREVE",
    title1:     "PRONTO PARA",
    title2:     "O PRÓXIMO CORTE?",
    sub:        "Entra na lista de espera e sê um dos primeiros a marcar quando a app lançar.",
    waitlistBtn:"ENTRAR NA LISTA DE ESPERA",
    storeSub:   "Brevemente disponível em:",
    stats: [
      { num: "800+", label: "Clientes na lista" },
      { num: "4.9★", label: "Avaliação prevista" },
      { num: "100%", label: "Gratuito"           },
    ],
  },
  en: {
    badge:      "COMING SOON",
    title1:     "READY FOR",
    title2:     "YOUR NEXT CUT?",
    sub:        "Join the waitlist and be among the first to book when the app launches.",
    waitlistBtn:"JOIN THE WAITLIST",
    storeSub:   "Coming soon to:",
    stats: [
      { num: "800+", label: "Customers waiting" },
      { num: "4.9★", label: "Expected rating"   },
      { num: "100%", label: "Free"               },
    ],
  },
};

export default function Download() {
  const { lang }      = useLang();
  const { openModal } = useWaitlist();
  const c = content[lang];

  return (
    <section id="download" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.06] blur-3xl" />
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-gold/40 to-transparent" />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-gold/40 to-transparent" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-gold/30 bg-gold-bg rounded-full px-4 py-1.5 mb-10 reveal">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse2" />
          <span className="text-gold text-xs font-semibold tracking-widest">{c.badge}</span>
        </div>

        {/* Headline */}
        <h2 className="font-display text-[clamp(3rem,8vw,7rem)] tracking-widest leading-none mb-6 reveal delay-1">
          <span className="text-cream block">{c.title1}</span>
          <span className="text-shimmer block">{c.title2}</span>
        </h2>

        <p className="text-stone text-lg font-light leading-relaxed mb-10 reveal delay-2">
          {c.sub}
        </p>

        {/* Primary CTA — waitlist */}
        <div className="flex justify-center mb-10 reveal delay-3">
          <button
            onClick={openModal}
            className="relative flex items-center justify-center gap-3 bg-gold hover:bg-gold-light text-ink px-10 py-5 rounded-2xl font-display text-xl tracking-widest transition-all duration-200 active:scale-[0.98] overflow-hidden group w-full sm:w-auto"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative z-10">{c.waitlistBtn}</span>
            <span className="relative z-10 text-ink/60">✦</span>
          </button>
        </div>

        {/* Store badges */}
        <div className="mb-12 reveal delay-3">
          <p className="text-stone/50 text-xs tracking-widest uppercase mb-5 font-medium">{c.storeSub}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <StoreBadge store="ios"     size="lg" href="#download" />
            <StoreBadge store="android" size="lg" href="#download" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 reveal delay-4">
          {c.stats.map(({ num, label }) => (
            <div key={label} className="glass rounded-xl py-4 px-2">
              <p className="font-display text-3xl text-gold tracking-widest leading-none">{num}</p>
              <p className="text-stone text-xs mt-1 tracking-wide">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
