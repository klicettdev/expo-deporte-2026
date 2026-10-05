'use client'

import { LayoutDashboard, Menu, X } from 'lucide-react'

type HeaderProps = {
  section: 'home' | 'admin'
  setSection: (section: 'home' | 'admin') => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
  expoLogo: string
}

export function Header({ section, setSection, mobileOpen, setMobileOpen, expoLogo }: HeaderProps) {
  return (
    <header className="site-header sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e2e8f0] shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8 py-2.5">
        <button
          onClick={() => {
            setSection('home')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="flex items-center gap-3 text-left group cursor-pointer"
          aria-label="Inicio"
        >
          {/* Logo oficial con escala destacada */}
          <img
            src={expoLogo}
            alt="Expo Deporte 2026"
            className="h-14 sm:h-18 md:h-20 w-auto object-contain transition-transform group-hover:scale-105"
          />

          <div className="hidden leading-tight md:block border-l-2 border-[#e2e8f0] pl-3.5">
            <span className="block text-[11px] font-black uppercase tracking-[0.25em] text-[#FA8D1E]">
              Expo Deporte
            </span>
            <span className="text-xs font-bold text-[#0C1932]">
              INADEMAR · Aragua
            </span>
          </div>
        </button>

        <nav className="hidden items-center gap-7 text-sm font-bold md:flex">
          <button
            onClick={() => setSection('home')}
            className={section === 'home' ? 'text-[#FA8D1E]' : 'text-[#53627a] hover:text-[#0C1932] transition-colors'}
          >
            Inicio
          </button>
          <a href="#indumentaria" className="text-[#53627a] hover:text-[#0C1932] transition-colors">
            Kits & Medalla
          </a>
          <a href="#plano" className="text-[#53627a] hover:text-[#0C1932] transition-colors">
            Plano
          </a>
          <a href="#cronograma" className="text-[#53627a] hover:text-[#0C1932] transition-colors">
            Cronograma
          </a>
          <a href="#ubicacion" className="text-[#53627a] hover:text-[#0C1932] transition-colors">
            Ubicación
          </a>
          <a href="#inscripcion" className="text-[#53627a] hover:text-[#0C1932] transition-colors">
            Inscripción
          </a>

          <button
            onClick={() => setSection('admin')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#e2e8f0] bg-white text-[#0C1932] hover:border-[#FA8D1E] hover:text-[#FA8D1E] shadow-xs transition-all cursor-pointer"
          >
            <LayoutDashboard className="h-4 w-4 text-[#FA8D1E]" />
            <span>Panel admin</span>
          </button>
        </nav>

        <button
          className="p-2 rounded-xl text-[#0C1932] hover:bg-[#f6f8fb] md:hidden cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#e2e8f0] bg-white px-5 py-4 md:hidden animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-4 text-sm font-bold">
            <a href="#indumentaria" onClick={() => setMobileOpen(false)} className="text-[#53627a] hover:text-[#FA8D1E]">
              Kits & Medalla
            </a>
            <a href="#plano" onClick={() => setMobileOpen(false)} className="text-[#53627a] hover:text-[#FA8D1E]">
              Plano General
            </a>
            <a href="#cronograma" onClick={() => setMobileOpen(false)} className="text-[#53627a] hover:text-[#FA8D1E]">
              Cronograma
            </a>
            <a href="#ubicacion" onClick={() => setMobileOpen(false)} className="text-[#53627a] hover:text-[#FA8D1E]">
              Ubicación
            </a>
            <a href="#inscripcion" onClick={() => setMobileOpen(false)} className="text-[#53627a] hover:text-[#FA8D1E]">
              Inscripción
            </a>
            <button
              className="inline-flex items-center gap-2 text-left text-[#FA8D1E] pt-2 border-t border-[#f1f5f9] cursor-pointer"
              onClick={() => {
                setSection('admin')
                setMobileOpen(false)
              }}
            >
              <LayoutDashboard className="h-4 w-4" /> Panel admin
            </button>
          </div>
        </div>
      )}
    </header>
  )
}