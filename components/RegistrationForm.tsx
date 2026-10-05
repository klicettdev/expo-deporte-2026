'use client'

import { useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  ShieldCheck,
  Loader2,
  Package,
  HeartPulse,
  Clock,
  Sparkles
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

export type PaidActivity = {
  name: string
  price: number
  detail: string
  kitItems: string[]
}

export const paidActivities: PaidActivity[] = [
  {
    name: 'Carrera 10K',
    price: 30,
    detail: 'Con premiación en metálico ($500 1er lugar)',
    kitItems: [
      '1x Camiseta técnica oficial',
      '1x Gorra con diseño exclusivo',
      '1x Tula deportiva con diseño',
      '1x Número oficial de corredor',
      '1x Brazalete de acceso',
    ],
  },
  {
    name: 'Caminata 5k Nocturna',
    price: 20,
    detail: 'Recreativa familiar nocturna',
    kitItems: [
      '1x Franela con reflectivo nocturno',
      '1x Tula deportiva con diseño',
      '1x Número con diseño oficial',
      '1x Brazalete de acceso',
    ],
  },
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
    <section id="inscripcion" className="w-full bg-[#0C1932] py-14 sm:py-20 my-12 border-y border-[#4169E2]/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">

          {/* Columna Izquierda: Información del Evento, Beneficios y Tasa BCV */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block text-xs uppercase font-extrabold tracking-widest text-[#FA8D1E]">
                  Asegura tu lugar
                </span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#22A84A]" />
                <span className="text-[11px] font-bold text-[#22A84A] uppercase tracking-wider">
                  Turmero 2026
                </span>
              </div>

              <h2
                style={{ fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', lineHeight: 1.15 }}
                className="font-black text-white tracking-tight m-0"
              >
                Registro de <span className="text-[#FA8D1E]">Atletas</span>
              </h2>
              <p className="text-sm text-slate-300 mt-4 leading-relaxed max-w-md">
                Las únicas actividades aranceladas con kit oficial son la Carrera 10K (${paidActivities[0].price} USD) y la Caminata 5K Nocturna (${paidActivities[1].price} USD). El resto de disciplinas son de acceso libre.
              </p>

              {/* Bloque interactivo del Kit Oficial correspondiente */}
              <div className="mt-6 space-y-3.5 max-w-md">
                <div className="bg-white/5 rounded-2xl p-4 border border-[#22A84A]/30">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#22A84A]/20 text-[#22A84A] flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-xs font-bold text-white block">
                        Kit Oficial Incluido ({currentActivity.name})
                      </strong>
                      <span className="text-[10px] text-[#22A84A] font-semibold">
                        Inversión: ${currentActivity.price} USD
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-1.5 pl-1">
                    {currentActivity.kitItems.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FA8D1E]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-3 border border-white/10">
                  <div className="w-8 h-8 rounded-xl bg-[#4169E2]/20 text-[#4169E2] flex items-center justify-center shrink-0 mt-0.5">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-white block">Logística, Asistencia e Hidratación</strong>
                    <span className="text-[11px] text-slate-300 leading-snug block">
                      Puntos de soporte médico, hidratación en ruta y resguardo policial garantizado por INADEMAR.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 rounded-2xl p-3 border border-white/10">
                  <div className="w-8 h-8 rounded-xl bg-[#FA8D1E]/20 text-[#FA8D1E] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-white block">Conciliación Rápida</strong>
                    <span className="text-[11px] text-slate-300 leading-snug block">
                      Los pagos vía Pago Móvil se verifican por el equipo técnico en el panel central administrativo.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta Tasa BCV Oficial */}
            <div className="rounded-2xl p-4 bg-white/95 backdrop-blur-sm border border-[#22A84A]/40 shadow-lg flex items-center gap-3.5 mt-8 max-w-md">
              <div className="w-11 h-11 rounded-xl bg-[#22A84A]/10 text-[#22A84A] border border-[#22A84A]/20 flex items-center justify-center shrink-0">
                <CircleDollarSign className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="block text-[10px] uppercase tracking-wider text-[#53627a] font-bold">
                    Tasa BCV Oficial
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22A84A]" />
                </div>
                <strong className="text-base sm:text-lg font-black text-[#0C1932] block leading-tight">
                  {rateLoading ? 'Consultando...' : `Bs. ${rate.toFixed(2)}`} <small className="text-xs font-semibold text-[#22A84A]">por USD</small>
                </strong>
                <small className="text-[10px] text-[#53627a] block mt-0.5">Tasa oficial automatizada de cambio</small>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta del Formulario */}
          <div className="lg:col-span-7">
            <div className="rounded-[28px] bg-white border border-[#e2e8f0] p-6 sm:p-9 shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#e2e8f0]">
                <span className="text-[11px] font-black text-[#22A84A] bg-[#22A84A]/10 border border-[#22A84A]/25 px-3 py-1 rounded-full">
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
                  <h3 className="text-xl font-black text-[#0C1932] mb-1">¡Inscripción registrada!</h3>
                  <p className="text-xs sm:text-sm text-[#53627a] mb-6 max-w-sm mx-auto">
                    Tu registro para la <strong>{currentActivity.name}</strong> ha sido almacenado exitosamente en nuestra base de datos.
                  </p>
                  <button
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#FA8D1E] hover:bg-[#e07b14] text-white! font-bold text-xs shadow-md shadow-[#FA8D1E]/20 transition-all cursor-pointer"
                    onClick={() => {
                      setRegistered(false)
                      setFullName('')
                      setLastName('')
                      setCedula('')
                      setPaymentRef('')
                    }}
                  >
                    <span className="text-white!">Registrar otro participante</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <label className="text-xs font-bold text-[#0C1932] block">
                      Nombre
                      <input
                        required
                        placeholder="Tu nombre"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-[#f6f8fb] text-xs sm:text-sm text-[#0C1932] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FA8D1E]/40 transition-all"
                      />
                    </label>
                    <label className="text-xs font-bold text-[#0C1932] block">
                      Apellido
                      <input
                        required
                        placeholder="Tu apellido"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-[#f6f8fb] text-xs sm:text-sm text-[#0C1932] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FA8D1E]/40 transition-all"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <label className="text-xs font-bold text-[#0C1932] block">
                      Cédula
                      <input
                        required
                        placeholder="V-00.000.000"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-[#f6f8fb] text-xs sm:text-sm text-[#0C1932] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FA8D1E]/40 transition-all"
                      />
                    </label>
                    <label className="text-xs font-bold text-[#0C1932] block">
                      Teléfono
                      <input
                        required
                        placeholder="0412-0000000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-[#f6f8fb] text-xs sm:text-sm text-[#0C1932] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FA8D1E]/40 transition-all"
                      />
                    </label>
                  </div>

                  <label className="text-xs font-bold text-[#0C1932] block">
                    Modalidad de Caminata / Carrera
                    <select
                      value={selected}
                      onChange={(e) => setSelected(e.target.value)}
                      className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-[#f6f8fb] text-xs sm:text-sm text-[#0C1932] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FA8D1E]/40 transition-all cursor-pointer"
                    >
                      {paidActivities.map((act) => (
                        <option key={act.name} value={act.name}>
                          {act.name} — ${act.price} USD ({act.detail})
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* Resumen del Monto a Cancelar */}
                  <div className="rounded-xl bg-[#f6f8fb] border border-[#e2e8f0] p-4 flex items-center justify-between">
                    <div>
                      <span className="block text-[11px] font-bold text-[#53627a]">Total a cancelar</span>
                      <small className="text-[10px] text-[#22A84A] font-semibold">Calculado a Tasa Oficial BCV</small>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#53627a] mr-2">
                        ${currentActivity.price} USD
                      </span>
                      <b className="text-base font-black text-[#22A84A]">
                        ≈ Bs. {totalBs}
                      </b>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <label className="text-xs font-bold text-[#0C1932] block">
                      Referencia bancaria / Pago Móvil
                      <input
                        required
                        placeholder="Últimos dígitos"
                        value={paymentRef}
                        onChange={(e) => setPaymentRef(e.target.value)}
                        className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-[#f6f8fb] text-xs sm:text-sm text-[#0C1932] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FA8D1E]/40 transition-all"
                      />
                    </label>
                    <label className="text-xs font-bold text-[#0C1932] block">
                      Fecha de pago
                      <input
                        required
                        type="date"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                        className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-[#f6f8fb] text-xs sm:text-sm text-[#0C1932] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FA8D1E]/40 transition-all cursor-pointer"
                      />
                    </label>
                  </div>

                  <label className="flex items-start gap-2 text-[11px] text-[#53627a] pt-1 cursor-pointer select-none">
                    <input
                      required
                      type="checkbox"
                      className="mt-0.5 rounded border-[#e2e8f0] text-[#22A84A] focus:ring-[#22A84A]"
                    />
                    <span>Acepto los términos de participación y autorizo el uso de mis datos para la organización técnica del evento.</span>
                  </label>

                  <button
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#FA8D1E] hover:bg-[#e07b14] text-white! font-bold text-xs sm:text-sm shadow-md shadow-[#FA8D1E]/20 transition-all mt-3 disabled:opacity-50 cursor-pointer"
                    type="submit"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white!" />
                        <span className="text-white!">Guardando en sistema...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-4 w-4 text-white!" />
                        <span className="text-white!">Enviar mi inscripción</span>
                        <ArrowRight className="h-4 w-4 text-white!" />
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