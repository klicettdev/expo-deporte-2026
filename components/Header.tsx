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
        <header className="site-header sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e2e8f0]">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
                <button
                    onClick={() => {
                        setSection('home')
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="flex items-center gap-3.5 text-left group"
                    aria-label="Inicio"
                >
                    {/* Contenedor del Logo con fondo, contraste y sin recorte circular agresivo */}
                    <div className="h-12 sm:h-14 w-auto px-1.5 py-1 rounded-xl bg-white border border-[#e2e8f0] shadow-xs flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                        <img
                            src={expoLogo}
                            alt="Logo Expo Deporte 2026"
                            className="h-full w-auto max-w-14 sm:max-w-16 object-contain"
                        />
                    </div>

                    <div className="hidden leading-none sm:block">
                        <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-[#ee751b] mb-1">
                            Santiago Mariño
                        </span>
                        <span className="font-display text-lg lg:text-xl font-black italic tracking-tight text-[#071b3b]">
                            EXPO DEPORTE <b className="text-[#ee751b]">2026</b>
                        </span>
                    </div>
                </button>

                <nav className="hidden items-center gap-8 text-sm font-bold md:flex">
                    <button
                        onClick={() => setSection('home')}
                        className={section === 'home' ? 'text-[#ee751b]' : 'text-[#53627a] hover:text-[#071b3b] transition-colors'}
                    >
                        Inicio
                    </button>
                    <a href="#cronograma" className="text-[#53627a] hover:text-[#071b3b] transition-colors">Cronograma</a>
                    <a href="#ubicacion" className="text-[#53627a] hover:text-[#071b3b] transition-colors">Ubicación</a>
                    <a href="#inscripcion" className="text-[#53627a] hover:text-[#071b3b] transition-colors">Inscripción</a>

                    <button
                        onClick={() => setSection('admin')}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#e2e8f0] bg-white text-[#071b3b] hover:border-[#ee751b] hover:text-[#ee751b] shadow-xs transition-all"
                    >
                        <LayoutDashboard className="h-4 w-4 text-[#ee751b]" />
                        <span>Panel admin</span>
                    </button>
                </nav>

                <button
                    className="p-2 rounded-xl text-[#071b3b] hover:bg-[#f6f8fb] md:hidden"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Abrir menú"
                >
                    {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {mobileOpen && (
                <div className="border-t border-[#e2e8f0] bg-white px-5 py-4 md:hidden animate-in slide-in-from-top-2">
                    <div className="flex flex-col gap-4 text-sm font-bold">
                        <a href="#cronograma" onClick={() => setMobileOpen(false)} className="text-[#53627a] hover:text-[#ee751b]">
                            Cronograma
                        </a>
                        <a href="#ubicacion" onClick={() => setMobileOpen(false)} className="text-[#53627a] hover:text-[#ee751b]">
                            Ubicación
                        </a>
                        <a href="#inscripcion" onClick={() => setMobileOpen(false)} className="text-[#53627a] hover:text-[#ee751b]">
                            Inscripción
                        </a>
                        <button
                            className="inline-flex items-center gap-2 text-left text-[#ee751b] pt-2 border-t border-[#f1f5f9]"
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