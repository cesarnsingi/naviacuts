"use client";

import { useState } from "react";
import { useWaitlist } from "@/context/WaitlistContext";
import { useLang }     from "@/context/LangContext";

const content = {
  pt: {
    eyebrow: "FAQ",
    title:   "PERGUNTAS",
    accent:  "FREQUENTES",
    sub:     "Tudo o que precisas de saber antes de descarregar a app.",
    faqs: [
      { q: "A app é gratuita?",                       a: "Sim, completamente gratuita para os clientes. Descarregas, registas e marcas sem qualquer custo. Pagas apenas o corte directamente na barbearia." },
      { q: "Quando é que a app vai estar disponível?", a: "Estamos a finalizar os últimos detalhes. Entra na lista de espera para seres notificado assim que lançarmos. Quem estiver na lista terá acesso antecipado e ofertas exclusivas de lançamento." },
      { q: "Como funciona o pagamento?",               a: "O pagamento é feito directamente na barbearia após o serviço — Multicaixa Express, numerário (kwanzas) ou transferência bancária. Não guardamos dados de pagamento na app." },
      { q: "Posso cancelar ou remarcar?",              a: "Sim. Podes cancelar ou remarcar gratuitamente até 2 horas antes da marcação. Após esse prazo, pedimos que entres em contacto directamente com o barbeiro." },
      { q: "A app funciona só em Luanda?",             a: "Por agora sim — estamos focados em entregar a melhor experiência em Luanda. Temos planos de expandir para outras cidades de Angola e depois para outros países." },
      { q: "Como funcionam os Pontos de Fidelidade?",  a: "A cada corte concluído ganhas pontos automáticos. Acumula pontos para desbloquear descontos, cortes gratuitos e acesso prioritário aos barbeiros mais requisitados." },
      { q: "O que acontece se o barbeiro cancelar?",   a: "Recebes uma notificação imediata e podes remarcar com o mesmo barbeiro ou escolher outro com disponibilidade. Nunca ficas sem alternativa." },
      { q: "Posso escolher o mesmo barbeiro sempre?",  a: "Sim. Podes adicionar barbeiros aos teus favoritos e aceder directamente ao calendário deles. A app lembra-se das tuas preferências." },
    ],
    cta:      "Entrar na Lista de Espera",
    ctaSub:   "Ainda tens dúvidas? Fala connosco pelo WhatsApp.",
    whatsapp: "Falar no WhatsApp",
  },
  en: {
    eyebrow: "FAQ",
    title:   "FREQUENTLY",
    accent:  "ASKED",
    sub:     "Everything you need to know before downloading the app.",
    faqs: [
      { q: "Is the app free?",                     a: "Yes, completely free for customers. Download, register and book at no cost. You only pay for the cut directly at the barbershop." },
      { q: "When will the app be available?",      a: "We're finalising the last details. Join the waitlist to be notified as soon as we launch. Waitlist members get early access and exclusive launch offers." },
      { q: "How does payment work?",               a: "Payment is made directly at the barbershop after the service — Multicaixa Express, cash (kwanzas) or bank transfer. We do not store payment data in the app." },
      { q: "Can I cancel or reschedule?",          a: "Yes. You can cancel or reschedule for free up to 2 hours before your booking. After that, please contact the barber directly." },
      { q: "Does the app only work in Luanda?",    a: "For now, yes — we're focused on delivering the best experience in Luanda. We have plans to expand to other Angolan cities and then internationally." },
      { q: "How do Loyalty Points work?",          a: "You earn points automatically after each completed cut. Accumulate points to unlock discounts, free cuts and priority access to the most in-demand barbers." },
      { q: "What happens if the barber cancels?",  a: "You get an immediate notification and can rebook with the same barber or choose another with availability. You're never left without an option." },
      { q: "Can I always choose the same barber?", a: "Yes. You can add barbers to your favourites and access their calendar directly. The app remembers your preferences." },
    ],
    cta:      "Join the Waitlist",
    ctaSub:   "Still have questions? Chat with us on WhatsApp.",
    whatsapp: "Chat on WhatsApp",
  },
};

// ── FaqItem ───────────────────────────────────────────────────────────────────
// Uses the CSS grid-rows trick: grid-rows-[0fr] → grid-rows-[1fr]
// The inner div needs min-h-0 to allow collapsing to zero.
// This is the cleanest pure-CSS accordion — no inline styles, no JS height measurement.

function FaqItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q:        string;
  a:        string;
  isOpen:   boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`glass rounded-2xl transition-colors duration-200 ${isOpen ? "border-gold/30" : ""}`}>

      {/* Question button */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
          isOpen ? "text-gold" : "text-cream"
        }`}>
          {q}
        </span>
        <span className={`text-gold text-xl font-light shrink-0 leading-none transition-transform duration-300 ${
          isOpen ? "rotate-45" : "rotate-0"
        }`}>
          +
        </span>
      </button>

      {/* Answer — grid-rows trick for pure CSS height animation */}
      <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}>
        <div className="min-h-0 overflow-hidden">
          <p className="px-6 pb-6 pt-4 text-stone text-sm leading-relaxed font-light border-t border-ink-4">
            {a}
          </p>
        </div>
      </div>

    </div>
  );
}

// ── FAQ Section ───────────────────────────────────────────────────────────────

export default function FAQ() {
  const { lang }      = useLang();
  const { openModal } = useWaitlist();
  const c             = content[lang];
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx((prev) => (prev === i ? null : i));

  return (
    <section id="faq" className="relative py-32">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ink-4 to-transparent" />

      <div className="max-w-3xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="text-gold text-xs tracking-widest2 font-semibold mb-4">{c.eyebrow}</p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] tracking-widest text-cream leading-none">
            {c.title}<br />
            <span className="text-shimmer">{c.accent}</span>
          </h2>
          <p className="text-stone text-sm mt-6 font-light">{c.sub}</p>
        </div>

        {/* Accordion */}
        <div className="space-y-3 mb-16">
          {c.faqs.map((faq, i) => (
            <FaqItem
              key={`${lang}-${i}`}
              q={faq.q}
              a={faq.a}
              isOpen={openIdx === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal text-center space-y-4">
          <p className="text-stone text-sm font-light">{c.ctaSub}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={openModal}
              className="relative flex items-center gap-3 bg-gold hover:bg-gold-light text-ink px-8 py-3.5 rounded-full font-display text-lg tracking-widest transition-all duration-200 overflow-hidden group"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative">{c.cta.toUpperCase()}</span>
            </button>
            <a
              href="https://wa.me/244900000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-ink-4 hover:border-gold/40 text-stone hover:text-cream px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-200"
            >
              💬 {c.whatsapp}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
