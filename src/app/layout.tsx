import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { UtilityBar } from '@/components/layout/UtilityBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RfqDrawer } from '@/components/layout/RfqDrawer';
import { RfqProvider } from '@/context/RfqContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DB Fine Chemicals | High-Purity Fine Chemicals, Solvents & APIs (South Africa)',
  description:
    'Premier South African distributor of high-purity fine chemicals, specialty industrial solvents, active pharmaceutical ingredients (APIs), and laboratory reagents. Direct Gauteng safety stock with 24–48h nationwide dispatch, instant batch COA downloads, and SAHPRA Section 22C licensing.',
  keywords: [
    'Fine Chemicals South Africa',
    'Chemical Distributor Johannesburg',
    'HPLC Solvents South Africa',
    'Pharma APIs SAHPRA',
    'Isopropanol 99.9% South Africa',
    'Ascorbic Acid USP Cape Town',
    'Certificate of Analysis COA Download',
    'SANS 10234 Safety Data Sheets',
    'Custom Solvent Blends Gauteng',
    'Laboratory Reagents AR Grade Durban',
  ],
  authors: [{ name: 'DB Fine Chemicals (Pty) Ltd' }],
  openGraph: {
    title: 'DB Fine Chemicals — South Africa B2B Chemical & API Distribution Portal',
    description:
      'Access batch-traceable raw materials from our Johannesburg safety stock with instant edge-served COAs, SANS 10234 SDS documentation, and rapid 24–48 hour nationwide fulfillment.',
    url: 'https://dbfine.co.za',
    siteName: 'DB Fine Chemicals',
    locale: 'en_ZA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Wholesaler',
    name: 'DB Fine Chemicals (Pty) Ltd',
    url: 'https://dbfine.co.za',
    logo: 'https://dbfine.co.za/assets/logo.svg',
    description:
      'Premier South African supplier and distributor of high-purity fine chemicals, specialty industrial solvents, pharmaceutical APIs, and laboratory reagents across South Africa.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '12 Refinery Road, Driehoek',
      addressLocality: 'Germiston, Johannesburg',
      addressRegion: 'Gauteng',
      postalCode: '1401',
      addressCountry: 'ZA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-26.2238',
      longitude: '28.1741',
    },
    telephone: '+27-11-824-1500',
    email: 'quotes@dbfine.co.za',
    areaServed: [
      'South Africa',
      'Gauteng',
      'Western Cape',
      'KwaZulu-Natal',
      'Eastern Cape',
      'Free State',
      'Mpumalanga',
      'Limpopo',
      'North West',
      'Northern Cape',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'South African Fine Chemicals & Solvents Catalog',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'High-Purity Specialty Solvents & Fine Chemicals',
            category: 'Chemical Distribution',
          },
        },
      ],
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white text-navy-950">
        <RfqProvider>
          <UtilityBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <RfqDrawer />
        </RfqProvider>
      </body>
    </html>
  );
}
