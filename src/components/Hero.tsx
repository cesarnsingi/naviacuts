"use client";

import { useEffect, useState } from "react";
import StoreBadge from "@/components/StoreBadge";
import { useLang } from "@/context/LangContext";

const copy = {
  pt: {
    ticker:  ["LUANDA, ANGOLA", "MARCA O TEU CORTE", "NA VIA CUTS", "BARBEARIA PREMIUM", "APP iOS & ANDROID"],
    sub:     "A barbearia premium de Luanda. Marca o teu corte em segundos, escolhe o teu barbeiro e aparece na hora certa.",
  },
  en: {
    ticker:  ["LUANDA, ANGOLA", "BOOK YOUR CUT", "NA VIA CUTS", "PREMIUM BARBERSHOP", "APP iOS & ANDROID"],
    sub:     "Luanda's premium barbershop. Book your cut in seconds, choose your barber and show up on time.",
  },
};

const phone = {
  pt: {
    welcome:    "Bem-vindo de volta,",
    apptLabel:  "📅 PRÓXIMA MARCAÇÃO",
    service:    "Degradê + Barba",
    confirmed:  "Confirmado",
    svcsLabel:  "Serviços",
    svcs:       [["✂️","Corte","2.500 Kz"],["💈","Degradê","3.000 Kz"],["🪒","Barba","2.000 Kz"]],
  },
  en: {
    welcome:    "Welcome back,",
    apptLabel:  "📅 NEXT APPOINTMENT",
    service:    "Fade + Beard",
    confirmed:  "Confirmed",
    svcsLabel:  "Services",
    svcs:       [["✂️","Haircut","2,500 Kz"],["💈","Fade","3,000 Kz"],["🪒","Beard","2,000 Kz"]],
  },
};

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { lang } = useLang();
  const c = copy[lang];
  const p = phone[lang];

  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/[0.04] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gold/[0.03] blur-3xl" />
      </div>
      <div className="absolute inset-y-0 left-1/4 w-px bg-gradient-to-b from-transparent via-ink-4 to-transparent opacity-40" />
      <div className="absolute inset-y-0 right-1/4 w-px bg-gradient-to-b from-transparent via-ink-4 to-transparent opacity-40" />

      {/* Ticker */}
      <div className="absolute top-20 inset-x-0 overflow-hidden py-2 border-y border-ink-4/60">
        <div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {Array(6).fill(c.ticker).flat().map((t, i) => (
            <span key={i} className="text-xs font-semibold tracking-widest3 text-stone/60 flex items-center gap-6">
              {t}<span className="text-gold/40">✦</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>

      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className={`inline-flex items-center gap-2 border border-gold/30 bg-gold-bg rounded-full px-4 py-1.5 mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse2" />
              <span className="text-gold text-xs font-semibold tracking-widest">LUANDA, ANGOLA</span>
            </div>

            <h1 className="font-display leading-none mb-6">
              <span className={`block text-[clamp(4rem,10vw,8rem)] text-cream tracking-widest transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                NA VIA
              </span>
              <span className={`block text-[clamp(4rem,10vw,8rem)] text-shimmer tracking-widest transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                CUTS
              </span>
            </h1>

            <p className={`text-stone text-lg leading-relaxed max-w-md mb-10 font-light transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              {c.sub}
            </p>

            <div className={`flex flex-wrap gap-4 mb-12 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <StoreBadge store="ios"     size="lg" href="#download" />
              <StoreBadge store="android" size="lg" href="#download" />
            </div>


          </div>

          <div className={`hidden lg:flex justify-center transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <PhoneMockup p={p} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-ink to-transparent pointer-events-none" />
    </section>
  );
}

function PhoneMockup({ p }: { p: typeof phone.pt }) {
  return (
    <div className="relative animate-float">
      <div className="absolute inset-0 bg-gold/10 blur-3xl rounded-full scale-75" />
      <div className="relative w-64 h-[520px] rounded-[44px] border-2 border-ink-4 bg-ink-1 overflow-hidden shadow-2xl glow-gold">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-ink rounded-full z-10" />
        <div className="absolute inset-0 flex flex-col">
          <div className="h-10 bg-ink flex items-center justify-between px-6 pt-2">
            <span className="text-[9px] text-stone">9:41</span>
            <span className="text-[9px] text-stone">●●●</span>
          </div>
          <div className="px-4 py-3 border-b border-ink-4 flex items-center justify-between">
            <span className="font-display text-base tracking-widest text-cream">NA VIA<span className="text-gold"> CUTS</span></span>
            <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-xs text-gold">🔔</span>
            </div>
          </div>
          <div className="px-4 pt-4">
            <p className="text-[10px] text-stone">{p.welcome}</p>
            <p className="font-display text-2xl text-cream tracking-wide">Carlos <span className="text-gold">✦</span></p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[9px]">📍</span>
              <span className="text-[9px] text-stone">Luanda, Angola</span>
            </div>
          </div>
          <div className="mx-4 mt-3 rounded-2xl p-3 border border-gold bg-gold-bg">
            <p className="text-[9px] text-gold tracking-widest font-semibold">{p.apptLabel}</p>
            <div className="flex justify-between items-end mt-2">
              <div>
                <p className="text-xs font-semibold text-cream">Mário Lopes</p>
                <p className="text-[9px] text-stone">{p.service}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-lg text-gold leading-none">ABR 2</p>
                <p className="text-[9px] text-stone">14:00</p>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-[9px] text-green-400">{p.confirmed}</span>
            </div>
          </div>
          <div className="px-4 mt-3">
            <p className="text-[9px] text-stone tracking-widest uppercase font-semibold mb-2">{p.svcsLabel}</p>
            <div className="flex gap-2">
              {p.svcs.map(([e,n,pr]) => (
                <div key={n} className="flex-1 bg-ink-3 border border-ink-4 rounded-xl p-2">
                  <span className="text-base">{e}</span>
                  <p className="text-[9px] font-semibold text-cream mt-1">{n}</p>
                  <p className="text-[8px] text-gold">{pr}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="scan-overlay pointer-events-none" />
      </div>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-4 bg-gold/10 blur-xl rounded-full" />
    </div>
  );
}
