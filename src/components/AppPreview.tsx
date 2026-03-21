"use client";

import { useLang } from "@/context/LangContext";

const copy = {
  pt: {
    eyebrow: "A APP",
    title:   "FEITA PARA",
    accent:  "LUANDA",
    screens: [
      {
        title: "Início",
        desc:  "Vê a tua próxima marcação e o estado em tempo real.",
        apptLabel: "📅 PRÓXIMA MARCAÇÃO",
        apptDetail: "Degradê · ABR 2 · 14:00",
        svcs: ["✂️ Corte","💈 Fade","🪒 Barba"],
        dateLabel: "Escolher Data",
        timesLabel: "Horários",
        days: ["Qui\n27","Sex\n28","Sáb\n29","Dom\n30"],
        filters: ["Todos","Degradês","Barbas"],
        styles: [{e:"✂️",n:"Degradê Alto",l:"842"},{e:"🔥",n:"Burst Fade",l:"501"},{e:"🪒",n:"Barba",l:"334"},{e:"💎",n:"Wave Design",l:"298"}],
      },
      {
        title: "Marcar",
        desc:  "Escolhe barbeiro, data e hora. Confirmação imediata.",
        apptLabel: "📅 PRÓXIMA MARCAÇÃO",
        apptDetail: "Degradê · ABR 2 · 14:00",
        svcs: ["✂️ Corte","💈 Fade","🪒 Barba"],
        dateLabel: "Escolher Data",
        timesLabel: "Horários",
        days: ["Qui\n27","Sex\n28","Sáb\n29","Dom\n30"],
        filters: ["Todos","Degradês","Barbas"],
        styles: [{e:"✂️",n:"Degradê Alto",l:"842"},{e:"🔥",n:"Burst Fade",l:"501"},{e:"🪒",n:"Barba",l:"334"},{e:"💎",n:"Wave Design",l:"298"}],
      },
      {
        title: "Explorar",
        desc:  "Navega estilos e guarda os teus favoritos.",
        apptLabel: "📅 PRÓXIMA MARCAÇÃO",
        apptDetail: "Degradê · ABR 2 · 14:00",
        svcs: ["✂️ Corte","💈 Fade","🪒 Barba"],
        dateLabel: "Escolher Data",
        timesLabel: "Horários",
        days: ["Qui\n27","Sex\n28","Sáb\n29","Dom\n30"],
        filters: ["Todos","Degradês","Barbas"],
        styles: [{e:"✂️",n:"Degradê Alto",l:"842"},{e:"🔥",n:"Burst Fade",l:"501"},{e:"🪒",n:"Barba",l:"334"},{e:"💎",n:"Wave Design",l:"298"}],
      },
    ],
  },
  en: {
    eyebrow: "THE APP",
    title:   "BUILT FOR",
    accent:  "LUANDA",
    screens: [
      {
        title: "Home",
        desc:  "See your next booking and live status at a glance.",
        apptLabel: "📅 NEXT APPOINTMENT",
        apptDetail: "Fade · APR 2 · 14:00",
        svcs: ["✂️ Haircut","💈 Fade","🪒 Beard"],
        dateLabel: "Pick a Date",
        timesLabel: "Times",
        days: ["Thu\n27","Fri\n28","Sat\n29","Sun\n30"],
        filters: ["All","Fades","Beards"],
        styles: [{e:"✂️",n:"High Fade",l:"842"},{e:"🔥",n:"Burst Fade",l:"501"},{e:"🪒",n:"Beard",l:"334"},{e:"💎",n:"Wave Design",l:"298"}],
      },
      {
        title: "Book",
        desc:  "Pick barber, date and time. Instant confirmation.",
        apptLabel: "📅 NEXT APPOINTMENT",
        apptDetail: "Fade · APR 2 · 14:00",
        svcs: ["✂️ Haircut","💈 Fade","🪒 Beard"],
        dateLabel: "Pick a Date",
        timesLabel: "Times",
        days: ["Thu\n27","Fri\n28","Sat\n29","Sun\n30"],
        filters: ["All","Fades","Beards"],
        styles: [{e:"✂️",n:"High Fade",l:"842"},{e:"🔥",n:"Burst Fade",l:"501"},{e:"🪒",n:"Beard",l:"334"},{e:"💎",n:"Wave Design",l:"298"}],
      },
      {
        title: "Explore",
        desc:  "Browse styles and save your favourites.",
        apptLabel: "📅 NEXT APPOINTMENT",
        apptDetail: "Fade · APR 2 · 14:00",
        svcs: ["✂️ Haircut","💈 Fade","🪒 Beard"],
        dateLabel: "Pick a Date",
        timesLabel: "Times",
        days: ["Thu\n27","Fri\n28","Sat\n29","Sun\n30"],
        filters: ["All","Fades","Beards"],
        styles: [{e:"✂️",n:"High Fade",l:"842"},{e:"🔥",n:"Burst Fade",l:"501"},{e:"🪒",n:"Beard",l:"334"},{e:"💎",n:"Wave Design",l:"298"}],
      },
    ],
  },
};

export default function AppPreview() {
  const { lang } = useLang();
  const c = copy[lang];

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink-1/50 to-ink pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <p className="text-gold text-xs tracking-widest2 font-semibold mb-4">{c.eyebrow}</p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] tracking-widest text-cream leading-none">
            {c.title}<br /><span className="text-shimmer">{c.accent}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {c.screens.map((screen, i) => (
            <div key={i} className={`reveal delay-${i + 1} group relative`}>
              <div className="relative w-full max-w-[200px] mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-b from-gold/10 to-transparent blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 rounded-full" />
                <div className="relative bg-ink-1 border border-ink-4 rounded-[32px] overflow-hidden group-hover:border-gold/30 transition-colors duration-300">
                  <div className="h-7 bg-ink flex items-center justify-center">
                    <div className="w-16 h-3 bg-ink-3 rounded-full" />
                  </div>
                  <div className="px-3 py-2 border-b border-ink-4 flex items-center justify-between">
                    <span className="text-[9px] font-display tracking-widest text-cream">NA VIA <span className="text-gold">CUTS</span></span>
                    <span className="text-[9px] text-gold font-semibold">{screen.title}</span>
                  </div>

                  {/* Screen-specific content */}
                  <div className="min-h-[200px] p-3 space-y-2">
                    {i === 0 && (
                      <>
                        <div className="bg-ink-3 border border-gold/40 rounded-xl p-2.5">
                          <p className="text-[8px] text-gold tracking-widest">{screen.apptLabel}</p>
                          <p className="text-xs font-semibold text-cream mt-1">Mário Lopes</p>
                          <p className="text-[9px] text-stone">{screen.apptDetail}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5">
                          {screen.svcs.map(s => (
                            <div key={s} className="bg-ink-3 rounded-lg p-2 text-center">
                              <p className="text-[8px] text-cream">{s}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    {i === 1 && (
                      <>
                        <p className="text-[8px] text-stone uppercase tracking-widest">{screen.dateLabel}</p>
                        <div className="flex gap-1">
                          {screen.days.map((d, di) => (
                            <div key={di} className={`flex-1 rounded-xl p-1.5 text-center ${di === 1 ? "bg-gold-bg border border-gold" : "bg-ink-3 border border-ink-4"}`}>
                              {d.split('\n').map((l, j) => (
                                <p key={j} className={`text-[8px] leading-tight ${j === 1 ? di === 1 ? "text-gold font-display text-sm" : "text-cream font-display text-sm" : "text-stone"}`}>{l}</p>
                              ))}
                            </div>
                          ))}
                        </div>
                        <p className="text-[8px] text-stone uppercase tracking-widest">{screen.timesLabel}</p>
                        <div className="grid grid-cols-3 gap-1">
                          {["09:00","09:30","10:00","10:30","11:00","11:30"].map((t,ti) => (
                            <div key={t} className={`rounded-lg py-1.5 text-center text-[8px] ${ti === 2 ? "bg-gold-bg border border-gold text-gold" : "bg-ink-3 border border-ink-4 text-cream"}`}>{t}</div>
                          ))}
                        </div>
                      </>
                    )}
                    {i === 2 && (
                      <>
                        <div className="flex gap-1 flex-wrap">
                          {screen.filters.map((f, fi) => (
                            <span key={f} className={`text-[8px] px-2 py-0.5 rounded-full border ${fi === 0 ? "bg-gold text-ink border-gold" : "bg-ink-3 border-ink-4 text-stone"}`}>{f}</span>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {screen.styles.map(({e,n,l}) => (
                            <div key={n} className="bg-ink-3 border border-ink-4 rounded-xl overflow-hidden">
                              <div className="h-10 bg-ink-2 flex items-center justify-center text-2xl">{e}</div>
                              <div className="p-1.5">
                                <p className="text-[8px] font-semibold text-cream leading-tight">{n}</p>
                                <p className="text-[7px] text-stone">♥ {l}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="h-6 bg-ink border-t border-ink-4 flex items-center justify-center gap-4">
                    {["🏠","📅","🔍","👤"].map((e, j) => (
                      <span key={j} className={`text-[10px] ${j === i ? "opacity-100" : "opacity-30"}`}>{e}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-center mt-6">
                <p className="font-display text-xl tracking-widest text-cream">{screen.title}</p>
                <p className="text-stone text-sm mt-1 leading-relaxed">{screen.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
