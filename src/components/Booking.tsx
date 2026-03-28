"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";

const barbers = [
  { value: "mario",  pt: "Mário Lopes — Degradês & Fades",       en: "Mário Lopes — Fades & Tapers"       },
  { value: "kadu",   pt: "Kadu Faria — Lineups & Designs",       en: "Kadu Faria — Lineups & Designs"     },
  { value: "zeca",   pt: "Zeca Mateus — Cortes Clássicos",       en: "Zeca Mateus — Classic Cuts"         },
  { value: "tiago",  pt: "Tiago Baptista — Cabelo Encaracolado", en: "Tiago Baptista — Curly & Textured"  },
];

const services = [
  { value: "corte", pt: "Corte — 2.500 Kz",              en: "Haircut — 2,500 Kz"          },
  { value: "fade",  pt: "Degradê — 3.000 Kz",             en: "Fade — 3,000 Kz"             },
  { value: "barba", pt: "Barba — 2.000 Kz",               en: "Beard — 2,000 Kz"            },
  { value: "combo", pt: "Combo Corte + Barba — 4.500 Kz", en: "Combo Cut + Beard — 4,500 Kz"},
  { value: "kids",  pt: "Corte Infantil — 1.800 Kz",      en: "Kids Cut — 1,800 Kz"         },
];

const copy = {
  pt: {
    eyebrow:       "MARCAR AGORA",
    title:         "FAZ A TUA",
    accent:        "MARCAÇÃO",
    sub:           "Preenche o formulário e receberás uma confirmação por email. Entraremos também em contacto por telemóvel.",
    labelName:     "Nome Completo",
    labelEmail:    "Email",
    labelPhone:    "Telemóvel",
    labelBarber:   "Escolhe o Barbeiro",
    labelService:  "Escolhe o Serviço",
    labelDate:     "Data Preferida",
    labelTime:     "Hora Preferida",
    placeName:     "Carlos Silva",
    placeEmail:    "carlos@email.com",
    placePhone:    "+244 9XX XXX XXX",
    selectBarber:  "Selecciona um barbeiro...",
    selectService: "Selecciona um serviço...",
    submit:        "ENVIAR PEDIDO",
    submitting:    "A ENVIAR...",
    successTitle:  "PEDIDO ENVIADO! ✦",
    successSub:    "Enviámos uma confirmação para o teu email. Vamos contactar-te em breve para confirmar.",
    errorMsg:      "Algo correu mal. Tenta novamente.",
    required:      "Campo obrigatório",
    invalidEmail:  "Email inválido",
    invalidPhone:  "Telemóvel inválido",
    note:          "O teu pedido será confirmado em até 2 horas.",
    another:       "FAZER OUTRA MARCAÇÃO",
    times: ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"],
  },
  en: {
    eyebrow:       "BOOK NOW",
    title:         "MAKE YOUR",
    accent:        "BOOKING",
    sub:           "Fill in the form and you'll receive an email confirmation. We'll also reach out by phone.",
    labelName:     "Full Name",
    labelEmail:    "Email",
    labelPhone:    "Phone Number",
    labelBarber:   "Choose Your Barber",
    labelService:  "Choose a Service",
    labelDate:     "Preferred Date",
    labelTime:     "Preferred Time",
    placeName:     "Carlos Silva",
    placeEmail:    "carlos@email.com",
    placePhone:    "+244 9XX XXX XXX",
    selectBarber:  "Select a barber...",
    selectService: "Select a service...",
    submit:        "SEND REQUEST",
    submitting:    "SENDING...",
    successTitle:  "REQUEST SENT! ✦",
    successSub:    "We sent a confirmation to your email. We'll be in touch shortly to confirm your booking.",
    errorMsg:      "Something went wrong. Please try again.",
    required:      "Required field",
    invalidEmail:  "Invalid email",
    invalidPhone:  "Invalid phone number",
    note:          "Your request will be confirmed within 2 hours.",
    another:       "MAKE ANOTHER BOOKING",
    times: ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"],
  },
};

type Status = "idle" | "loading" | "success" | "error";

interface FormState {
  name:    string;
  email:   string;
  phone:   string;
  barber:  string;
  service: string;
  date:    string;
  time:    string;
}

const empty: FormState = { name: "", email: "", phone: "", barber: "", service: "", date: "", time: "" };

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium tracking-widest text-stone uppercase mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

function inputCls(err: boolean) {
  return [
    "w-full bg-ink-3 border rounded-xl px-4 py-3 text-sm text-cream placeholder-stone/40",
    "focus:outline-none focus:ring-1 transition-colors duration-200",
    err
      ? "border-red-500/60 focus:border-red-400 focus:ring-red-400/20"
      : "border-ink-4 focus:border-gold/60 focus:ring-gold/10",
  ].join(" ");
}

function selectCls(err: boolean) {
  return [
    "w-full bg-ink-3 border rounded-xl px-4 py-3 text-sm text-cream",
    "focus:outline-none focus:ring-1 transition-colors duration-200 appearance-none cursor-pointer",
    err
      ? "border-red-500/60 focus:border-red-400 focus:ring-red-400/20"
      : "border-ink-4 focus:border-gold/60 focus:ring-gold/10",
  ].join(" ");
}

export default function Booking() {
  const { lang }            = useLang();
  const c                   = copy[lang];
  const [form, setForm]     = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>("idle");

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim())                               e.name    = c.required;
    if (!form.email.trim())                              e.email   = c.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = c.invalidEmail;
    if (!form.phone.trim())                              e.phone   = c.required;
    else if (form.phone.replace(/\D/g, "").length < 7)  e.phone   = c.invalidPhone;
    if (!form.barber)                                    e.barber  = c.required;
    if (!form.service)                                   e.service = c.required;
    if (!form.date)                                      e.date    = c.required;
    if (!form.time)                                      e.time    = c.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/booking", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...form, preferred_lang: lang }),
      });
      const data = await res.json();
      setStatus(res.ok && data.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => { setForm(empty); setErrors({}); setStatus("idle"); };

  return (
    <section id="booking" className="relative py-32">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ink-4 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12 reveal">
          <p className="text-gold text-xs tracking-widest2 font-semibold mb-4">{c.eyebrow}</p>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] tracking-widest text-cream leading-none">
            {c.title}<br /><span className="text-shimmer">{c.accent}</span>
          </h2>
          <p className="text-stone text-sm mt-6 font-light leading-relaxed">{c.sub}</p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl overflow-hidden reveal delay-1">
          <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

          {status === "success" ? (
            <div className="p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-gold-bg border border-gold flex items-center justify-center text-2xl mx-auto mb-6">
                ✓
              </div>
              <h3 className="font-display text-3xl tracking-widest text-gold mb-3">
                {c.successTitle}
              </h3>
              <p className="text-stone text-sm leading-relaxed mb-2 max-w-xs mx-auto">
                {c.successSub}
              </p>
              <p className="text-stone/40 text-xs mb-8">{c.note}</p>
              <button
                onClick={reset}
                className="bg-gold hover:bg-gold-light text-ink px-8 py-3.5 rounded-full font-display text-base tracking-widest transition-colors"
              >
                {c.another}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="p-8 space-y-5">

              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={c.labelName} error={errors.name}>
                  <input
                    type="text"
                    placeholder={c.placeName}
                    value={form.name}
                    onChange={set("name")}
                    autoComplete="name"
                    className={inputCls(!!errors.name)}
                  />
                </Field>
                <Field label={c.labelEmail} error={errors.email}>
                  <input
                    type="email"
                    placeholder={c.placeEmail}
                    value={form.email}
                    onChange={set("email")}
                    autoComplete="email"
                    className={inputCls(!!errors.email)}
                  />
                </Field>
              </div>

              {/* Phone */}
              <Field label={c.labelPhone} error={errors.phone}>
                <input
                  type="tel"
                  placeholder={c.placePhone}
                  value={form.phone}
                  onChange={set("phone")}
                  autoComplete="tel"
                  className={inputCls(!!errors.phone)}
                />
              </Field>

              {/* Barber */}
              <Field label={c.labelBarber} error={errors.barber}>
                <div className="relative">
                  <select value={form.barber} onChange={set("barber")} className={selectCls(!!errors.barber)}>
                    <option value="" disabled>{c.selectBarber}</option>
                    {barbers.map((b) => (
                      <option key={b.value} value={b.value}>
                        {lang === "pt" ? b.pt : b.en}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone pointer-events-none text-xs">▾</span>
                </div>
              </Field>

              {/* Service */}
              <Field label={c.labelService} error={errors.service}>
                <div className="relative">
                  <select value={form.service} onChange={set("service")} className={selectCls(!!errors.service)}>
                    <option value="" disabled>{c.selectService}</option>
                    {services.map((s) => (
                      <option key={s.value} value={s.value}>
                        {lang === "pt" ? s.pt : s.en}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone pointer-events-none text-xs">▾</span>
                </div>
              </Field>

              {/* Date + Time */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={c.labelDate} error={errors.date}>
                  <input
                    type="date"
                    min={minDateStr}
                    value={form.date}
                    onChange={set("date")}
                    className={inputCls(!!errors.date)}
                  />
                </Field>
                <Field label={c.labelTime} error={errors.time}>
                  <div className="relative">
                    <select value={form.time} onChange={set("time")} className={selectCls(!!errors.time)}>
                      <option value="" disabled>--:--</option>
                      {c.times.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone pointer-events-none text-xs">▾</span>
                  </div>
                </Field>
              </div>

              {status === "error" && (
                <p className="text-red-400 text-xs text-center">{c.errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="relative w-full bg-gold hover:bg-gold-light disabled:opacity-60 text-ink py-4 rounded-2xl font-display text-xl tracking-widest transition-all duration-200 active:scale-[0.98] overflow-hidden group mt-2"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <span className="relative z-10">
                  {status === "loading" ? c.submitting : c.submit}
                </span>
              </button>

              <p className="text-stone/40 text-xs text-center">{c.note}</p>

            </form>
          )}
        </div>
      </div>
    </section>
  );
}
