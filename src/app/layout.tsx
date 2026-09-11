import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Cinzel, Montserrat } from "next/font/google";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Preloader } from "@/components/preloader";
import { PreloaderProvider } from "@/lib/preloader-context";
import { ThemeProvider } from "@/components/theme-provider";
import { NoiseOverlay } from "@/components/noise-overlay";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Footer = dynamic(() => import("@/components/footer").then((m) => m.Footer));
// Fica invisível (opacity/y transformados) até o usuário rolar pra cima —
// não faz parte do primeiro paint, então não precisa bloquear o bundle inicial.
const Navbar = dynamic(() => import("@/components/navbar").then((m) => m.Navbar));

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bárbara Branches | Beleza, Ciência e Harmonia",
    template: "%s | Bárbara Branches",
  },
  description:
    "Clínica de estética Bárbara Branches: tratamentos personalizados que unem ciência e cuidado para realçar sua beleza natural.",
  openGraph: {
    title: "Bárbara Branches | Beleza, Ciência e Harmonia",
    description:
      "Clínica de estética Bárbara Branches: tratamentos personalizados que unem ciência e cuidado para realçar sua beleza natural.",
    url: siteUrl,
    siteName: "Bárbara Branches",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${cinzel.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <NoiseOverlay />
        <ThemeProvider>
          <PreloaderProvider>
            <Preloader />
            <Navbar />
            <SmoothScrollProvider>
              {children}
              <Footer />
            </SmoothScrollProvider>
          </PreloaderProvider>
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
