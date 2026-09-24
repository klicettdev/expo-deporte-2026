import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const SITE_URL = 'https://expo-deporte-2026.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Expo Deporte 2026 | Santiago Mariño',
  description:
    'Inscríbete en la gran vitrina deportiva de Santiago Mariño. 13, 14 y 15 de noviembre de 2026 en el Estacionamiento Makro RedVital, Turmero. Carrera 10K, Caminata 5K Nocturna y torneos comunitarios.',
  applicationName: 'Expo Deporte 2026',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    url: SITE_URL,
    siteName: 'Expo Deporte 2026',
    title: 'Expo Deporte 2026 | Santiago Mariño',
    description:
      'Inscríbete en la gran vitrina deportiva de Santiago Mariño. 13, 14 y 15 de noviembre de 2026. Carrera 10K y Caminata 5K Nocturna.',
    images: [
      {
        url: `${SITE_URL}/logo.jpeg`,
        secureUrl: `${SITE_URL}/logo.jpeg`,
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Expo Deporte 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expo Deporte 2026 | Santiago Mariño',
    description:
      'Inscríbete en la gran vitrina deportiva de Santiago Mariño. Carrera 10K y Caminata 5K Nocturna.',
    images: [`${SITE_URL}/logo.jpeg`],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#071b3b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="bg-[#f6f8fb]">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}