"use client";

import { useWaitlist } from "@/context/WaitlistContext";
import { useLang }     from "@/context/LangContext";

const content = {
  pt: {
    eyebrow: "COMO FUNCIONA",
    title:   "SIMPLES ASSIM.",
    accent:  "3 PASSOS.",
    sub:     "Sem filas. Sem telefonemas. Sem surpresas. A Na Via Cuts foi desenhada para caber na tua rotina.",
    steps: [
      {
        num:   "01",
        icon:  "📱",
        title: "Descarrega a App",
        desc:  "Disponível gratuitamente no App Store (iOS) e Google Play (Android). O registo demora menos de 2 minutos — só precisas de email e telemóvel.",
        details: [
          "Disponível para iPhone e Android",
          "Registo em menos de 2 minutos",
          "Interface em Português e Inglês",
          "100% gratuito para clientes",
        ],
      },
      {
        num:   "02",
        icon:  "✂️",
        title: "Escolhe o Teu Barbeiro",
        desc:  "Vê os perfis completos de cada barbeiro — especialidade, avaliações reais de clientes, galeria de trabalhos e disponibilidade em tempo real. Escolhe por estilo ou por horário.",
        details: [
          "Perfis completos com galeria de cortes",
          "Avaliações reais de clientes verificados",
          "Filtros por especialidade e disponibilidade",
          "Ver horários disponíveis para os próximos 14 dias",
        ],
      },
      {
        num:   "03",
        icon:  "✓",
        title: "Marca e Aparece",
        desc:  "Confirma a marcação em segundos. Recebes confirmação imediata e um lembrete automático antes da hora. No dia, aparece e sai com o melhor corte de Luanda.",
        details: [
          "Confirmação instantânea via notificação",
          "Lembrete automático 1h antes",
          "Cancelamento gratuito até 2h antes",
          "Pagamento na barbearia (Multicaixa ou Cash)",
        ],
      },
    ],
    cta:       "Entrar na Lista de Espera",
    ctaSub:    "Sê um dos primeiros a marcar quando a app estiver disponível.",
  },
  en: {
    eyebrow: "HOW IT WORKS",
    title:   "THIS SIMPLE.",
    accent:  "3 STEPS.",
    sub:     "No queues. No phone calls. No surprises. Na Via Cuts was built to fit into your routine.",
    steps: [
      {
        num:   "01",
        icon:  "📱",
        title: "Download the App",
        desc:  "Available for free on the App Store (iOS) and Google Play (Android). Registration takes less than 2 minutes — you only need an email and phone number.",
        details: [
          "Available for iPhone and Android",
          "Registration in under 2 minutes",
          "Interface in Portuguese and English",
          "100% free for customers",
        ],
      },
      {
        num:   "02",
        icon:  "✂️",
        title: "Choose Your Barber",
        desc:  "View complete profiles for each barber — specialty, real customer reviews, portfolio gallery and real-time availability. Choose by style or by time slot.",
        details: [
          "Full profiles with cut gallery",
          "Real reviews from verified customers",
          "Filters by specialty and availability",
          "See open slots for the next 14 days",
        ],
      },
      {
        num:   "03",
        icon:  "✓",
        title: "Book and Show Up",
        desc:  "Confirm your booking in seconds. You get instant confirmation and an automatic reminder before your appointment. On the day, show up and leave with the best cut in Luanda.",
        details: [
          "Instant confirmation via notification",
          "Automatic reminder 1h before",
          "Free cancellation up to 2h before",
          "Payment at the barbershop (Multicaixa or Cash)",
        ],
      },
    ],
    cta:    "Join the Waitlist",
    ctaSub: "Be among the first to book when the app launches.",
  },
};

export default function HowItWorks() {
  const { lang }      = useLang();
  const { openModal } = useWaitlist();
  const c = content[lang];

  return (
    <section id="how-it-works" className="relative py-32">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ink-4 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold/[0.03] blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8 reveal">
          <p className="text-gold text-xs tracking-widest2 font-semibold mb-4">{c.eyebrow}</p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] tracking-widest text-cream leading-none">
            {c.title}<br /><span className="text-shimmer">{c.accent}</span>
          </h2>
          <p className="text-stone text-sm leading-relaxed mt-6 max-w-lg mx-auto font-light">{c.sub}</p>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-16">
          {c.steps.map((step, i) => (
            <div
              key={i}
              className={`reveal delay-${i + 1} glass rounded-2xl p-7 hover:border-gold/20 transition-all duration-300`}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Step number + icon */}
                <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-2 shrink-0 md:w-20">
                  <div className="relative w-14 h-14 rounded-2xl bg-gold-bg border border-gold/30 flex items-center justify-center text-2xl">
                    <span>{step.icon}</span>
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                      <span className="text-ink text-[9px] font-bold">{i + 1}</span>
                    </div>
                  </div>
                  <span className="font-display text-4xl text-ink-4 leading-none tracking-widest select-none md:text-3xl">
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-2xl tracking-widest text-cream mb-3">{step.title}</h3>
                  <p className="text-stone text-sm leading-relaxed font-light mb-5">{step.desc}</p>

                  {/* Detail bullets */}
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {step.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-xs text-stone font-light">
                        <span className="text-gold mt-0.5 shrink-0">✦</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
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
