import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Na Via Cuts · Barbearia em Luanda",
  description:
    "A barbearia premium de Luanda. Marca o teu corte em segundos com a nossa app. Barbeiros de topo, horários flexíveis, Luanda Angola.",
  keywords: ["barbearia", "luanda", "angola", "corte de cabelo", "barbershop", "app"],
  authors: [{ name: "Na Via Cuts" }],
  openGraph: {
    title:       "Na Via Cuts · Barbearia em Luanda",
    description: "Marca o teu corte com a app Na Via Cuts. Disponível no iOS e Android.",
    type:        "website",
    locale:      "pt_AO",
    siteName:    "Na Via Cuts",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Na Via Cuts · Barbearia em Luanda",
    description: "Marca o teu corte com a app Na Via Cuts.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width:      "device-width",
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
