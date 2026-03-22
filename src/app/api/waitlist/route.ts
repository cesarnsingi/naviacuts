import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend  = new Resend(process.env.RESEND_API_KEY);
const FROM    = process.env.FROM_EMAIL   ?? "Na Via Cuts <onboarding@resend.dev>";
const NOTIFY  = process.env.NOTIFY_EMAIL ?? "";

// ── Email templates ───────────────────────────────────────────────────────────

function confirmationHtml(email: string, lang: "pt" | "en"): string {
  const pt = lang === "pt";

  return `<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#111111;border-radius:16px;border:1px solid #2a2a2a;overflow:hidden;max-width:520px;width:100%;">

        <!-- Gold top bar -->
        <tr><td style="height:3px;background:linear-gradient(90deg,#8a6f2e,#c9a84c,#e8c97a,#c9a84c,#8a6f2e);"></td></tr>

        <!-- Logo -->
        <tr><td align="center" style="padding:36px 40px 28px;">
          <p style="margin:0;font-size:26px;font-weight:700;letter-spacing:6px;color:#f4f0e8;">
            NA VIA <span style="color:#c9a84c;">CUTS</span>
          </p>
          <p style="margin:6px 0 0;font-size:10px;letter-spacing:3px;color:#6b6b6b;text-transform:uppercase;">
            ${pt ? "Barbearia Digital · Luanda, Angola" : "Digital Barbershop · Luanda, Angola"}
          </p>
        </td></tr>

        <!-- Divider -->
        <tr><td style="padding:0 40px;"><div style="height:1px;background:#2a2a2a;"></div></td></tr>

        <!-- Body -->
        <tr><td style="padding:36px 40px;">
          <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;color:#c9a84c;text-transform:uppercase;font-weight:600;">
            ${pt ? "Confirmação" : "Confirmation"}
          </p>
          <h1 style="margin:0 0 20px;font-size:28px;font-weight:700;letter-spacing:2px;color:#f4f0e8;line-height:1.2;">
            ${pt ? "Estás na lista! ✦" : "You're on the list! ✦"}
          </h1>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#9a9a9a;font-weight:300;">
            ${pt
              ? `Registámos o teu email <strong style="color:#f4f0e8;">${email}</strong> na lista de espera da <strong style="color:#f4f0e8;">Na Via Cuts</strong>. Vais ser um dos primeiros a saber quando a app estiver disponível em Luanda.`
              : `We've registered <strong style="color:#f4f0e8;">${email}</strong> on the <strong style="color:#f4f0e8;">Na Via Cuts</strong> waitlist. You'll be among the first to know when the app launches in Luanda.`
            }
          </p>
          <p style="margin:0 0 32px;font-size:15px;line-height:1.7;color:#9a9a9a;font-weight:300;">
            ${pt
              ? "Vais receber acesso antecipado e ofertas exclusivas de lançamento. Guarda este email."
              : "You'll get early access and exclusive launch offers. Keep this email safe."
            }
          </p>

          <!-- Info box -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background:#1a1500;border:1px solid #c9a84c;border-radius:12px;padding:22px;">
              <p style="margin:0 0 12px;font-size:11px;letter-spacing:2px;color:#c9a84c;text-transform:uppercase;font-weight:600;">
                ${pt ? "Enquanto esperas" : "While you wait"}
              </p>
              <ul style="margin:0;padding:0 0 0 18px;color:#9a9a9a;font-size:14px;line-height:1.9;">
                <li>${pt ? "A app estará disponível no iOS e Android" : "The app will be available on iOS and Android"}</li>
                <li>${pt ? "Booking em menos de 30 segundos" : "Book in under 30 seconds"}</li>
                <li>${pt ? "Os melhores barbeiros de Luanda numa só app" : "The best barbers in Luanda in one app"}</li>
              </ul>
            </td></tr>
          </table>
        </td></tr>

        <!-- Divider -->
        <tr><td style="padding:0 40px;"><div style="height:1px;background:#2a2a2a;"></div></td></tr>

        <!-- Footer -->
        <tr><td align="center" style="padding:24px 40px;">
          <p style="margin:0 0 4px;font-size:12px;color:#444444;">
            ${pt
              ? "Recebeste este email porque te registaste na lista de espera."
              : "You received this because you signed up for the waitlist."
            }
          </p>
          <p style="margin:0;font-size:11px;color:#333333;">
            © ${new Date().getFullYear()} Na Via Cuts · Luanda, Angola 🇦🇴
          </p>
        </td></tr>

        <!-- Gold bottom bar -->
        <tr><td style="height:3px;background:linear-gradient(90deg,#8a6f2e,#c9a84c,#e8c97a,#c9a84c,#8a6f2e);"></td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function notificationHtml(email: string, lang: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="440" cellpadding="0" cellspacing="0" style="background:#111;border-radius:12px;border:1px solid #2a2a2a;max-width:440px;width:100%;overflow:hidden;">
        <tr><td style="height:3px;background:linear-gradient(90deg,#8a6f2e,#c9a84c,#e8c97a,#c9a84c,#8a6f2e);"></td></tr>
        <tr><td style="padding:28px 32px;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#c9a84c;text-transform:uppercase;font-weight:600;">
            Nova Inscrição · New Signup
          </p>
          <h2 style="margin:0 0 24px;font-size:20px;font-weight:700;letter-spacing:2px;color:#f4f0e8;">
            NA VIA CUTS WAITLIST
          </h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #1e1e1e;font-size:12px;color:#6b6b6b;width:38%;">Email</td>
              <td style="padding:8px 0;border-bottom:1px solid #1e1e1e;font-size:13px;color:#f4f0e8;font-weight:500;">${email}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #1e1e1e;font-size:12px;color:#6b6b6b;">Idioma / Lang</td>
              <td style="padding:8px 0;border-bottom:1px solid #1e1e1e;font-size:13px;color:#f4f0e8;font-weight:500;">${lang}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:12px;color:#6b6b6b;">Data / Date</td>
              <td style="padding:8px 0;font-size:13px;color:#f4f0e8;font-weight:500;">${new Date().toLocaleString("pt-AO", { timeZone: "Africa/Luanda" })}</td>
            </tr>
          </table>
        </td></tr>
        <tr><td style="height:3px;background:linear-gradient(90deg,#8a6f2e,#c9a84c,#e8c97a,#c9a84c,#8a6f2e);"></td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, preferred_lang } = body;

    // Validate
    if (!email?.trim()) {
      return NextResponse.json({ error: "email_required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }

    const lang: "pt" | "en" = preferred_lang === "en" ? "en" : "pt";
    const isPt = lang === "pt";

    // Send confirmation to customer
    const { error: confErr } = await resend.emails.send({
      from:    FROM,
      to:      [email.trim()],
      subject: isPt
        ? "✦ Estás na lista de espera da Na Via Cuts"
        : "✦ You're on the Na Via Cuts waitlist",
      html: confirmationHtml(email.trim(), lang),
    });

    if (confErr) {
      console.error("[Resend] Confirmation error:", confErr);
      return NextResponse.json({ error: "send_failed" }, { status: 500 });
    }

    // Send notification to admin (non-blocking — don't fail if this errors)
    if (NOTIFY) {
      resend.emails.send({
        from:    FROM,
        to:      [NOTIFY],
        subject: `🔔 Na Via Cuts waitlist — ${email.trim()}`,
        html:    notificationHtml(email.trim(), lang),
      }).catch((err) => console.error("[Resend] Notification error:", err));
    }

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("[API /waitlist] Error:", err);
    return NextResponse.json({ error: "unexpected_error" }, { status: 500 });
  }
}
