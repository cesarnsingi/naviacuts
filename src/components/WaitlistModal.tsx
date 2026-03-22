"use client";

import { useState, useEffect, useRef } from "react";
import { useLang } from "@/context/LangContext";

const copy = {
  pt: {
    title:        "ENTRAR NA LISTA\nDE ESPERA",
    sub:          "Sê um dos primeiros a experimentar a Na Via Cuts. Vais receber acesso antecipado à app.",
    labelEmail:   "Email",
    placeEmail:   "carlos@email.com",
    submit:       "ENTRAR NA LISTA",
    submitting:   "A ENVIAR...",
    successTitle: "ESTÁS DENTRO! ✦",
    successSub:   "Enviámos uma confirmação para o teu email. Vais ser avisado assim que a app lançar.",
    errorMsg:     "Algo correu mal. Tenta novamente.",
    required:     "Campo obrigatório",
    invalidEmail: "Email inválido",
    close:        "Fechar",
    privacyNote:  "Os teus dados estão seguros. Nunca partilhamos informações com terceiros.",
  },
  en: {
    title:        "JOIN THE\nWAITLIST",
    sub:          "Be among the first to experience Na Via Cuts. You'll get early access to the app.",
    labelEmail:   "Email",
    placeEmail:   "carlos@email.com",
    submit:       "JOIN THE LIST",
    submitting:   "SENDING...",
    successTitle: "YOU'RE IN! ✦",
    successSub:   "We sent a confirmation to your email. You'll be notified as soon as the app launches.",
    errorMsg:     "Something went wrong. Please try again.",
    required:     "Required field",
    invalidEmail: "Invalid email",
    close:        "Close",
    privacyNote:  "Your data is safe. We never share your information with third parties.",
  },
};

interface Props {
  open:    boolean;
  onClose: () => void;
}

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistModal({ open, onClose }: Props) {
  const { lang } = useLang();
  const c = copy[lang];
  const overlayRef    = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm]     = useState({ email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (open) {
      setTimeout(() => firstInputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const handleClose = () => {
    if (status === "loading") return;
    onClose();
    setTimeout(() => {
      setForm({ email: "" });
      setErrors({});
      setStatus("idle");
    }, 300);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.email.trim())
      e.email = c.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = c.invalidEmail;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: form.email, preferred_lang: lang }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[key];
        return n;
      });
    }
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
    >
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full sm:max-w-md bg-ink-1 border border-ink-4 rounded-t-3xl sm:rounded-3xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={c.title.replace("\n", " ")}
      >
        <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        {status === "success" ? (
          /* ── Success state ── */
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gold-bg border border-gold flex items-center justify-center text-2xl mx-auto mb-6">
              ✓
            </div>
            <h3 className="font-display text-3xl tracking-widest text-gold mb-3">
              {c.successTitle}
            </h3>
            <p className="text-stone text-sm leading-relaxed mb-8">
              {c.successSub}
            </p>
            <button
              onClick={handleClose}
              className="w-full bg-gold hover:bg-gold-light text-ink py-3.5 rounded-2xl font-display text-lg tracking-widest transition-colors"
            >
              {c.close.toUpperCase()}
            </button>
          </div>
        ) : (
          /* ── Form state ── */
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl tracking-widest text-cream leading-tight">
                  {c.title.split("\n").map((line, i) => (
                    <span key={i} className={i === 1 ? "text-gold block" : "block"}>
                      {line}
                    </span>
                  ))}
                </h2>
                <p className="text-stone text-sm leading-relaxed mt-3 max-w-xs">
                  {c.sub}
                </p>
              </div>

              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full border border-ink-4 flex items-center justify-center text-stone hover:text-cream hover:border-gold/40 transition-all shrink-0 ml-4 mt-1"
                aria-label={c.close}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M1 1L11 11M11 1L1 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <Field label={c.labelEmail} error={errors.email}>
                <input
                  ref={firstInputRef}
                  type="email"
                  placeholder={c.placeEmail}
                  value={form.email}
                  onChange={set("email")}
                  autoComplete="email"
                  className={inputCls(!!errors.email)}
                />
              </Field>

              {status === "error" && (
                <p className="text-red-400 text-xs text-center">{c.errorMsg}</p>
              )}

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

function Field({
  label,
  error,
  children,
}: {
  label:    string;
  error?:   string;
  children: React.ReactNode;
}) {
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
