import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://expodeporte2026.vercel.app'
  ),
  title: 'Expo Deporte 2026 | Santiago Mariño',
  description:
    'Inscríbete en la gran vitrina deportiva de Santiago Mariño. 13, 14 y 15 de noviembre de 2026 en el Estacionamiento Makro RedVital, Turmero. Carrera 10K, Caminata 5K Nocturna, torneos comunales y tarima cultural.',
  applicationName: 'Expo Deporte 2026',
  authors: [{ name: 'Alcaldía Bolivariana de Santiago Mariño e INADEMAR' }],
  keywords: [
    'Expo Deporte 2026',
    'Carrera 10K Turmero',
    'Caminata 5K Nocturna',
    'Santiago Mariño',
    'INADEMAR',
    'Aragua Deporte',
    'Makro RedVital'
  ],
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    url: '/',
    siteName: 'Expo Deporte 2026 — Santiago Mariño',
    title: 'Expo Deporte 2026 | El Deporte Nos Mueve',
    description:
      'Asegura tu lugar en la Carrera 10K Competitiva o la Caminata 5K Nocturna. Evento arancelado con premiación en metálico y kits oficiales.',
    images: [
      {
        url: '/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Afiche y Presentación Oficial de Expo Deporte 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expo Deporte 2026 | Santiago Mariño',
    description:
      'Inscríbete en la gran vitrina deportiva de Santiago Mariño: Carrera 10K, Caminata 5K Nocturna y 32 horas de actividades comunitarias.',
    images: ['/logo.jpeg'],
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