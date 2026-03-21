"use client";

import { useWaitlist } from "@/context/WaitlistContext";
import { useLang }     from "@/context/LangContext";

const barbers = [
  {
    emoji: "✂️",
    name:  "Mário Lopes",
    badge: "TOP",
    rating: 4.9,
    cuts:   287,
    experience: "8",
    specPt: "Degradês & Fades",
    specEn: "Fades & Tapers",
    bioPt:  "Especialista em degradês de pele e transições suaves. Mário é o barbeiro mais requisitado da equipa, com mais de 8 anos de experiência em Luanda. Perfeito para quem quer um look limpo e moderno.",
    bioEn:  "Specialist in skin fades and smooth transitions. Mário is the most requested barber on the team, with over 8 years of experience in Luanda. Perfect for a clean, modern look.",
    tags:   { pt: ["Degradê de Pele","High Fade","Mid Fade","Taper"], en: ["Skin Fade","High Fade","Mid Fade","Taper"] },
  },
  {
    emoji: "🔥",
    name:  "Kadu Faria",
    badge: null,
    rating: 4.8,
    cuts:   174,
    experience: "5",
    specPt: "Lineups & Designs",
    specEn: "Lineups & Designs",
    bioPt:  "Artista do cabelo com talento único para designs geométricos e lineups perfeitos. Kadu transforma cada corte numa obra de arte. Traz a tua ideia e ele concretiza.",
    bioEn:  "Hair artist with a unique talent for geometric designs and sharp lineups. Kadu turns every cut into a work of art. Bring your idea and he'll make it happen.",
    tags:   { pt: ["Lineup","Design Geométrico","Art Cuts","Padrões"], en: ["Lineup","Geometric Design","Art Cuts","Patterns"] },
  },
  {
    emoji: "💈",
    name:  "Zeca Mateus",
    badge: null,
    rating: 4.7,
    cuts:   131,
    experience: "12",
    specPt: "Cortes Clássicos",
    specEn: "Classic Cuts",
    bioPt:  "O mestre dos cortes clássicos com 12 anos de ofício. Zeca domina o barbering tradicional — pompadour, quiff, side part — com uma precisão que só a experiência dá.",
    bioEn:  "The master of classic cuts with 12 years of craft. Zeca commands traditional barbering — pompadour, quiff, side part — with precision that only experience brings.",
    tags:   { pt: ["Pompadour","Quiff","Side Part","Clássico"], en: ["Pompadour","Quiff","Side Part","Classic"] },
  },
  {
    emoji: "💎",
    name:  "Tiago Baptista",
    badge: "NOVO",
    rating: 4.9,
    cuts:   210,
    experience: "4",
    specPt: "Cabelo Encaracolado",
    specEn: "Curly & Textured",
    bioPt:  "Especialista em cabelo encaracolado e texturizado. Tiago entende a estrutura natural do cabelo afro e misto como nenhum outro, criando estilos que valorizam o teu tipo de cabelo.",
    bioEn:  "Specialist in curly and textured hair. Tiago understands the natural structure of afro and mixed hair like no one else, creating styles that celebrate your hair type.",
    tags:   { pt: ["Afro","Twist","Loc Fade","Texturizado"], en: ["Afro","Twist","Loc Fade","Textured"] },
  },
];

const content = {
  pt: {
    eyebrow:    "A EQUIPA",
    title:      "OS NOSSOS",
    accent:     "BARBEIROS",
    sub:        "Cada barbeiro é um especialista na sua área. Escolhe o teu e marca directamente pela app.",
    expLabel:   "anos de exp.",
    cutsLabel:  "cortes feitos",
    cta:        "Marcar com este barbeiro",
    waitlistBtn:"Entrar na Lista de Espera",
    bottom:     "Não sabes qual escolher? A app ajuda-te com base no teu estilo.",
  },
  en: {
    eyebrow:    "THE TEAM",
    title:      "OUR",
    accent:     "BARBERS",
    sub:        "Each barber is a specialist in their field. Choose yours and book directly through the app.",
    expLabel:   "yrs experience",
    cutsLabel:  "cuts done",
    cta:        "Book with this barber",
    waitlistBtn:"Join the Waitlist",
    bottom:     "Not sure who to pick? The app helps you based on your style.",
  },
};

export default function Barbers() {
  const { lang }     = useLang();
  const { openModal } = useWaitlist();
  const c = content[lang];

  return (
    <section id="barbers" className="relative py-32">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ink-4 to-transparent" />
      <div className="absolute left-0 top-1/3 w-96 h-96 rounded-full bg-gold/[0.025] blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 reveal">
          <div>
            <p className="text-gold text-xs tracking-widest2 font-semibold mb-4">{c.eyebrow}</p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] tracking-widest text-cream leading-none">
              {c.title}<br /><span className="text-shimmer">{c.accent}</span>
            </h2>
          </div>
          <p className="text-stone text-sm max-w-sm leading-relaxed font-light">{c.sub}</p>
        </div>

        {/* Barber cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {barbers.map((b, i) => (
            <div
              key={b.name}
              className={`reveal delay-${(i % 2) + 1} glass rounded-2xl p-6 hover:border-gold/20 transition-all duration-300 group`}
            >
              <div className="flex gap-5 mb-5">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-ink-3 border-2 border-ink-4 group-hover:border-gold/40 flex items-center justify-center text-2xl transition-colors duration-300">
                    {b.emoji}
                  </div>
                  {b.badge && (
                    <span className="absolute -top-2 -right-2 bg-gold text-ink text-[9px] font-bold px-1.5 py-0.5 rounded-md tracking-widest">
                      {b.badge}
                    </span>
                  )}
                </div>

                {/* Name + specialty */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-cream text-lg mb-0.5">{b.name}</h3>
                  <p className="text-gold text-xs font-medium mb-2 tracking-wide">
                    {lang === "pt" ? b.specPt : b.specEn}
                  </p>
                  {/* Stats row */}
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <span className="text-gold">★</span>
                      <span className="text-cream font-semibold">{b.rating}</span>
                      <span className="text-stone">({b.cuts} {c.cutsLabel})</span>
                    </span>
                    <span className="text-stone">{b.experience} {c.expLabel}</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-stone text-sm leading-relaxed mb-5 font-light">
                {lang === "pt" ? b.bioPt : b.bioEn}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {(lang === "pt" ? b.tags.pt : b.tags.en).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium text-stone border border-ink-4 rounded-full px-3 py-1 hover:border-gold/30 hover:text-cream transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={openModal}
                className="w-full py-2.5 rounded-xl border border-gold/30 text-gold text-sm font-medium tracking-wide hover:bg-gold-bg transition-all duration-200 hover:border-gold/60"
              >
                {c.cta} →
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div className="reveal glass rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-stone text-sm font-light leading-relaxed max-w-sm">{c.bottom}</p>
          <button
            onClick={openModal}
            className="relative flex items-center gap-3 bg-gold hover:bg-gold-light text-ink px-7 py-3.5 rounded-full font-display text-lg tracking-widest transition-all duration-200 shrink-0 overflow-hidden group"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative">{c.waitlistBtn.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
