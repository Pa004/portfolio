import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://portfolio-ochre-xi-ba44zo6k9y.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Pablo Domínguez — Full Stack Developer",
  description: "Software Engineering student at ESPE. Building modern web experiences and intelligent systems.",
  keywords: ["Full Stack Developer", "Frontend", "React", "Next.js", "TypeScript", "AI", "Flutter", "Pablo Domínguez"],
  authors: [{ name: "Pablo Domínguez" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Pablo Domínguez — Full Stack Developer",
    description: "Software Engineering student at ESPE. Building modern web experiences and intelligent systems.",
    type: "website",
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pablo Domínguez — Full Stack Developer",
    description: "Software Engineering student at ESPE. Building modern web experiences and intelligent systems.",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <LoadingScreen />
        <NoiseOverlay />
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />
        <BackToTop />
        <ConsoleEasterEgg />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Pablo Domínguez",
              url: SITE_URL,
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