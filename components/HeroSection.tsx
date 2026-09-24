import { ArrowRight, CalendarDays, ChevronDown, Trophy, Users, Sparkles } from 'lucide-react'

export function HeroSection({ heroImg }: { heroImg: string }) {
    return (
        <section className="relative overflow-hidden py-8 lg:py-14 border-b border-[#e2e8f0]/80">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                        <div className="flex flex-wrap items-center gap-2.5">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#ee751b]/10 border border-[#ee751b]/20 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-[#ee751b]">
                                <span className="h-2 w-2 rounded-full bg-[#ee751b] animate-pulse" />
                                13 · 14 · 15 Noviembre 2026
                            </div>
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-700">
                                <Sparkles className="h-3 w-3 text-emerald-600" />
                                <span>INADEMAR Oficial</span>
                            </div>
                        </div>

                        <div>
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#071b3b] leading-[1.05]">
                                ¡El deporte <br />
                                <span className="text-[#ee751b]">nos mueve!</span>
                            </h1>
                            {/* Doble estela deportiva (Naranja + Verde Mariño) como en el afiche */}
                            <div className="mt-3 flex items-center gap-1.5">
                                <span className="h-1.5 w-14 rounded-full bg-[#ee751b]" />
                                <span className="h-1.5 w-24 rounded-full bg-emerald-500" />
                                <span className="h-1.5 w-6 rounded-full bg-[#071b3b]" />
                            </div>
                        </div>

                        <p className="text-base sm:text-lg text-[#53627a] max-w-xl leading-relaxed">
                            La gran vitrina deportiva de Santiago Mariño. Tres días continuos de competencia, eventos arancelados de alta exigencia, torneos comunales y tarimas culturales permanentes.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <a
                                href="#inscripcion"
                                className="primary-button inline-flex items-center gap-2 py-3.5! px-7! text-sm font-bold shadow-lg shadow-[#ee751b]/25 hover:shadow-none transition-all"
                            >
                                Quiero inscribirme <ArrowRight className="h-4 w-4" />
                            </a>
                            <a
                                href="#cronograma"
                                className="inline-flex items-center gap-1 text-sm font-bold text-[#071b3b] hover:text-emerald-600 px-4 py-3 transition-colors rounded-xl border border-transparent hover:border-emerald-200 hover:bg-emerald-50/50"
                            >
                                Conoce el cronograma <ChevronDown className="h-4 w-4" />
                            </a>
                        </div>

                        {/* Métricas destacadas: Verde integrado en Comunidad */}
                        <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#e2e8f0]/80 max-w-lg">
                            <div className="flex flex-col">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#53627a] uppercase">
                                    <CalendarDays className="h-3.5 w-3.5 text-[#ee751b]" /> Fecha
                                </span>
                                <strong className="text-sm sm:text-base font-black text-[#071b3b] mt-0.5">13—15 NOV</strong>
                            </div>

                            <div className="flex flex-col">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#53627a] uppercase">
                                    <Trophy className="h-3.5 w-3.5 text-[#ee751b]" /> Jornada
                                </span>
                                <strong className="text-sm sm:text-base font-black text-[#071b3b] mt-0.5">32 Horas</strong>
                            </div>

                            <div className="flex flex-col">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase">
                                    <Users className="h-3.5 w-3.5 text-emerald-600" /> Comunidad
                                </span>
                                <strong className="text-sm sm:text-base font-black text-emerald-700 mt-0.5">500+ Atletas</strong>
                            </div>
                        </div>
                    </div>

                    {/* Afiche oficial */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-95 sm:max-w-105 rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/60 border-2 border-emerald-500/30 bg-white">
                            <img
                                src={heroImg}
                                alt="Atletas de Expo Deporte 2026"
                                className="w-full h-auto object-cover block"
                            />
                            <div className="absolute bottom-4 right-4 bg-[#071b3b]/95 backdrop-blur-sm text-white px-4 py-2 rounded-2xl flex items-center gap-2.5 shadow-lg border border-emerald-400/30">
                                <strong className="text-lg font-black leading-none text-[#ee751b]">13—15</strong>
                                <span className="text-[10px] font-bold uppercase leading-tight text-emerald-400 tracking-wider">
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