import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import BackToTop from "@/components/ui/BackToTop";
import ConsoleEasterEgg from "@/components/ui/ConsoleEasterEgg";
import LoadingScreen from "@/components/ui/LoadingScreen";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import ThemeColor from "@/components/ui/ThemeColor";
import { Toaster } from "sonner";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Pablo Domínguez — Full Stack Developer",
  description: "Software Engineering student at ESPE. Building modern web experiences and intelligent systems.",
  keywords: ["Full Stack Developer", "Frontend", "React", "Next.js", "TypeScript", "AI", "Flutter", "Pablo Domínguez"],
  authors: [{ name: "Pablo Domínguez" }],
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "/",
      en: "/",
      es: "/",
    },
  },
  openGraph: {
    title: "Pablo Domínguez — Full Stack Developer",
    description: "Software Engineering student at ESPE. Building modern web experiences and intelligent systems.",
    type: "website",
    url: "/",
    locale: "es_ES",
    alternateLocale: ["en_US"],
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pablo Domínguez — Full Stack Developer",
    description: "Software Engineering student at ESPE. Building modern web experiences and intelligent systems.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("portfolio-theme");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark")}catch(e){document.documentElement.setAttribute("data-theme","dark")}})()`,
          }}
        />
        <LoadingScreen />
        <NoiseOverlay />
        <ThemeColor />
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />
        <BackToTop />
        <ConsoleEasterEgg />
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "rgba(9,9,11,0.95)",
              border: "0.5px solid rgba(59,130,246,0.3)",
              color: "#f4f4f5",
            },
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Pablo Domínguez",
              url: SITE_URL,
              image: `${SITE_URL}/opengraph-image`,
              description: "Software Engineering student at ESPE. Building modern web experiences and intelligent systems.",
              jobTitle: "Full Stack Developer",
              worksFor: {
                "@type": "EducationalOrganization",
                name: "Universidad de las Fuerzas Armadas ESPE",
              },
              sameAs: [
                "https://github.com/Pa004",
                "https://www.linkedin.com/in/pabl004-dev",
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}