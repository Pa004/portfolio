"use client";

import { motion } from "framer-motion";
import { glass, glassBlue } from "@/lib/styles";
import { links } from "@/lib/content";

import SectionBackground from "@/components/ui/SectionBackground";
import RevealSection from "@/components/ui/RevealSection";
import GradientText from "@/components/ui/GradientText";
import { toast } from "sonner";

type Lang = "en" | "es";
interface ContactProps {
  lang: Lang;
}

const socialLinks = [
  {
    label: "GitHub",
    url: links.github,
    color: "var(--icon-github)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    url: links.linkedin,
    color: "#0a66c2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "ResearchGate",
    url: links.researchgate,
    color: "#00d0af",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a12.49 12.49 0 00-.35 2.444a12.49 12.49 0 00-.183 2.444c0 .66.097 1.276.294 1.846.195.571.476 1.063.843 1.476.365.41.806.73 1.32.958a4.16 4.16 0 001.686.342c.608 0 1.152-.107 1.633-.324.481-.217.886-.522 1.216-.917.329-.394.58-.868.752-1.42.172-.552.258-1.17.258-1.852 0-.66-.094-1.27-.282-1.826a4.34 4.34 0 00-.8-1.452 3.655 3.655 0 00-1.238-.952 3.694 3.694 0 00-1.617-.342zm-8.586 0C4.96 0 0 4.96 0 11.075c0 6.115 4.96 11.075 11.075 11.075 6.116 0 11.075-4.96 11.075-11.075 0-.047-.003-.093-.003-.14h-2.017c0 .047.003.093.003.14 0 4.996-4.062 9.058-9.058 9.058-4.997 0-9.058-4.062-9.058-9.058 0-4.997 4.061-9.058 9.058-9.058.827 0 1.626.112 2.386.32V.326A11.11 11.11 0 0011 0zm8.586 2.017c.357 0 .67.067.94.2.27.134.494.32.673.558.178.238.312.52.4.843.088.323.132.678.132 1.065 0 .388-.044.742-.132 1.063a2.698 2.698 0 01-.392.838 1.8 1.8 0 01-.648.552 1.93 1.93 0 01-.897.198 1.9 1.9 0 01-.876-.196 1.82 1.82 0 01-.64-.55 2.62 2.62 0 01-.392-.83 3.863 3.863 0 01-.133-1.04c0-.41.044-.78.133-1.107.089-.327.223-.607.4-.84.178-.233.398-.412.66-.538a2.04 2.04 0 01.772-.016zM11 5.538v2.017h2.444c.26.545.4 1.16.4 1.813 0 2.335-1.892 4.227-4.227 4.227-2.335 0-4.227-1.892-4.227-4.227 0-2.335 1.892-4.227 4.227-4.227.48 0 .942.08 1.383.227V5.538z" />
      </svg>
    ),
  },
  {
    label: "ORCID",
    url: links.orcid,
    color: "#a6ce39",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 01-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 3.872-2.412 3.872-3.722 0-2.016-1.284-3.722-3.872-3.722h-2.297z" />
      </svg>
    ),
  },
];

const content = {
  en: {
    label: "Contact",
    title: "Let's work together",
    subtitle:
      "I'm open to new opportunities, collaborations, and interesting projects. Feel free to reach out.",
    email_label: "Send me an email",
    email_desc: "Best way to reach me directly.",
    email_copy: "Click to copy",
    or: "or find me on",
    cta: "Send email",
    copied: "Email copied to clipboard!",
  },
  es: {
    label: "Contacto",
    title: "Trabajemos juntos",
    subtitle:
      "Estoy abierto a nuevas oportunidades, colaboraciones y proyectos interesantes. No dudes en escribirme.",
    email_label: "Envíame un email",
    email_desc: "La mejor manera de contactarme directamente.",
    email_copy: "Clic para copiar",
    or: "o encuéntrame en",
    cta: "Enviar email",
    copied: "¡Email copiado al portapapeles!",
  },
};

export default function Contact({ lang }: ContactProps) {
  const t = content[lang];

  const copyEmail = () => {
    navigator.clipboard.writeText(links.email);
    toast.success(t.copied);
  };

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        padding: "80px 24px 64px",
        overflow: "hidden",
      }}
    >
      <SectionBackground variant="waves" />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(to right, transparent, var(--accent), transparent)",
        }}
      />
      <div
        style={{
          maxWidth: "1152px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <RevealSection>
          <div style={{ marginBottom: "56px" }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "8px",
              }}
            >
              {t.label}
            </p>
            <h2
              style={{
                fontSize: "clamp(28px,4vw,36px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                marginBottom: "12px",
              }}
            >
              <GradientText>{t.title}</GradientText>
            </h2>
            <p
              style={{ fontSize: "14px", color: "var(--text-muted)", maxWidth: "28rem" }}
            >
              {t.subtitle}
            </p>
          </div>
        </RevealSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "32px",
            alignItems: "start",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              ...glassBlue,
              borderRadius: "16px",
              padding: "32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "160px",
                height: "160px",
                background:
                  "radial-gradient(circle, var(--glass-blue-bg) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  ...glass,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent)",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--text)",
                  }}
                >
                  {t.email_label}
                </p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  {t.email_desc}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={copyEmail}
              title={t.email_copy}
              aria-label={`${t.email_copy}: ${links.email}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                color: "var(--accent-text)",
                marginBottom: "24px",
                fontFamily: "monospace",
                cursor: "pointer",
                width: "fit-content",
                padding: "6px 10px",
                borderRadius: "6px",
                background: "var(--glass-blue-bg)",
                border: "0.5px solid var(--glass-blue-border)",
              }}
            >
              {links.email}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ opacity: 0.5, flexShrink: 0 }}
              >
                <path
                  strokeLinecap="round"
                  d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                />
              </svg>
            </button>

            <a
              href={`mailto:${links.email}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                borderRadius: "8px",
                background: "var(--accent)",
                  color: "var(--accent-btn-text)",
                fontSize: "13px",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
              {t.cta}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <p
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: "4px",
              }}
            >
              {t.or}
            </p>
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  ...glass,
                  borderRadius: "12px",
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                }}
              >
                <span style={{ color: social.color, flexShrink: 0 }}>
                  {social.icon}
                </span>
                <span style={{ fontSize: "14px", fontWeight: 500 }}>
                  {social.label}
                </span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ marginLeft: "auto", opacity: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
