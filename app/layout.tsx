import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Cursor from "@/components/layout/Cursor";
import Grain from "@/components/layout/Grain";
import HashRedirect from "@/components/layout/HashRedirect";
import { site } from "@/content/site";
import { JsonLd, organizationLd } from "@/lib/seo";

const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: video editing for founders, podcasts and Meta ads`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/Gold_BLACKFRAME_labs_logo.png" },
};

export const viewport: Viewport = { themeColor: "#0F0E0E", colorScheme: "dark" };

const adobeKit = process.env.NEXT_PUBLIC_ADOBE_FONTS_KIT;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plexMono.variable}>
      <head>
        {adobeKit && (
          <>
            <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
            <link rel="stylesheet" href={`https://use.typekit.net/${adobeKit}.css`} />
          </>
        )}
        <JsonLd data={organizationLd()} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] rounded-full bg-signal px-4 py-2 text-ink">
          Skip to content
        </a>
        <HashRedirect />
        <SmoothScroll />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Grain />
        <Cursor />
        <Analytics />
      </body>
    </html>
  );
}
