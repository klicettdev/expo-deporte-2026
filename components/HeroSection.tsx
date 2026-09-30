import { ArrowRight, CalendarDays, ChevronDown, Trophy, Users, Sparkles } from 'lucide-react'

export function HeroSection({ heroImg }: { heroImg: string }) {
    return (
        <section className="relative overflow-hidden py-8 lg:py-14 border-b border-[#e2e8f0]/80">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                        <div className="flex flex-wrap items-center gap-2.5">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#FA8D1E]/10 border border-[#FA8D1E]/20 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-[#FA8D1E]">
                                <span className="h-2 w-2 rounded-full bg-[#FA8D1E] animate-pulse" />
                                27 · 28 · 29 Noviembre 2026
                            </div>
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#22A84A]/10 border border-[#22A84A]/25 px-3 py-1 text-xs font-bold text-[#22A84A]">
                                <Sparkles className="h-3 w-3 text-[#22A84A]" />
                                <span>INADEMAR · Santiago Mariño</span>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#0C1932] leading-[1.05]">
                                ¡El deporte <br />
                                <span className="text-[#FA8D1E]">nos mueve!</span>
                            </h1>
                            {/* Estelas cinéticas según Manual de Marca: Naranja, Azul y Verde */}
                            <div className="mt-3 flex items-center gap-1.5">
                                <span className="h-1.5 w-16 rounded-full bg-[#FA8D1E]" />
                                <span className="h-1.5 w-24 rounded-full bg-[#4169E2]" />
                                <span className="h-1.5 w-12 rounded-full bg-[#22A84A]" />
                            </div>
                        </div>

                        <p className="text-base sm:text-lg text-[#53627a] max-w-xl leading-relaxed">
                            El evento deportivo y comercial más grande de Aragua ya tiene fecha. Tres días continuos de alta competencia, Carrera 10K, Caminata 5K Nocturna, exhibición de combate y tarima permanente.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <a
                                href="#inscripcion"
                                className="inline-flex items-center gap-2 py-3.5 px-7 rounded-2xl bg-[#FA8D1E] hover:bg-[#e07b14] text-white! font-bold text-sm shadow-lg shadow-[#FA8D1E]/25 transition-all"
                            >
                                <span className="text-white!">Quiero inscribirme</span>
                                <ArrowRight className="h-4 w-4 text-white!" />
                            </a>
                            <a
                                href="#cronograma"
                                className="inline-flex items-center gap-1 text-sm font-bold text-[#0C1932] hover:text-[#22A84A] px-4 py-3 transition-colors rounded-xl border border-transparent hover:border-[#22A84A]/30 hover:bg-[#22A84A]/5"
                            >
                                Conoce el cronograma <ChevronDown className="h-4 w-4" />
                            </a>
                        </div>

                        {/* Métricas destacadas */}
                        <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#e2e8f0]/80 max-w-lg">
                            <div className="flex flex-col">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#53627a] uppercase">
                                    <CalendarDays className="h-3.5 w-3.5 text-[#FA8D1E]" /> Fechas
                                </span>
                                <strong className="text-sm sm:text-base font-black text-[#0C1932] mt-0.5">27—29 NOV</strong>
                            </div>

                            <div className="flex flex-col">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#53627a] uppercase">
                                    <Trophy className="h-3.5 w-3.5 text-[#FA8D1E]" /> Jornada
                                </span>
                                <strong className="text-sm sm:text-base font-black text-[#0C1932] mt-0.5">32 Horas</strong>
                            </div>

                            <div className="flex flex-col">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#22A84A] uppercase">
                                    <Users className="h-3.5 w-3.5 text-[#22A84A]" /> Impacto
                                </span>
                                <strong className="text-sm sm:text-base font-black text-[#22A84A] mt-0.5">+20 Disciplinas</strong>
                            </div>
                        </div>
                    </div>

                    {/* Afiche hero.jpeg */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-95 sm:max-w-107 rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/60 border-2 border-[#22A84A]/30 bg-white">
                            <img
                                src={heroImg}
                                alt="El evento deportivo y comercial más grande de Aragua - Expo Deporte 2026"
                                className="w-full h-auto object-cover block"
                            />
                            <div className="absolute bottom-4 right-4 bg-[#0C1932]/95 backdrop-blur-sm text-white px-4 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-lg border border-[#22A84A]/40">
                                <strong className="text-xl font-black leading-none text-[#FA8D1E]">27—29</strong>
                                <span className="text-[10px] font-bold uppercase leading-tight text-[#22A84A] tracking-wider">
                                    NOV<br />2026
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}