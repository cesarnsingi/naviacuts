"use client";

import { useLang } from "@/context/LangContext";

const features = [
  { icon:"⚡", pt:["Marcação em 30 Segundos","Escolhe o teu barbeiro, a data e a hora. Confirmação instantânea no teu telemóvel."],          en:["Book in 30 Seconds","Choose your barber, date and time. Instant confirmation on your phone."] },
  { icon:"💈", pt:["Barbeiros de Topo","4 barbeiros especializados em degradês, designs, cortes clássicos e cabelo encaracolado."],            en:["Top Barbers","4 specialist barbers covering fades, designs, classic cuts and curly hair."] },
  { icon:"📅", pt:["Horários Flexíveis","Vê os horários disponíveis em tempo real e marca para os próximos 14 dias."],                         en:["Flexible Scheduling","See real-time availability and book up to 14 days ahead."] },
  { icon:"✦",  pt:["Pontos de Fidelidade","Cada corte vale pontos. Acumula e desbloqueia descontos exclusivos."],                              en:["Loyalty Points","Every cut earns points. Accumulate and unlock exclusive discounts."] },
  { icon:"🔔", pt:["Lembretes Automáticos","Recebe notificações antes da tua marcação. Nunca mais te esqueças."],                              en:["Automatic Reminders","Get notified before your appointment. Never miss a cut."] },
  { icon:"🌍", pt:["Português & English","A app funciona nas duas línguas. Muda com um toque."],                                                en:["Portuguese & English","The app works in both languages. Switch with one tap."] },
];

const headings = {
  pt: { eyebrow: "PORQUÊ NA VIA CUTS", title: "TUDO O QUE", accent: "PRECISAS" },
  en: { eyebrow: "WHY NA VIA CUTS",    title: "EVERYTHING",  accent: "YOU NEED"  },
};

export default function Features() {
  const { lang } = useLang();
  const h = headings[lang];

  return (
    <section className="relative py-32">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ink-4 to-transparent" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <p className="text-gold text-xs tracking-widest2 font-semibold mb-4">{h.eyebrow}</p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] tracking-widest text-cream leading-none">
            {h.title}<br /><span className="text-shimmer">{h.accent}</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className={`reveal delay-${(i % 3) + 1} group glass rounded-2xl p-7 hover:border-gold/25 hover:bg-white/[0.03] transition-all duration-300 cursor-default`}>
              <div className="w-12 h-12 rounded-xl bg-gold-bg border border-gold/20 flex items-center justify-center text-xl mb-5 group-hover:border-gold/40 group-hover:bg-gold/10 transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="font-display text-xl tracking-widest text-cream mb-2 group-hover:text-gold transition-colors duration-300">
                {f[lang][0]}
              </h3>
              <p className="text-stone text-sm leading-relaxed font-light">{f[lang][1]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
