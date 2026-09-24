'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { useBCVRate } from '@/hooks/useBCVRate'
import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { ActivitySchedule } from '@/components/ActivitySchedule'
import { RegistrationForm, paidActivities } from '@/components/RegistrationForm'
import { AdminPanel } from '@/components/AdminPanel'
import { SportsBackground } from '@/components/SportsBackground'
import { Footer } from '@/components/Footer'

const assets = {
  hero: 'flyer.jpg',
  expo: 'logo.jpeg',
  marino: 'alcaldia.jpg',
  map: 'croquis.jpeg',
}

export default function Page() {
  const [section, setSection] = useState<'home' | 'admin'>('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState(paidActivities[0].name)

  const { rate, loading: rateLoading } = useBCVRate()

  return (
    <div className="relative min-h-screen bg-[#f6f8fb] text-[#071b3b]">
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

            <section className="marquee">
              <div>
                DEPORTE <span>•</span> COMUNIDAD <span>•</span> DISCIPLINA <span>•</span> SANTIAGO MARIÑO <span>•</span> DEPORTE <span>•</span> COMUNIDAD <span>•</span>
              </div>
            </section>

            <ActivitySchedule
              onSelectModalidad={(name) => {
                if (name === 'Carrera 10K' || name === 'Caminata 5k Nocturna') {
                  setSelectedActivity(name)
                }
              }}
            />

            <RegistrationForm
              selected={selectedActivity}
              setSelected={setSelectedActivity}
              rate={rate}
              rateLoading={rateLoading}
            />

            <section id="ubicacion" className="location-section">
              <div>
                <span className="section-kicker">Nos vemos en la cancha</span>
                <h2
                  style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.25rem)', lineHeight: 1.15 }}
                  className="font-black tracking-tight text-[#071b3b] m-0"
                >
                  Todo ocurre<br />
                  en <span className="text-[#ee751b]">Makro RedVital</span>
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#53627a] leading-relaxed">
                  Estacionamiento Makro RedVital, Turmero. Un espacio preparado para vivir el deporte de cerca.
                </p>
                <a
                  className="text-link mt-4 inline-flex items-center gap-1.5"
                  href="https://maps.google.com/?q=Makro+RedVital+Turmero"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver en el mapa <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <img src={assets.map} alt="Mapa de distribución del evento Expo Deporte 2026" />
            </section>

            <Footer logo={assets.marino} />
          </main>
        )}
      </div>
    </div>
  )
}