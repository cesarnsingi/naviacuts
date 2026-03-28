import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = process.env.FROM_EMAIL   ?? "Na Via Cuts <onboarding@resend.dev>";
const NOTIFY = process.env.NOTIFY_EMAIL ?? "";

const barberLabels: Record<string, { pt: string; en: string }> = {
  mario:  { pt: "Mário Lopes — Degradês & Fades",       en: "Mário Lopes — Fades & Tapers"      },
  kadu:   { pt: "Kadu Faria — Lineups & Designs",       en: "Kadu Faria — Lineups & Designs"    },
  zeca:   { pt: "Zeca Mateus — Cortes Clássicos",       en: "Zeca Mateus — Classic Cuts"        },
  tiago:  { pt: "Tiago Baptista — Cabelo Encaracolado", en: "Tiago Baptista — Curly & Textured" },
};

const serviceLabels: Record<string, { pt: string; en: string }> = {
  corte: { pt: "Corte — 2.500 Kz",              en: "Haircut — 2,500 Kz"          },
  fade:  { pt: "Degradê — 3.000 Kz",             en: "Fade — 3,000 Kz"             },
  barba: { pt: "Barba — 2.000 Kz",               en: "Beard — 2,000 Kz"            },
  combo: { pt: "Combo Corte + Barba — 4.500 Kz", en: "Combo Cut + Beard — 4,500 Kz"},
  kids:  { pt: "Corte Infantil — 1.800 Kz",      en: "Kids Cut — 1,800 Kz"         },
};

// ── Customer confirmation email ───────────────────────────────────────────────

function confirmationHtml(data: {
  name: string; email: string; phone: string;
  barber: string; service: string; date: string; time: string;
}, lang: "pt" | "en"): string {
  const pt          = lang === "pt";
  const barberLabel = barberLabels[data.barber]?.[lang] ?? data.barber;
  const svcLabel    = serviceLabels[data.service]?.[lang] ?? data.service;

  const rows = pt
    ? [["Barbeiro", barberLabel], ["Serviço", svcLabel], ["Data", data.date], ["Hora", data.time], ["Telemóvel", data.phone]]
    : [["Barber",  barberLabel], ["Service", svcLabel], ["Date", data.date], ["Time", data.time], ["Phone",     data.phone]];

  return `<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#111111;border-radius:16px;border:1px solid #2a2a2a;overflow:hidden;max-width:520px;width:100%;">

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

        <tr><td style="padding:0 40px;"><div style="height:1px;background:#2a2a2a;"></div></td></tr>

        <!-- Body -->
        <tr><td style="padding:36px 40px;">
          <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;color:#c9a84c;text-transform:uppercase;font-weight:600;">
            ${pt ? "Pedido de Marcação Recebido" : "Booking Request Received"}
          </p>
          <h1 style="margin:0 0 20px;font-size:28px;font-weight:700;letter-spacing:2px;color:#f4f0e8;line-height:1.2;">
            ${pt ? `Olá ${data.name}! ✦` : `Hey ${data.name}! ✦`}
          </h1>
          <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#9a9a9a;font-weight:300;">
            ${pt
              ? "Recebemos o teu pedido de marcação na <strong style=\"color:#f4f0e8;\">Na Via Cuts</strong>. Vamos confirmar disponibilidade e entrar em contacto contigo em breve pelo telemóvel."
              : "We received your booking request at <strong style=\"color:#f4f0e8;\">Na Via Cuts</strong>. We'll confirm availability and get in touch with you shortly by phone."
            }
          </p>

          <!-- Booking summary -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1500;border:1px solid #c9a84c;border-radius:12px;overflow:hidden;">
            <tr><td style="padding:16px 20px 12px;">
              <p style="margin:0;font-size:11px;letter-spacing:2px;color:#c9a84c;text-transform:uppercase;font-weight:600;">
                ${pt ? "Resumo da Marcação" : "Booking Summary"}
              </p>
            </td></tr>
            ${rows.map(([label, value]) => `
            <tr>
              <td style="padding:10px 20px;border-top:1px solid #2a2a2a;font-size:12px;color:#6b6b6b;width:38%;">${label}</td>
              <td style="padding:10px 20px;border-top:1px solid #2a2a2a;font-size:13px;color:#f4f0e8;font-weight:500;">${value}</td>
            </tr>`).join("")}
            <tr><td colspan="2" style="padding:14px 20px;border-top:1px solid #2a2a2a;background:#111;">
              <p style="margin:0;font-size:12px;color:#6b6b6b;line-height:1.6;">
                ⚠️ ${pt
                  ? "Este pedido ainda não está confirmado. Confirmaremos disponibilidade e contactar-te-emos pelo telemóvel em até 2 horas."
                  : "This request is not yet confirmed. We'll check availability and contact you by phone within 2 hours."
                }
              </p>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:0 40px;"><div style="height:1px;background:#2a2a2a;"></div></td></tr>

        <!-- Footer -->
        <tr><td align="center" style="padding:24px 40px;">
          <p style="margin:0 0 4px;font-size:12px;color:#444444;">
            ${pt
              ? "Recebeste este email porque fizeste um pedido de marcação."
              : "You received this because you submitted a booking request."
            }
          </p>
          <p style="margin:0;font-size:11px;color:#333333;">
            © ${new Date().getFullYear()} Na Via Cuts · Luanda, Angola 🇦🇴
          </p>
        </td></tr>

        <tr><td style="height:3px;background:linear-gradient(90deg,#8a6f2e,#c9a84c,#e8c97a,#c9a84c,#8a6f2e);"></td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Admin notification email ──────────────────────────────────────────────────

function notificationHtml(data: {
  name: string; email: string; phone: string;
  barber: string; service: string; date: string; time: string; lang: string;
}): string {
  const barberLabel = barberLabels[data.barber]?.pt ?? data.barber;
  const svcLabel    = serviceLabels[data.service]?.pt ?? data.service;

  const rows = [
    ["Nome / Name",        data.name],
    ["Email",              data.email],
    ["Telemóvel / Phone",  data.phone],
    ["Barbeiro / Barber",  barberLabel],
    ["Serviço / Service",  svcLabel],
    ["Data / Date",        data.date],
    ["Hora / Time",        data.time],
    ["Idioma / Lang",      data.lang],
    ["Recebido / Received", new Date().toLocaleString("pt-AO", { timeZone: "Africa/Luanda" })],
  ];

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#111;border-radius:12px;border:1px solid #2a2a2a;max-width:480px;width:100%;overflow:hidden;">
        <tr><td style="height:3px;background:linear-gradient(90deg,#8a6f2e,#c9a84c,#e8c97a,#c9a84c,#8a6f2e);"></td></tr>
        <tr><td style="padding:28px 32px;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#c9a84c;text-transform:uppercase;font-weight:600;">
            🔔 Nova Marcação · New Booking
          </p>
          <h2 style="margin:0 0 24px;font-size:20px;font-weight:700;letter-spacing:2px;color:#f4f0e8;">
            NA VIA CUTS
          </h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${rows.map(([label, value]) => `
            <tr>
              <td style="padding:9px 0;border-bottom:1px solid #1e1e1e;font-size:12px;color:#6b6b6b;width:42%;">${label}</td>
              <td style="padding:9px 0;border-bottom:1px solid #1e1e1e;font-size:13px;color:#f4f0e8;font-weight:500;">${value}</td>
            </tr>`).join("")}
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
    const { name, email, phone, barber, service, date, time, preferred_lang } = body;

    // Validate
    if (!name?.trim())    return NextResponse.json({ error: "name_required"    }, { status: 400 });
    if (!email?.trim())   return NextResponse.json({ error: "email_required"   }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                          return NextResponse.json({ error: "invalid_email"    }, { status: 400 });
    if (!phone?.trim())   return NextResponse.json({ error: "phone_required"   }, { status: 400 });
    if (!barber?.trim())  return NextResponse.json({ error: "barber_required"  }, { status: 400 });
    if (!service?.trim()) return NextResponse.json({ error: "service_required" }, { status: 400 });
    if (!date?.trim())    return NextResponse.json({ error: "date_required"    }, { status: 400 });
    if (!time?.trim())    return NextResponse.json({ error: "time_required"    }, { status: 400 });

    const lang: "pt" | "en" = preferred_lang === "en" ? "en" : "pt";
    const isPt = lang === "pt";

    // 1. Send confirmation to customer
    const { error: confErr } = await resend.emails.send({
      from:    FROM,
      to:      [email.trim()],
      subject: isPt
        ? `✦ Pedido de marcação recebido — Na Via Cuts`
        : `✦ Booking request received — Na Via Cuts`,
      html: confirmationHtml(
        { name: name.trim(), email: email.trim(), phone: phone.trim(), barber, service, date, time },
        lang
      ),
    });

    if (confErr) {
      console.error("[Resend] Customer confirmation error:", confErr);
      return NextResponse.json({ error: "send_failed" }, { status: 500 });
    }

    // 2. Send notification to admin (non-blocking)
    if (NOTIFY) {
      resend.emails.send({
        from:    FROM,
        to:      [NOTIFY],
        subject: `🔔 Nova marcação: ${name.trim()} — ${date} às ${time}`,
        html:    notificationHtml({
          name: name.trim(), email: email.trim(), phone: phone.trim(),
          barber, service, date, time, lang,
        }),
      }).catch((err) => console.error("[Resend] Admin notification error:", err));
    }

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("[API /booking] Error:", err);
    return NextResponse.json({ error: "unexpected_error" }, { status: 500 });
  }
}
