import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import GlobalLayoutWrapper from "@/components/GlobalLayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spesialis Biled Projector | Ultimate Autoshop Semarang",
  description: "Ultimate Autoshop Semarang - Bengkel spesialis lampu mobil terpercaya sejak 2012. Pemasangan Projector Biled, Headlamp, Foglamp. Konsultasi gratis!",
  keywords: "bengkel lampu mobil, projector biled, headlamp, semarang, modifikasi lampu",
  icons: {
    icon: [
      { url: "/images/logo2.png", type: "image/png" },
    ],
    apple: "/images/logo2.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://ultimateautoshopindonesia.com",
    siteName: "Ultimate Autoshop Semarang",
    title: "Spesialis Biled Projector | Ultimate Autoshop Semarang",
    description: "Bengkel spesialis lampu mobil terpercaya sejak 2012. Pemasangan Projector Biled, Headlamp, Foglamp. Konsultasi gratis!",
    images: [
      {
        url: "/images/coveru.jpg",
        width: 1200,
        height: 630,
        alt: "Ultimate Autoshop Semarang - Spesialis Lampu Mobil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spesialis Biled Projector | Ultimate Autoshop Semarang",
    description: "Bengkel spesialis lampu mobil terpercaya sejak 2012",
    images: ["/images/coveru.jpg"],
  },
  verification: {
    google: "v5yZymw3qjoB0l41McuD6BcRXfLGn48i0s3_X3_PPuY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XQF86CGVFP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XQF86CGVFP');
          `}
        </Script>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KV8CLC6H');
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KV8CLC6H"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <div id="main-wrapper">
          <GlobalLayoutWrapper>{children}</GlobalLayoutWrapper>
        </div>
      </body>
    </html>
  );
}
