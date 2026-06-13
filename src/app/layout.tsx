import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pablo Domínguez — Full Stack Developer",
  description:
    "Software Engineering student at ESPE. Building modern web experiences and intelligent systems.",
  keywords: [
    "Full Stack Developer", "Frontend", "React", "Next.js",
    "TypeScript", "AI", "Flutter", "Pablo Domínguez",
  ],
  authors: [{ name: "Pablo Domínguez" }],
  openGraph: {
    title: "Pablo Domínguez — Full Stack Developer",
    description:
      "Software Engineering student at ESPE. Building modern web experiences and intelligent systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}