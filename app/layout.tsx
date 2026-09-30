import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const SITE_URL = 'https://expo-deporte-2026.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Expo Deporte 2026 | El Evento Deportivo y Comercial Más Grande de Aragua',
  description:
    '27, 28 y 29 de Noviembre de 2026 en RedVital Intercomunal Maracay-Turmero. Carrera 10K, Caminata 5K Nocturna, más de 20 disciplinas deportivas y tarima cultural.',
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
    title: 'Expo Deporte 2026 | 27, 28 y 29 de Noviembre',
    description:
      'Inscríbete en la Carrera 10K y Caminata 5K Nocturna. RedVital Intercomunal Maracay-Turmero. Presentado por INADEMAR y Alcaldía de Santiago Mariño.',
    images: [
      {
        url: `${SITE_URL}/hero.jpeg`,
        secureUrl: `${SITE_URL}/hero.jpeg`,
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
      '27, 28 y 29 de Noviembre de 2026. Carrera 10K y Caminata 5K Nocturna en RedVital Turmero.',
    images: [`${SITE_URL}/hero.jpeg`],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0C1932',
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