import {
    Trophy,
    Footprints,
    Dumbbell,
    Swords,
    Bike,
    HeartPulse,
    Crown,
    Mic2,
    Radio,
    Disc3,
    ArrowRight,
    Sparkles,
    CheckCircle2
} from 'lucide-react'

const paidActivities = [
    {
        icon: Trophy,
        title: 'Carrera 10K',
        subtitle: 'Evento Central con Premiación',
        desc: 'Premiación en metálico ($500 1er, $300 2do, $200 3ro, $100 4to/5to).',
        kit: 'Medalla, franela, número, hidratación, logística y seguridad.',
        price: 25,
        tagColor: 'orange',
    },
    {
        icon: Footprints,
        title: 'Caminata 5k Nocturna',
        subtitle: 'Evento Central Recreativo',
        desc: 'Caminata nocturna sin premiación pensada para toda la familia.',
        kit: 'Franela, bandana con linterna, hidratación, logística y seguridad.',
        price: 15,
        tagColor: 'emerald',
    },
]

const communityActivities = [
    {
        icon: Dumbbell,
        title: 'Torneos de Conjunto',
        subtitle: 'Competencias Abiertas',
        desc: 'Octagonales de Fútbol Sala, Voleibol, Baloncesto 5x5 y Fútbol de Salón.',
    },
    {
        icon: Swords,
        title: 'Artes Marciales & Combate',
        subtitle: 'Ring & Tatami',
        desc: 'Festival Boxístico con 40 peleas en vivo y exhibiciones de Karate.',
    },
    {
        icon: Bike,
        title: 'Ciclismo y Ruedas',
        subtitle: 'Circuito Urbano',
        desc: 'Rodada Ciclística y Patinetada Comunitarias abiertas a toda la familia.',
    },
    {
        icon: HeartPulse,
        title: 'Fitness y Salud',
        subtitle: 'Bienestar Comunitario',
        desc: 'Bailoterapia, Tae Tek, Clase Especial de Yoga y Festival de Aeróbicos Escolares.',
    },
    {
        icon: Crown,
        title: 'Deportes de Mesa e Inclusión',
        subtitle: 'Estrategia y Encuentro',
        desc: 'Abierto de Dominó, Festival de Ajedrez y actividades del Festival del Adulto Mayor.',
    },
]

const culturalActivities = [
    {
        icon: Mic2,
        title: 'Solistas y Bandas',
        desc: 'Presentaciones musicales de grupos en vivo y talentos emergentes.',
    },
    {
        icon: Trophy,
        title: 'Hip-Hop & Breakdance',
        desc: 'Demostraciones urbanas, duelos deportivos y exhibiciones de ritmo.',
    },
    {
        icon: Radio,
        title: 'Show de Patrocinantes',
        desc: 'Activaciones continuas en tarima, concursos y lanzamientos.',
    },
    {
        icon: Disc3,
        title: 'Ambiente Permanente',
        desc: 'DJs animando las 32 horas de fiesta deportiva comunitaria.',
    },
]

type ActivityScheduleProps = {
    onSelectModalidad: (modalidad: string) => void
}

export function ActivitySchedule({ onSelectModalidad }: ActivityScheduleProps) {
    return (
        <section id="cronograma" className="section-wrap max-w-7xl mx-auto px-5 sm:px-8 py-12">
            {/* SECCIÓN 1: CARRERAS CON COBRO */}
            <div className="section-heading mb-8">
                <div>
                    <span className="section-kicker text-xs uppercase font-bold tracking-widest text-[#ee751b]">
                        Inscripciones Oficiales
                    </span>
                    <h2
                        style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.85rem)', lineHeight: 1.2 }}
                        className="font-black tracking-tight text-[#071b3b] mt-1"
                    >
                        Eventos Centrales <span className="text-[#ee751b]">Arancelados</span>
                    </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#53627a] mt-1.5">
                    Asegura tu kit de participante y compite por los premios en metálico.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {paidActivities.map((item, index) => {
                    const Icon = item.icon
                    const isEmerald = item.tagColor === 'emerald'

                    return (
                        <article
                            key={item.title}
                            className={`relative overflow-hidden rounded-[28px] bg-white border p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${isEmerald ? 'border-emerald-300' : 'border-[#ee751b]/30'
                                }`}
                        >
                            <div
                                className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${isEmerald
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                        : 'bg-[#ee751b]/10 text-[#ee751b]'
                                    }`}
                            >
                                <Sparkles className="h-3 w-3" /> Cupos Limitados
                            </div>

                            <div>
                                <span
                                    className={`text-xs font-black px-2.5 py-1 rounded-full w-fit block mb-3 ${isEmerald ? 'bg-emerald-100 text-emerald-800' : 'bg-[#ee751b]/10 text-[#ee751b]'
                                        }`}
                                >
                                    0{index + 1}
                                </span>
                                <div
                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 ${isEmerald ? 'bg-emerald-100 text-emerald-700' : 'bg-[#ee751b]/10 text-[#ee751b]'
                                        }`}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3
                                    style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.35rem)' }}
                                    className="font-black text-center text-[#071b3b] m-0"
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className={`text-center font-bold text-[11px] uppercase tracking-wider mt-0.5 mb-2 ${isEmerald ? 'text-emerald-700' : 'text-[#ee751b]'
                                        }`}
                                >
                                    {item.subtitle}
                                </p>
                                <p className="text-xs sm:text-sm text-center text-[#53627a] mb-4 leading-relaxed">
                                    {item.desc}
                                </p>

                                <div className="bg-[#f6f8fb] rounded-2xl p-3 text-[11px] sm:text-xs text-[#53627a] border border-[#e2e8f0]">
                                    <strong className="text-[#071b3b] block mb-0.5">Kit oficial incluido:</strong>
                                    {item.kit}
                                </div>
                            </div>

                            <div className="mt-5 pt-4 border-t border-[#e2e8f0] flex items-center justify-between">
                                <div>
                                    <span className="block text-[10px] uppercase tracking-wider text-[#53627a] font-semibold">
                                        Inscripción
                                    </span>
                                    <span className="text-xl font-black text-[#071b3b]">
                                        ${item.price} <small className="text-xs font-bold text-[#53627a]">USD</small>
                                    </span>
                                </div>
                                <a
                                    href="#inscripcion"
                                    onClick={() => onSelectModalidad(item.title)}
                                    className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl font-bold text-xs shadow-md transition-all text-white ${isEmerald
                                            ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                                            : 'bg-[#ee751b] hover:bg-[#d66312] shadow-[#ee751b]/20'
                                        }`}
                                >
                                    <span className="text-white">Inscribirme</span> <ArrowRight className="h-3.5 w-3.5 text-white" />
                                </a>
                            </div>
                        </article>
                    )
                })}
            </div>

            {/* SECCIÓN 2: DISCIPLINAS COMUNITARIAS */}
            <div className="section-heading mb-8">
                <div>
                    <span className="section-kicker text-xs uppercase font-bold tracking-widest text-emerald-600">
                        32 Horas Activas
                    </span>
                    <h2
                        style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.85rem)', lineHeight: 1.2 }}
                        className="font-black tracking-tight text-[#071b3b] mt-1"
                    >
                        Disciplinas y <span className="text-emerald-600">Exhibiciones</span>
                    </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#53627a] mt-1.5">
                    Torneos relámpago y actividades deportivas abiertas para toda la comunidad.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {communityActivities.map((item, index) => {
                    const Icon = item.icon
                    const isLastItem = index === communityActivities.length - 1
                    return (
                        <article
                            key={item.title}
                            className={`rounded-[28px] bg-white border border-[#e2e8f0] hover:border-emerald-300 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${isLastItem ? 'sm:col-span-2 lg:col-span-1' : ''
                                }`}
                        >
                            <div>
                                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full w-fit block mb-3 border border-emerald-200">
                                    0{index + 3}
                                </span>
                                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto mb-3">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3
                                    style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)' }}
                                    className="font-black text-center text-[#071b3b] m-0"
                                >
                                    {item.title}
                                </h3>
                                <p className="font-semibold text-center text-[11px] text-[#ee751b] mt-0.5 mb-2">
                                    {item.subtitle}
                                </p>
                                <p className="text-xs sm:text-sm text-center text-[#53627a] leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>

                            <div className="mt-5 pt-3.5 border-t border-[#e2e8f0] text-center">
                                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                                    Acceso Comunitario Libre
                                </span>
                            </div>
                        </article>
                    )
                })}
            </div>

            {/* SECCIÓN 3: CULTURALES Y MÚSICA */}
            <div className="section-heading mb-8">
                <div>
                    <span className="section-kicker text-xs uppercase font-bold tracking-widest text-[#ee751b]">
                        Tarima & Animación
                    </span>
                    <h2
                        style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.85rem)', lineHeight: 1.2 }}
                        className="font-black tracking-tight text-[#071b3b] mt-1"
                    >
                        Culturales & <span className="text-[#ee751b]">Musicales</span>
                    </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#53627a] mt-1.5">
                    Espacios alternos con activaciones constantes y presentaciones en vivo.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {culturalActivities.map((cult, idx) => {
                    const Icon = cult.icon
                    return (
                        <div
                            key={idx}
                            className="rounded-3xl bg-white border border-[#e2e8f0] p-5 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center justify-between"
                        >
                            <div>
                                <div className="w-11 h-11 rounded-2xl bg-[#f6f8fb] text-[#ee751b] border border-[#e2e8f0] flex items-center justify-center mx-auto mb-3">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h3
                                    style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)' }}
                                    className="font-bold text-[#071b3b] mb-1.5"
                                >
                                    {cult.title}
                                </h3>
                                <p className="text-xs text-[#53627a] leading-relaxed">
                                    {cult.desc}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}