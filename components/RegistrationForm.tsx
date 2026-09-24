'use client'

import { useState } from 'react'
import {
    ArrowRight,
    CheckCircle2,
    CircleDollarSign,
    ShieldCheck,
    Loader2,
    Medal,
    HeartPulse,
    Clock
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

export type PaidActivity = {
    name: string
    price: number
    detail: string
}

export const paidActivities: PaidActivity[] = [
    { name: 'Carrera 10K', price: 25, detail: 'Con premiación en metálico ($500 1er lugar)' },
    { name: 'Caminata 5k Nocturna', price: 15, detail: 'Recreativa sin premiación (Incluye linterna)' },
]

type RegistrationFormProps = {
    selected: string
    setSelected: (v: string) => void
    rate: number
    rateLoading: boolean
}

export function RegistrationForm({ selected, setSelected, rate, rateLoading }: RegistrationFormProps) {
    const [registered, setRegistered] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)

    const [fullName, setFullName] = useState('')
    const [lastName, setLastName] = useState('')
    const [cedula, setCedula] = useState('')
    const [phone, setPhone] = useState('')
    const [paymentRef, setPaymentRef] = useState('')
    const [paymentDate, setPaymentDate] = useState('')

    const currentActivity = paidActivities.find((a) => a.name === selected) ?? paidActivities[0]
    const totalBs = (currentActivity.price * rate).toFixed(2)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setFormError(null)

        try {
            const cleanCedula = cedula.trim().toUpperCase()
            const { error } = await supabase.from('participants').insert([
                {
                    name: `${fullName.trim()} ${lastName.trim()}`,
                    cedula: cleanCedula,
                    phone: phone.trim(),
                    category: currentActivity.name,
                    payment_ref: paymentRef.trim(),
                    payment_date: paymentDate,
                    amount_usd: currentActivity.price,
                    amount_bs: Number(totalBs),
                    bcv_rate: rate,
                    status: 'Pendiente',
                    blocked: false,
                },
            ])

            if (error) {
                if (error.code === '23505') {
                    throw new Error('Esta cédula ya se encuentra registrada en el sistema.')
                }
                throw new Error(error.message || 'Error al procesar el registro')
            }

            setRegistered(true)
        } catch (err: any) {
            setFormError(err.message || 'Error inesperado al conectar con el servidor')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section id="inscripcion" className="w-full bg-[#071b3b] py-14 sm:py-20 my-12 border-y border-[#0f274d]">
            <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">

                    {/* Columna Izquierda: Información del Evento, Beneficios y Tasa BCV */}
                    <div className="lg:col-span-5 flex flex-col justify-between py-2">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="inline-block text-xs uppercase font-extrabold tracking-widest text-[#ee751b]">
                                    Asegura tu lugar
                                </span>
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                                    Turmero 2026
                                </span>
                            </div>

                            <h2
                                style={{ fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', lineHeight: 1.15 }}
                                className="font-black text-white tracking-tight m-0"
                            >
                                Registro de <span className="text-[#ee751b]">Atletas</span>
                            </h2>
                            <p className="text-sm text-slate-300 mt-4 leading-relaxed max-w-md">
                                Las únicas actividades aranceladas con kit de atleta oficial son la Carrera 10K y la Caminata 5K Nocturna. El resto de las disciplinas comunitarias son de acceso libre.
                            </p>

                            {/* Bloque informativo de beneficios con acentos verdes institucionales */}
                            <div className="mt-6 space-y-3.5 max-w-md">
                                <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-3 border border-emerald-500/20">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                                        <Medal className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <strong className="text-xs font-bold text-white block">Kit Oficial del Participante</strong>
                                        <span className="text-[11px] text-slate-300 leading-snug block">
                                            Incluye franela técnica, medalla conmemorativa, número con chip y linterna (en 5K).
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-3 border border-emerald-500/20">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                                        <HeartPulse className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <strong className="text-xs font-bold text-white block">Logística, Asistencia e Hidratación</strong>
                                        <span className="text-[11px] text-slate-300 leading-snug block">
                                            Puntos de soporte médico, hidratación continua en ruta y resguardo policial garantizado.
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-3 border border-emerald-500/20">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <strong className="text-xs font-bold text-white block">Conciliación Rápida</strong>
                                        <span className="text-[11px] text-slate-300 leading-snug block">
                                            Los pagos vía Pago Móvil se verifican por el equipo técnico de INADEMAR en el panel central.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tarjeta Tasa BCV Oficial con acento Verde Esmeralda */}
                        <div className="rounded-2xl p-4 bg-white/95 backdrop-blur-sm border border-emerald-400/40 shadow-lg flex items-center gap-3.5 mt-8 max-w-md">
                            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                                <CircleDollarSign className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="block text-[10px] uppercase tracking-wider text-[#53627a] font-bold">
                                        Tasa BCV Oficial
                                    </span>
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <strong className="text-base sm:text-lg font-black text-[#071b3b] block leading-tight">
                                    {rateLoading ? 'Consultando...' : `Bs. ${rate.toFixed(2)}`} <small className="text-xs font-semibold text-emerald-700">por USD</small>
                                </strong>
                                <small className="text-[10px] text-[#53627a] block mt-0.5">Tasa oficial automatizada de cambio</small>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha: Tarjeta del Formulario */}
                    <div className="lg:col-span-7">
                        <div className="rounded-[28px] bg-white border border-[#e2e8f0] p-6 sm:p-9 shadow-2xl">
                            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#e2e8f0]">
                                <span className="text-[11px] font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                                    01 / 02
                                </span>
                                <span className="text-xs font-bold text-[#53627a] uppercase tracking-wider">
                                    Inscripción de Atleta
                                </span>
                            </div>

                            {formError && (
                                <div className="mb-5 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700 font-semibold">
                                    {formError}
                                </div>
                            )}

                            {registered ? (
                                <div className="text-center py-8">
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-black text-[#071b3b] mb-1">¡Inscripción registrada!</h3>
                                    <p className="text-xs sm:text-sm text-[#53627a] mb-6 max-w-sm mx-auto">
                                        Tu registro para la <strong>{currentActivity.name}</strong> ha sido almacenado exitosamente en nuestra base de datos.
                                    </p>
                                    <button
                                        className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#ee751b] hover:bg-[#d66312] text-white font-bold text-xs shadow-md shadow-[#ee751b]/20 transition-all"
                                        onClick={() => {
                                            setRegistered(false)
                                            setFullName('')
                                            setLastName('')
                                            setCedula('')
                                            setPaymentRef('')
                                        }}
                                    >
                                        Registrar otro participante
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        <label className="text-xs font-bold text-[#071b3b] block">
                                            Nombre
                                            <input
                                                required
                                                placeholder="Tu nombre"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-[#f6f8fb] text-xs sm:text-sm text-[#071b3b] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ee751b]/40 transition-all"
                                            />
                                        </label>
                                        <label className="text-xs font-bold text-[#071b3b] block">
                                            Apellido
                                            <input
                                                required
                                                placeholder="Tu apellido"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-[#f6f8fb] text-xs sm:text-sm text-[#071b3b] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ee751b]/40 transition-all"
                                            />
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        <label className="text-xs font-bold text-[#071b3b] block">
                                            Cédula
                                            <input
                                                required
                                                placeholder="V-00.000.000"
                                                value={cedula}
                                                onChange={(e) => setCedula(e.target.value)}
                                                className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-[#f6f8fb] text-xs sm:text-sm text-[#071b3b] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ee751b]/40 transition-all"
                                            />
                                        </label>
                                        <label className="text-xs font-bold text-[#071b3b] block">
                                            Teléfono
                                            <input
                                                required
                                                placeholder="0412-0000000"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-[#f6f8fb] text-xs sm:text-sm text-[#071b3b] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ee751b]/40 transition-all"
                                            />
                                        </label>
                                    </div>

                                    <label className="text-xs font-bold text-[#071b3b] block">
                                        Modalidad de Caminata / Carrera
                                        <select
                                            value={selected}
                                            onChange={(e) => setSelected(e.target.value)}
                                            className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-[#f6f8fb] text-xs sm:text-sm text-[#071b3b] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ee751b]/40 transition-all cursor-pointer"
                                        >
                                            {paidActivities.map((act) => (
                                                <option key={act.name} value={act.name}>
                                                    {act.name} — ${act.price} USD ({act.detail})
                                                </option>
                                            ))}
                                        </select>
                                    </label>

                                    {/* Resumen del Monto a Cancelar con verde en el cálculo en Bolívares */}
                                    <div className="rounded-xl bg-[#f6f8fb] border border-[#e2e8f0] p-4 flex items-center justify-between">
                                        <div>
                                            <span className="block text-[11px] font-bold text-[#53627a]">Total a cancelar</span>
                                            <small className="text-[10px] text-emerald-700 font-semibold">Calculado a Tasa Oficial BCV</small>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-bold text-[#53627a] mr-2">
                                                ${currentActivity.price} USD
                                            </span>
                                            <b className="text-base font-black text-emerald-700">
                                                ≈ Bs. {totalBs}
                                            </b>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        <label className="text-xs font-bold text-[#071b3b] block">
                                            Referencia bancaria / Pago Móvil
                                            <input
                                                required
                                                placeholder="Últimos dígitos"
                                                value={paymentRef}
                                                onChange={(e) => setPaymentRef(e.target.value)}
                                                className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-[#f6f8fb] text-xs sm:text-sm text-[#071b3b] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ee751b]/40 transition-all"
                                            />
                                        </label>
                                        <label className="text-xs font-bold text-[#071b3b] block">
                                            Fecha de pago
                                            <input
                                                required
                                                type="date"
                                                value={paymentDate}
                                                onChange={(e) => setPaymentDate(e.target.value)}
                                                className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-[#f6f8fb] text-xs sm:text-sm text-[#071b3b] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ee751b]/40 transition-all cursor-pointer"
                                            />
                                        </label>
                                    </div>

                                    <label className="flex items-start gap-2 text-[11px] text-[#53627a] pt-1 cursor-pointer select-none">
                                        <input
                                            required
                                            type="checkbox"
                                            className="mt-0.5 rounded border-[#e2e8f0] text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <span>Acepto los términos de participación y autorizo el uso de mis datos para la organización técnica del evento.</span>
                                    </label>

                                    <button
                                        disabled={submitting}
                                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#ee751b] hover:bg-[#d66312] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#ee751b]/20 transition-all mt-3 disabled:opacity-50"
                                        type="submit"
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" /> Guardando en sistema...
                                            </>
                                        ) : (
                                            <>
                                                <ShieldCheck className="h-4 w-4" /> Enviar mi inscripción <ArrowRight className="h-4 w-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}