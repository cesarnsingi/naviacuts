"use client";

import { useState, useEffect, useRef } from "react";
import { useLang } from "@/context/LangContext";
import { joinWaitlist } from "@/lib/supabase";

const copy = {
  pt: {
    title:        "ENTRAR NA LISTA\nDE ESPERA",
    sub:          "Sê um dos primeiros a experimentar a Na Via Cuts. Vais receber acesso antecipado à app.",
    labelName:    "Nome Completo",
    labelEmail:   "Email",
    labelPhone:   "Telemóvel",
    labelCity:    "Cidade",
    placeName:    "Carlos Silva",
    placeEmail:   "carlos@email.com",
    placePhone:   "+244 9XX XXX XXX",
    placeCity:    "Luanda",
    submit:       "ENTRAR NA LISTA",
    submitting:   "A GUARDAR...",
    successTitle: "ESTÁS DENTRO! ✦",
    successSub:   "Vais ser avisado assim que a app estiver disponível em Luanda.",
    dupTitle:     "JÁ ESTÁS NA LISTA",
    dupSub:       "Este email já foi registado. Vais receber notificações em breve.",
    errorMsg:     "Algo correu mal. Tenta novamente.",
    required:     "Campo obrigatório",
    invalidEmail: "Email inválido",
    invalidPhone: "Telemóvel inválido",
    close:        "Fechar",
    privacyNote:  "Os teus dados estão seguros. Nunca partilhamos informações com terceiros.",
  },
  en: {
    title:        "JOIN THE\nWAITLIST",
    sub:          "Be among the first to experience Na Via Cuts. You'll get early access to the app.",
    labelName:    "Full Name",
    labelEmail:   "Email",
    labelPhone:   "Phone",
    labelCity:    "City",
    placeName:    "Carlos Silva",
    placeEmail:   "carlos@email.com",
    placePhone:   "+244 9XX XXX XXX",
    placeCity:    "Luanda",
    submit:       "JOIN THE LIST",
    submitting:   "SAVING...",
    successTitle: "YOU'RE IN! ✦",
    successSub:   "We'll notify you as soon as the app is available in Luanda.",
    dupTitle:     "ALREADY REGISTERED",
    dupSub:       "This email is already on the list. You'll receive notifications soon.",
    errorMsg:     "Something went wrong. Please try again.",
    required:     "Required field",
    invalidEmail: "Invalid email",
    invalidPhone: "Invalid phone",
    close:        "Close",
    privacyNote:  "Your data is safe. We never share your information with third parties.",
  },
};

interface Props {
  open:    boolean;
  onClose: () => void;
}

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

export default function WaitlistModal({ open, onClose }: Props) {
  const { lang } = useLang();
  const c = copy[lang];
  const overlayRef  = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({ full_name: "", email: "", phone: "", city: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  // Focus first input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => firstInputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const handleClose = () => {
    if (status === "loading") return;
    onClose();
    // Reset after animation
    setTimeout(() => {
      setForm({ full_name: "", email: "", phone: "", city: "" });
      setErrors({});
      setStatus("idle");
    }, 300);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.full_name.trim())                           e.full_name = c.required;
    if (!form.email.trim())                               e.email = c.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = c.invalidEmail;
    if (!form.phone.trim())                               e.phone = c.required;
    else if (form.phone.replace(/\D/g, "").length < 7)   e.phone = c.invalidPhone;
    if (!form.city.trim())                                e.city = c.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");

    const result = await joinWaitlist({
      full_name:      form.full_name,
      email:          form.email,
      phone:          form.phone,
      city:           form.city,
      preferred_lang: lang,
    });

    if (result.ok)             setStatus("success");
    else if (result.duplicate) setStatus("duplicate");
    else                       setStatus("error");
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" aria-hidden="true" />

      {/* Panel */}
      <div
        className="relative z-10 w-full sm:max-w-md bg-ink-1 border border-ink-4 rounded-t-3xl sm:rounded-3xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={c.title.replace("\n", " ")}
      >
        {/* Gold top accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        {status === "success" || status === "duplicate" ? (
          // ── Success / Duplicate state ──────────────────────────────────────
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gold-bg border border-gold flex items-center justify-center text-2xl mx-auto mb-6">
              {status === "success" ? "✓" : "✦"}
            </div>
            <h3 className="font-display text-3xl tracking-widest text-gold mb-3">
              {status === "success" ? c.successTitle : c.dupTitle}
            </h3>
            <p className="text-stone text-sm leading-relaxed mb-8">
              {status === "success" ? c.successSub : c.dupSub}
            </p>
            <button
              onClick={handleClose}
              className="w-full bg-gold hover:bg-gold-light text-ink py-3.5 rounded-2xl font-display text-lg tracking-widest transition-colors"
            >
              {c.close.toUpperCase()}
            </button>
          </div>
        ) : (
          // ── Form state ────────────────────────────────────────────────────
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl tracking-widest text-cream leading-tight">
                  {c.title.split("\n").map((line, i) => (
                    <span key={i} className={i === 1 ? "text-gold block" : "block"}>{line}</span>
                  ))}
                </h2>
                <p className="text-stone text-sm leading-relaxed mt-3 max-w-xs">{c.sub}</p>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full border border-ink-4 flex items-center justify-center text-stone hover:text-cream hover:border-gold/40 transition-all shrink-0 ml-4 mt-1"
                aria-label={c.close}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name */}
              <Field
                label={c.labelName}
                error={errors.full_name}
                inputRef={firstInputRef}
              >
                <input
                  ref={firstInputRef}
                  type="text"
                  placeholder={c.placeName}
                  value={form.full_name}
                  onChange={set("full_name")}
                  autoComplete="name"
                  className={inputCls(!!errors.full_name)}
                />
              </Field>

              {/* Email */}
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

              {/* Phone + City — side by side */}
              <div className="grid grid-cols-2 gap-3">
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
                <Field label={c.labelCity} error={errors.city}>
                  <input
                    type="text"
                    placeholder={c.placeCity}
                    value={form.city}
                    onChange={set("city")}
                    autoComplete="address-level2"
                    className={inputCls(!!errors.city)}
                  />
                </Field>
              </div>

              {/* Server error */}
              {status === "error" && (
                <p className="text-red-400 text-xs text-center">{c.errorMsg}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="relative w-full bg-gold hover:bg-gold-light disabled:opacity-60 text-ink py-4 rounded-2xl font-display text-xl tracking-widest transition-all duration-200 active:scale-[0.98] overflow-hidden group mt-2"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <span className="relative">
                  {status === "loading" ? c.submitting : c.submit}
                </span>
              </button>

              {/* Privacy note */}
              <p className="text-stone/60 text-xs text-center leading-relaxed pt-1">
                🔒 {c.privacyNote}
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Field({
  label,
  error,
  children,
  inputRef,
}: {
  label:     string;
  error?:    string;
  children:  React.ReactNode;
  inputRef?: React.RefObject<HTMLInputElement>;
}) {
  return (
    <div>
      <label className="block text-xs font-medium tracking-widest text-stone uppercase mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full bg-ink-3 border rounded-xl px-4 py-3 text-sm text-cream placeholder-stone/40",
    "focus:outline-none focus:ring-1 transition-colors duration-200",
    "font-body",
    hasError
      ? "border-red-500/60 focus:border-red-400 focus:ring-red-400/20"
      : "border-ink-4 focus:border-gold/60 focus:ring-gold/10 hover:border-ink-4/80",
  ].join(" ");
}
