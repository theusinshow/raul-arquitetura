import type { Metadata } from "next";
import { Urbanist, Fragment_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s — ${site.shortName}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${urbanist.variable} ${fragmentMono.variable}`}
    >
      <body className="min-h-dvh bg-paper text-ink antialiased">
        <SmoothScroll>
          <a
            href="#conteudo"
            className="mono sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
          >
            Pular para o conteúdo
          </a>
          <Navbar />
          <div id="conteudo">{children}</div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
