import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, Outfit } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { portfolio } from "@/data/portfolio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const fontVariables = `${geistSans.variable} ${geistMono.variable} ${syne.variable} ${outfit.variable}`;



const title = `${portfolio.person.name} — ${portfolio.person.role}`;
const description = portfolio.person.statement;

export const metadata: Metadata = {
  metadataBase: new URL("https://anandkumar.dev"),
  title: {
    default: title,
    template: `%s — ${portfolio.person.name}`,
  },
  description,
  applicationName: portfolio.person.name,
  authors: [{ name: portfolio.person.name }],
  keywords: [
    "Anand Kumar",
    "Software Engineer",
    "Backend",
    "UPI",
    "Navi",
    "IIT Bombay",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_IN",
    siteName: portfolio.person.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="dark"
      className={`${fontVariables} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("ak-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`,
          }}
        />
      </head>
      <body className="min-h-full bg-bg font-sans text-text">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
