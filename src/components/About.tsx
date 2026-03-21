"use client";

import { useWaitlist } from "@/context/WaitlistContext";
import { useLang }     from "@/context/LangContext";

const content = {
  pt: {
    eyebrow: "SOBRE NÓS",
    title:   "A NOSSA",
    accent:  "HISTÓRIA",
    story: [
      "A Na Via Cuts nasceu de uma frustração simples: marcar um corte em Luanda era sempre uma confusão. Telefonemas sem resposta, esperas longas, não saber se o teu barbeiro estava disponível.",
      "Decidimos mudar isso. Criámos uma app que une os melhores barbeiros de Luanda com os seus clientes — de forma simples, rápida e digital. Sem filas, sem surpresas.",
      "Somos uma equipa angolana, construída em Luanda, para Luanda. Acreditamos que o talento dos nossos barbeiros merece uma plataforma à altura.",
    ],
    mission:     "MISSÃO",
    missionText: "Digitalizar a barbearia angolana. Tornar o agendamento de cortes tão fácil quanto pedir uma viagem.",
    vision:      "VISÃO",
    visionText:  "Ser a plataforma de referência para barbearias em Angola e em toda a África lusófona.",
    values:      "VALORES",
    valuesList: [
      { icon: "✦", label: "Qualidade", desc: "Apenas barbeiros verificados e avaliados." },
      { icon: "⚡", label: "Rapidez",   desc: "Marcação em menos de 30 segundos." },
      { icon: "🤝", label: "Confiança", desc: "Dados seguros, sem partilha com terceiros." },
      { icon: "🌍", label: "Local",     desc: "Construído por angolanos, para angolanos." },
    ],
    team:        "A EQUIPA",
    teamSub:     "Uma equipa pequena com uma missão grande.",
    members: [
      { name: "Fundador & CEO",    emoji: "👤" },
      { name: "Design & Produto",  emoji: "🎨" },
      { name: "Tecnologia",        emoji: "💻" },
      { name: "Operações",         emoji: "⚙️" },
    ],
    location:    "Luanda, Angola",
    founded:     "Fundada em 2025",
    cta:         "Entrar na Lista de Espera",
    ctaSub:      "Junta-te a centenas de clientes que já aguardam o lançamento.",
  },
  en: {
    eyebrow: "ABOUT",
    title:   "OUR",
    accent:  "STORY",
    story: [
      "Na Via Cuts was born from a simple frustration: booking a haircut in Luanda was always a hassle. Unanswered phone calls, long waits, never knowing if your barber was available.",
      "We decided to change that. We built an app that connects the best barbers in Luanda with their clients — simply, quickly and digitally. No queues, no surprises.",
      "We are an Angolan team, built in Luanda, for Luanda. We believe the talent of our barbers deserves a platform that matches it.",
    ],
    mission:     "MISSION",
    missionText: "Digitalise the Angolan barbershop. Make booking a haircut as easy as ordering a ride.",
    vision:      "VISION",
    visionText:  "Be the go-to platform for barbershops across Angola and the entire Portuguese-speaking Africa.",
    values:      "VALUES",
    valuesList: [
      { icon: "✦", label: "Quality",   desc: "Only verified and rated barbers." },
      { icon: "⚡", label: "Speed",     desc: "Book in under 30 seconds." },
      { icon: "🤝", label: "Trust",     desc: "Secure data, never shared with third parties." },
      { icon: "🌍", label: "Local",     desc: "Built by Angolans, for Angolans." },
    ],
    team:        "THE TEAM",
    teamSub:     "A small team with a big mission.",
    members: [
      { name: "Founder & CEO",     emoji: "👤" },
      { name: "Design & Product",  emoji: "🎨" },
      { name: "Technology",        emoji: "💻" },
      { name: "Operations",        emoji: "⚙️" },
    ],
    location:    "Luanda, Angola",
    founded:     "Founded in 2025",
    cta:         "Join the Waitlist",
    ctaSub:      "Join hundreds of customers already waiting for the launch.",
  },
};

export default function About() {
  const { lang }      = useLang();
  const { openModal } = useWaitlist();
  const c = content[lang];

  return (
    <section id="about" className="relative py-32">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ink-4 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gold/[0.025] blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <p className="text-gold text-xs tracking-widest2 font-semibold mb-4">{c.eyebrow}</p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] tracking-widest text-cream leading-none">
            {c.title}<br /><span className="text-shimmer">{c.accent}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left — story */}
          <div className="reveal">
            <div className="space-y-5 mb-10">
              {c.story.map((para, i) => (
                <p key={i} className={`leading-relaxed font-light ${
                  i === 0 ? "text-cream text-base" : "text-stone text-sm"
                }`}>
                  {para}
                </p>
              ))}
            </div>
            {/* Location + founded pills */}
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-2 glass border-gold/20 rounded-full px-4 py-2 text-xs font-medium text-stone">
                📍 {c.location}
              </span>
              <span className="flex items-center gap-2 glass border-gold/20 rounded-full px-4 py-2 text-xs font-medium text-stone">
                🇦🇴 {c.founded}
              </span>
            </div>
          </div>

          {/* Right — mission + vision */}
          <div className="space-y-6 reveal delay-1">
            <div className="glass rounded-2xl p-6 border-gold/10 hover:border-gold/20 transition-all duration-300">
              <p className="text-gold text-xs font-semibold tracking-widest mb-3">{c.mission}</p>
              <p className="text-cream text-base leading-relaxed font-light">{c.missionText}</p>
            </div>
            <div className="glass rounded-2xl p-6 border-gold/10 hover:border-gold/20 transition-all duration-300">
              <p className="text-gold text-xs font-semibold tracking-widest mb-3">{c.vision}</p>
              <p className="text-stone text-sm leading-relaxed font-light">{c.visionText}</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16 reveal">
          <p className="text-gold text-xs font-semibold tracking-widest mb-8 text-center">{c.values}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.valuesList.map((v, i) => (
              <div key={`${lang}-${i}`} className="glass rounded-2xl p-5 text-center hover:border-gold/20 transition-all duration-300 group">
                <span className="text-2xl block mb-3">{v.icon}</span>
                <p className="font-display text-lg tracking-widest text-gold mb-2 group-hover:text-gold-light transition-colors">{v.label.toUpperCase()}</p>
                <p className="text-stone text-xs leading-relaxed font-light">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16 reveal">
          <div className="text-center mb-8">
            <p className="text-gold text-xs font-semibold tracking-widest mb-2">{c.team}</p>
            <p className="text-stone text-sm font-light">{c.teamSub}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {c.members.map((m, i) => (
              <div key={i} className="glass rounded-2xl p-5 text-center hover:border-gold/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gold-bg border border-gold/20 flex items-center justify-center text-xl mx-auto mb-3">
                  {m.emoji}
                </div>
                <p className="text-stone text-xs font-medium leading-snug">{m.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="reveal text-center">
          <p className="text-stone text-sm mb-6 font-light">{c.ctaSub}</p>
          <button
            onClick={openModal}
            className="relative inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-ink px-10 py-4 rounded-full font-display text-xl tracking-widest transition-all duration-200 overflow-hidden group"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative">{c.cta.toUpperCase()}</span>
            <span className="relative text-ink/60">✦</span>
          </button>
        </div>
      </div>
    </section>
  );
}
