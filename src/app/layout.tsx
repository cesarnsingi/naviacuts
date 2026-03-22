import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Na Via Cuts · Barbearia em Luanda",
  description:
    "A barbearia premium de Luanda. Marca o teu corte em segundos com a nossa app. Barbeiros de topo, horários flexíveis, Luanda Angola.",
  keywords: ["barbearia", "luanda", "angola", "corte de cabelo", "barbershop", "app"],
  authors: [{ name: "Na Via Cuts" }],

  // ── Favicons ────────────────────────────────────────────────────────────────
  // Place these files in your /public folder:
  //   favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png
  // Generate them at: https://realfavicongenerator.net
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico",       sizes: "any"                        },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  // ── Open Graph (social share preview) ───────────────────────────────────────
  openGraph: {
    title:       "Na Via Cuts · Barbearia em Luanda",
    description: "Marca o teu corte com a app Na Via Cuts. Disponível no iOS e Android.",
    type:        "website",
    locale:      "pt_AO",
    siteName:    "Na Via Cuts",
    url:         "https://www.naviacuts.com",
    images: [
      {
        url:    "/og-image.png", // create a 1200×630 image and put it in /public
        width:  1200,
        height: 630,
        alt:    "Na Via Cuts — Barbearia Digital · Luanda",
      },
    ],
  },

  // ── Twitter / X card ────────────────────────────────────────────────────────
  twitter: {
    card:        "summary_large_image",
    title:       "Na Via Cuts · Barbearia em Luanda",
    description: "Marca o teu corte com a app Na Via Cuts.",
    images:      ["/og-image.png"],
  },

  robots:   { index: true, follow: true },
  metadataBase: new URL("https://www.naviacuts.com"),
};

export const viewport: Viewport = {
  themeColor:   "#0a0a0a",  // makes the browser chrome black on mobile
  width:        "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain bg-ink text-cream antialiased">
        {children}
      </body>
    </html>
  );
}
