'use client'

import { useState } from 'react'
import {
  ExternalLink,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  Trophy,
  Footprints,
  Swords,
  Dumbbell,
  HeartPulse,
  Bike,
  Activity,
  Award,
  Music,
  UtensilsCrossed,
  Smile,
  ShieldCheck,
  Shirt,
  Medal,
  Compass,
  Maximize2
} from 'lucide-react'
import { useBCVRate } from '@/hooks/useBCVRate'
import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { ActivitySchedule } from '@/components/ActivitySchedule'
import { RegistrationForm, paidActivities } from '@/components/RegistrationForm'
import { AdminPanel } from '@/components/AdminPanel'
import { SportsBackground } from '@/components/SportsBackground'
import { Footer } from '@/components/Footer'

const assets = {
  hero: '/hero.jpeg',
  date: '/date.jpeg',
  ubication: '/ubication.jpeg',
  description: '/description.jpeg',
  info: '/info.jpeg',
  expo: '/logo.jpeg',
  video: '/video.mp4',
  camisa: '/camisa.jpeg',
  camiseta: '/camiseta.jpeg',
  medalla: '/medalla.jpeg',
  plano: '/plano.jpeg',
  vortice: '/vortice.jpeg',
  inademar: '/Inademar.jpeg',
}

// 12 Módulos oficiales de "+20 Disciplinas en un Solo Lugar"
const venueModules = [
  {
    icon: Trophy,
    title: '+20 Disciplinas',
    subtitle: 'Deportivas en simultáneo',
    badge: 'Central',
    accent: 'border-[#FA8D1E] text-[#FA8D1E]',
  },
  {
    icon: Footprints,
    title: 'Carrera 10K & Caminata 5K',
    subtitle: 'Eventos centrales arancelados',
    badge: 'Kits & Premios',
    accent: 'border-[#22A84A] text-[#22A84A]',
  },
  {
    icon: Swords,
    title: 'Gran Tarde de Combate',
    subtitle: 'Festival boxístico & tatami',
    badge: 'Exhibición',
    accent: 'border-[#4169E2] text-[#4169E2]',
  },
  {
    icon: Dumbbell,
    title: 'Torneos Octagonales',
    subtitle: 'Fútbol Sala, Vóley y Basket',
    badge: 'Relámpago',
    accent: 'border-[#CEA554] text-[#CEA554]',
  },
  {
    icon: HeartPulse,
    title: 'Maratón de Bailoterapia',
    subtitle: 'Fitness, Tae Tek y Yoga masivo',
    badge: 'Salud',
    accent: 'border-[#22A84A] text-[#22A84A]',
  },
  {
    icon: Bike,
    title: 'Rodada Ciclista Regional',
    subtitle: 'Circuito urbano y patinetada',
    badge: 'Ruedas',
    accent: 'border-[#FA8D1E] text-[#FA8D1E]',
  },
  {
    icon: Activity,
    title: 'Exhibiciones Marciales',
    subtitle: 'Demostraciones de Karate y Judo',
    badge: 'Tatami',
    accent: 'border-[#4169E2] text-[#4169E2]',
  },
  {
    icon: Award,
    title: 'Deportes de Mesa',
    subtitle: 'Dominó y Festival de Ajedrez',
    badge: 'Estrategia',
    accent: 'border-[#CEA554] text-[#CEA554]',
  },
  {
    icon: Sparkles,
    title: 'Tarima Principal 15x15m',
    subtitle: 'Estructura de concierto masivo',
    badge: 'Show Central',
    accent: 'border-[#FA8D1E] text-[#FA8D1E]',
  },
  {
    icon: Music,
    title: 'Animación & DJ Set',
    subtitle: 'Ambiente musical permanente',
    badge: '32 Horas',
    accent: 'border-[#4169E2] text-[#4169E2]',
  },
  {
    icon: UtensilsCrossed,
    title: 'Feria Gastronómica',
    subtitle: 'Food trucks y stands de hidratación',
    badge: 'Comercial',
    accent: 'border-[#CEA554] text-[#CEA554]',
  },
  {
    icon: Smile,
    title: 'Zona Infantil Activa',
    subtitle: 'Recreación familiar segura',
    badge: 'Comunidad',
    accent: 'border-[#22A84A] text-[#22A84A]',
  },
]

export default function Page() {
  const [section, setSection] = useState<'home' | 'admin'>('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState(paidActivities[0].name)

  const { rate, loading: rateLoading } = useBCVRate()

  return (
    <div className="relative min-h-screen bg-[#f6f8fb] text-[#0C1932]">
      <SportsBackground />

      <div className="relative z-10">
        <Header
          section={section}
          setSection={setSection}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          expoLogo={assets.expo}
        />

        {section === 'admin' ? (
          <AdminPanel onBack={() => setSection('home')} />
        ) : (
          <main>
            <HeroSection heroImg={assets.hero} />

            {/* MARQUEE DINÁMICO */}
            <section className="marquee bg-[#0C1932] text-white py-3.5 border-y border-[#4169E2]/20">
              <div className="text-xs sm:text-sm font-black uppercase tracking-widest text-slate-200">
                +20 DISCIPLINAS <span className="text-[#FA8D1E]">•</span> SANTIAGO MARIÑO <span className="text-[#22A84A]">•</span> 27, 28 Y 29 DE NOVIEMBRE <span className="text-[#4169E2]">•</span> 09:00 A 18:00 HRS <span className="text-[#CEA554]">•</span> REDVITAL TURMERO <span className="text-[#FA8D1E]">•</span> INADEMAR <span className="text-[#22A84A]">•</span>
              </div>
            </section>

            {/* SECCIÓN 1: INDUMENTARIA OFICIAL & MEDALLA */}
            <section id="indumentaria" className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#FA8D1E]">
                  Kits Oficiales de Competencia
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-[#0C1932] mt-1 tracking-tight">
                  Indumentaria & <span className="text-[#22A84A]">Medalla Oficial</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#53627a] mt-2">
                  Diseño exclusivo de alto rendimiento con reflectivo nocturno y medalla conmemorativa entregada en meta.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                {/* Franela Caminata */}
                <div className="rounded-4xl bg-white border border-[#e2e8f0] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-[#22A84A]/10 text-[#22A84A] mb-4">
                      <Shirt className="w-3.5 h-3.5" /> Caminata 5K ($20)
                    </span>
                    <div className="rounded-2xl overflow-hidden bg-[#f6f8fb] mb-4 aspect-square flex items-center justify-center border border-[#e2e8f0]">
                      <img
                        src={assets.camisa}
                        alt="Franela oficial de la Caminata 5K"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-base font-black text-[#0C1932]">Franela con Reflectivo</h3>
                  </div>
                  <p className="text-xs text-[#53627a] mt-2 leading-relaxed">
                    Diseño especial con material reflectivo de alta visibilidad para la caminata familiar nocturna.
                  </p>
                </div>

                {/* Camiseta Carrera */}
                <div className="rounded-4xl bg-white border border-[#e2e8f0] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-[#FA8D1E]/10 text-[#FA8D1E] mb-4">
                      <Shirt className="w-3.5 h-3.5" /> Carrera 10K ($30)
                    </span>
                    <div className="rounded-2xl overflow-hidden bg-[#f6f8fb] mb-4 aspect-square flex items-center justify-center border border-[#e2e8f0]">
                      <img
                        src={assets.camiseta}
                        alt="Camiseta oficial de la Carrera 10K"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-base font-black text-[#0C1932]">Camiseta Técnica 10K</h3>
                  </div>
                  <p className="text-xs text-[#53627a] mt-2 leading-relaxed">
                    Tejido ultraligero y transpirable de grado competitivo para máxima comodidad en los 10 kilómetros.
                  </p>
                </div>

                {/* Medalla Oficial */}
                <div className="rounded-4xl bg-white border border-[#e2e8f0] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-[#CEA554]/15 text-[#CEA554] mb-4">
                      <Medal className="w-3.5 h-3.5" /> Conmemorativa Oficial
                    </span>
                    <div className="rounded-2xl overflow-hidden bg-[#f6f8fb] mb-4 aspect-square flex items-center justify-center border border-[#e2e8f0]">
                      <img
                        src={assets.medalla}
                        alt="Medalla Oficial Expo Deporte 2026"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-base font-black text-[#0C1932]">Medalla de Atleta</h3>
                  </div>
                  <p className="text-xs text-[#53627a] mt-2 leading-relaxed">
                    Medalla maciza troquelada con cinta personalizada otorgada al cruzar la línea de meta oficial.
                  </p>
                </div>
              </div>
            </section>

            {/* SECCIÓN PLANO GENERAL DEL RECINTO */}
            <section id="plano" className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-16">
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#4169E2]">
                  Distribución Espacial
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-[#0C1932] mt-1 tracking-tight">
                  Plano General <span className="text-[#FA8D1E]">del Recinto</span>
                </h2>
              </div>

              <div className="w-full flex justify-center">
                <img
                  src={assets.plano}
                  alt="Plano General del Recinto Expo Deporte 2026"
                  className="w-full h-auto max-h-187 object-contain rounded-4xl"
                />
              </div>
            </section>
            {/* SECCIÓN VIDEO OFICIAL */}
            <section className="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
              <div className="rounded-[36px] overflow-hidden bg-[#0C1932] border-2 border-[#4169E2]/25 shadow-2xl p-6 sm:p-12 relative">
                <div className="max-w-3xl mb-8">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#FA8D1E]/15 border border-[#FA8D1E]/30 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-[#FA8D1E] mb-3">
                    <Sparkles className="w-3.5 h-3.5" /> Presentación Oficial
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                    El Movimiento <span className="text-[#22A84A]">Nos Define</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                    Visualiza cómo convergen la competencia de alto nivel, la masificación comunitaria y la gran feria comercial en el estacionamiento principal de RedVital.
                  </p>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black/80 border border-white/10 group">
                  <video
                    controls
                    preload="metadata"
                    poster={assets.hero}
                    className="w-full h-full object-cover"
                  >
                    <source src={assets.video} type="video/mp4" />
                    Tu navegador no soporta la reproducción de video.
                  </video>
                </div>
              </div>
            </section>

            {/* CRONOGRAMA Y ACTIVIDADES DEPORTIVAS */}
            <ActivitySchedule
              onSelectModalidad={(name) => {
                if (name === 'Carrera 10K' || name === 'Caminata 5k Nocturna') {
                  setSelectedActivity(name)
                }
              }}
            />

            {/* TODO EN UN SOLO LUGAR (DISEÑO UI COMPLETO Y NATIVO) */}
            <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
              <div className="rounded-[36px] bg-white border border-[#e2e8f0] p-6 sm:p-12 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-8 mb-8 border-b border-[#e2e8f0]">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-widest text-[#22A84A]">
                      Plataforma Deportiva Integral
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-[#0C1932] mt-1 tracking-tight">
                      Todo en un <span className="text-[#FA8D1E]">Solo Lugar</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#53627a] mt-2 max-w-xl leading-relaxed">
                      Estructura técnica de 32 horas ininterrumpidas distribuida en módulos de exhibición, competencia comunitaria y esparcimiento familiar.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0C1932] text-white">
                      <Clock className="w-3.5 h-3.5 text-[#CEA554]" /> 09:00 - 18:00 HRS
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#22A84A]/10 text-[#22A84A] border border-[#22A84A]/25">
                      <ShieldCheck className="w-3.5 h-3.5" /> Seguridad Garantizada
                    </span>
                  </div>
                </div>

                {/* Grid 12 Tarjetas nativas con diseño del afiche oficial */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                  {venueModules.map((mod, index) => {
                    const Icon = mod.icon
                    return (
                      <div
                        key={index}
                        className="rounded-2xl border border-[#e2e8f0] hover:border-[#4169E2]/50 p-4 sm:p-5 bg-[#f6f8fb]/60 hover:bg-white transition-all shadow-xs hover:shadow-md flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="w-10 h-10 rounded-xl bg-white border border-[#e2e8f0] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                              <Icon className={`w-5 h-5 ${mod.accent}`} />
                            </span>
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-white border border-[#e2e8f0] text-[#53627a]">
                              {mod.badge}
                            </span>
                          </div>
                          <h3 className="text-sm font-black text-[#0C1932] leading-snug">
                            {mod.title}
                          </h3>
                        </div>
                        <p className="text-[11px] text-[#53627a] mt-2 font-medium leading-tight">
                          {mod.subtitle}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* FORMULARIO DE INSCRIPCIÓN */}
            <RegistrationForm
              selected={selectedActivity}
              setSelected={setSelectedActivity}
              rate={rate}
              rateLoading={rateLoading}
            />

            {/* UBICACIÓN Y FECHAS OFICIALES */}
            <section id="ubicacion" className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#FA8D1E]">
                  Coordenadas del Evento
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-[#0C1932] mt-1 tracking-tight">
                  Ubicación & <span className="text-[#22A84A]">Fechas Oficiales</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#53627a] mt-2">
                  RedVital Intercomunal Maracay-Turmero. Estacionamiento principal preparado con logística técnica de alto impacto.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <div className="rounded-4xl overflow-hidden bg-white border border-[#e2e8f0] shadow-sm flex flex-col justify-between p-6 sm:p-7 hover:shadow-md transition-shadow">
                  <div className="rounded-2xl overflow-hidden bg-[#f6f8fb] mb-5 border border-[#e2e8f0]">
                    <img
                      src={assets.date}
                      alt="Fechas Oficiales 27, 28 y 29 de Noviembre"
                      className="w-full h-auto object-contain max-h-95 mx-auto block"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f0]">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="h-5 w-5 text-[#FA8D1E]" />
                      <strong className="text-xs sm:text-sm font-black text-[#0C1932]">27, 28 y 29 de Noviembre 2026</strong>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase">3 Días</span>
                  </div>
                </div>

                <div className="rounded-4xl overflow-hidden bg-white border border-[#e2e8f0] shadow-sm flex flex-col justify-between p-6 sm:p-7 hover:shadow-md transition-shadow">
                  <div className="rounded-2xl overflow-hidden bg-[#f6f8fb] mb-5 border border-[#e2e8f0]">
                    <img
                      src={assets.ubication}
                      alt="Ubicación RedVital Intercomunal Turmero"
                      className="w-full h-auto object-contain max-h-95 mx-auto block"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#e2e8f0]">
                    <div className="flex items-center gap-2.5">
                      <MapPin className="h-5 w-5 text-[#22A84A]" />
                      <span className="text-xs sm:text-sm font-black text-[#0C1932]">RedVital Intercomunal Turmero</span>
                    </div>
                    <a
                      className="text-xs font-bold text-[#FA8D1E] hover:text-[#e07b14] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      href="https://maps.google.com/?q=Makro+RedVital+Turmero"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Abrir en Google Maps <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <Footer/>
          </main>
        )}
      </div>
    </div>
  )
}