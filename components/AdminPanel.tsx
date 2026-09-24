'use client'

import { useState, useEffect, useMemo } from 'react'
import {
    CheckCircle2,
    CircleDollarSign,
    Download,
    Lock,
    Search,
    ShieldCheck,
    Trophy,
    Users,
    LogOut,
    Loader2,
    ArrowRight
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { exportParticipantsPDF } from '@/lib/generatePDF'
import { Footer } from '@/components/Footer'

export type Participant = {
    id: number
    name: string
    cedula: string
    phone?: string
    category: string
    payment: string
    date: string
    status: 'Verificado' | 'Pendiente'
    blocked: boolean
    amount_usd?: number
}

// Formateador numérico: DD/MM/YYYY
function formatDisplayDate(rawDate?: string): string {
    if (!rawDate) return '--/--/----'

    const cleanDateStr = rawDate.split('T')[0]
    const parts = cleanDateStr.split('-')

    if (parts.length === 3 && parts[0].length === 4) {
        const [year, month, day] = parts
        return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
    }

    const d = new Date(rawDate)
    if (isNaN(d.getTime())) return rawDate

    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
}

export function AdminPanel({ onBack }: { onBack: () => void }) {
    const [session, setSession] = useState<any>(null)
    const [loadingAuth, setLoadingAuth] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authError, setAuthError] = useState<string | null>(null)
    const [authLoading, setAuthLoading] = useState(false)

    const [participants, setParticipants] = useState<Participant[]>([])
    const [query, setQuery] = useState('')
    const [filterCategory, setFilterCategory] = useState('Todas')
    const [filterStatus, setFilterStatus] = useState('Todos')
    const [loadingData, setLoadingData] = useState(false)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoadingAuth(false)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    const fetchParticipants = async () => {
        setLoadingData(true)
        const { data, error } = await supabase
            .from('participants')
            .select('*')
            .order('id', { ascending: false })

        if (!error && data) {
            const mapped: Participant[] = data.map((item) => ({
                id: item.id,
                name: item.name,
                cedula: item.cedula,
                phone: item.phone,
                category: item.category,
                payment: item.payment_ref,
                date: item.payment_date,
                status: item.status,
                blocked: item.blocked,
                amount_usd: item.amount_usd,
            }))
            setParticipants(mapped)
        }
        setLoadingData(false)
    }

    useEffect(() => {
        if (session) {
            fetchParticipants()
        }
    }, [session])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setAuthLoading(true)
        setAuthError(null)

        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            setAuthError('Correo o contraseña incorrectos.')
        }
        setAuthLoading(false)
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setSession(null)
    }

    const toggleStatus = async (id: number, currentStatus: string) => {
        const nextStatus = currentStatus === 'Verificado' ? 'Pendiente' : 'Verificado'
        setParticipants((prev) =>
            prev.map((p) => (p.id === id ? { ...p, status: nextStatus as any } : p))
        )
        await supabase.from('participants').update({ status: nextStatus }).eq('id', id)
    }

    const toggleBlocked = async (id: number, currentBlocked: boolean) => {
        const nextBlocked = !currentBlocked
        setParticipants((prev) =>
            prev.map((p) => (p.id === id ? { ...p, blocked: nextBlocked } : p))
        )
        await supabase.from('participants').update({ blocked: nextBlocked }).eq('id', id)
    }

    const filtered = useMemo(() => {
        return participants.filter((p) => {
            const matchesQuery = `${p.name} ${p.cedula} ${p.payment}`.toLowerCase().includes(query.toLowerCase())
            const matchesCategory = filterCategory === 'Todas' || p.category === filterCategory
            const matchesStatus = filterStatus === 'Todos' || p.status === filterStatus
            return matchesQuery && matchesCategory && matchesStatus
        })
    }, [participants, query, filterCategory, filterStatus])

    const verifiedCount = participants.filter((p) => p.status === 'Verificado').length
    const totalUSD = participants.reduce((sum, p) => sum + (p.amount_usd || 0), 0)

    if (loadingAuth) {
        return (
            <main className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </main>
        )
    }

    // VISTA 1: LOGIN CENTRADO CON FOOTER
    if (!session) {
        return (
            <div className="flex flex-col justify-between min-h-[85vh]">
                <div className="w-full flex-1 flex items-center justify-center px-4 py-12">
                    <div
                        style={{ maxWidth: '420px', width: '100%' }}
                        className="rounded-[28px] bg-white border border-[#e2e8f0] p-7 sm:p-8 shadow-xl shadow-slate-200/50"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-6 h-6" />
                        </div>

                        <h2 className="text-xl font-black text-center text-[#071b3b] m-0">
                            Acceso Administrativo
                        </h2>
                        <p className="text-xs text-center text-[#53627a] mt-1.5 mb-6 leading-relaxed">
                            Ingresa con tu cuenta de organizador para gestionar los atletas registrados.
                        </p>

                        {authError && (
                            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-600 font-semibold text-center">
                                {authError}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-[#071b3b] mb-1">
                                    Correo Electrónico
                                </label>
                                <input
                                    required
                                    type="email"
                                    placeholder="admin@expodeporte.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-[#f6f8fb] text-xs sm:text-sm text-[#071b3b] focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#071b3b] mb-1">
                                    Contraseña
                                </label>
                                <input
                                    required
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-[#f6f8fb] text-xs sm:text-sm text-[#071b3b] focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all"
                                />
                            </div>

                            <button
                                disabled={authLoading}
                                type="submit"
                                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50 mt-2 cursor-pointer"
                            >
                                {authLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" /> Verificando...
                                    </>
                                ) : (
                                    <>
                                        Iniciar Sesión <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <button
                            onClick={onBack}
                            className="w-full text-center text-xs text-[#53627a] hover:text-[#071b3b] font-bold mt-6 block transition-colors cursor-pointer"
                        >
                            ← Volver a la página principal
                        </button>
                    </div>
                </div>
                <Footer logo="alcaldia.jpg" />
            </div>
        )
    }

    // VISTA 2: PANEL ADMINISTRATIVO CON FOOTER
    return (
        <div className="flex flex-col min-h-screen justify-between">
            <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8 w-full flex-1">
                <div className="flex items-center justify-between pb-6 border-b border-[#e2e8f0]">
                    <button
                        onClick={onBack}
                        className="text-xs font-bold text-[#53627a] hover:text-[#071b3b] transition-colors cursor-pointer"
                    >
                        ← Volver al sitio
                    </button>
                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-[11px] font-bold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Supabase Activo
                        </span>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                        >
                            <LogOut className="h-3.5 w-3.5" /> Salir
                        </button>
                    </div>
                </div>

                <div className="my-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs uppercase font-bold tracking-widest text-[#ee751b]">
                                Control Central
                            </span>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                                INADEMAR
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-[#071b3b] m-0">
                            Panel de <span className="text-[#ee751b]">Inscripciones</span>
                        </h1>
                        <p className="text-xs sm:text-sm text-[#53627a] mt-1">
                            Gestiona competidores, verifica depósitos bancarios y descarga listas oficiales.
                        </p>
                    </div>

                    {/* Botones de Descarga en PDF con Acabado Profesional y Acentos Deportivos */}
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => exportParticipantsPDF(participants, 'general')}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#071b3b] hover:bg-[#0c2b5e] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                        >
                            <Download className="h-3.5 w-3.5 text-emerald-400" /> PDF General
                        </button>
                        <button
                            onClick={() => exportParticipantsPDF(participants, '10k')}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-[#e2e8f0] hover:border-[#ee751b] text-[#071b3b] hover:text-[#ee751b] font-bold text-xs shadow-xs transition-all cursor-pointer"
                        >
                            <Download className="h-3.5 w-3.5 text-[#ee751b]" /> PDF 10K
                        </button>
                        <button
                            onClick={() => exportParticipantsPDF(participants, '5k')}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 font-bold text-xs shadow-xs transition-all cursor-pointer"
                        >
                            <Download className="h-3.5 w-3.5 text-emerald-600" /> PDF 5K
                        </button>
                    </div>
                </div>

                {/* Tarjetas métricas */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="rounded-[22px] bg-white border border-[#e2e8f0] p-4 shadow-sm">
                        <Users className="text-[#ee751b] mb-1 h-5 w-5" />
                        <span className="block text-[10px] uppercase font-bold text-[#53627a]">Total Atletas</span>
                        <strong className="text-xl font-black text-[#071b3b]">{participants.length}</strong>
                        <small className="block text-[10px] text-[#53627a]">Base Supabase</small>
                    </div>
                    <div className="rounded-[22px] border border-emerald-200 p-4 shadow-sm bg-emerald-50/20">
                        <CheckCircle2 className="text-emerald-600 mb-1 h-5 w-5" />
                        <span className="block text-[10px] uppercase font-bold text-emerald-800">Verificados</span>
                        <strong className="text-xl font-black text-emerald-700">{verifiedCount}</strong>
                        <small className="block text-[10px] text-emerald-700/80">Pagos conciliados</small>
                    </div>
                    <div className="rounded-[22px] bg-white border border-[#e2e8f0] p-4 shadow-sm">
                        <CircleDollarSign className="text-emerald-600 mb-1 h-5 w-5" />
                        <span className="block text-[10px] uppercase font-bold text-[#53627a]">Recaudación</span>
                        <strong className="text-xl font-black text-[#071b3b]">${totalUSD}</strong>
                        <small className="block text-[10px] text-[#53627a]">USD acumulados</small>
                    </div>
                    <div className="rounded-[22px] bg-white border border-[#e2e8f0] p-4 shadow-sm">
                        <Trophy className="text-[#ee751b] mb-1 h-5 w-5" />
                        <span className="block text-[10px] uppercase font-bold text-[#53627a]">Eventos Arancelados</span>
                        <strong className="text-xl font-black text-[#071b3b]">2</strong>
                        <small className="block text-[10px] text-[#53627a]">10K & 5K Nocturna</small>
                    </div>
                </div>

                {/* Barra de filtros */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#53627a]" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar por atleta, cédula o referencia..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e2e8f0] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/40 shadow-sm"
                        />
                    </div>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-white text-xs font-semibold focus:outline-none shadow-sm cursor-pointer"
                    >
                        <option value="Todas">Todas las modalidades</option>
                        <option value="Carrera 10K">Carrera 10K</option>
                        <option value="Caminata 5k Nocturna">Caminata 5k Nocturna</option>
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-white text-xs font-semibold focus:outline-none shadow-sm cursor-pointer"
                    >
                        <option value="Todos">Todos los estados</option>
                        <option value="Verificado">Verificado</option>
                        <option value="Pendiente">Pendiente</option>
                    </select>
                </div>

                {/* Tabla de competidores */}
                <div className="rounded-[28px] bg-white border border-[#e2e8f0] overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
                        <h2 className="text-sm font-black text-[#071b3b] m-0">Atletas Registrados</h2>
                        <span className="text-xs text-[#53627a] font-semibold">{filtered.length} registros</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="border-b border-[#e2e8f0] bg-[#f6f8fb] text-[#53627a] font-bold">
                                    <th className="p-4">Competidor</th>
                                    <th className="p-4">Modalidad</th>
                                    <th className="p-4">Referencia</th>
                                    <th className="p-4">Fecha</th>
                                    <th className="p-4">Pago</th>
                                    <th className="p-4">Acceso</th>
                                    <th className="p-4 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((p) => (
                                    <tr key={p.id} className={`border-b border-[#e2e8f0] ${p.blocked ? 'opacity-40 bg-red-50/30' : ''}`}>
                                        <td className="p-4">
                                            <strong className="block text-[#071b3b] font-bold">{p.name}</strong>
                                            <small className="text-[11px] text-[#53627a]">{p.cedula}</small>
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${p.category === 'Caminata 5k Nocturna'
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                        : 'bg-[#ee751b]/10 text-[#ee751b]'
                                                    }`}
                                            >
                                                {p.category}
                                            </span>
                                        </td>
                                        <td className="p-4 font-mono text-[11px]">{p.payment}</td>
                                        <td className="p-4 text-[#53627a] font-medium">{formatDisplayDate(p.date)}</td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => toggleStatus(p.id, p.status)}
                                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${p.status === 'Verificado'
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                                                    }`}
                                            >
                                                {p.status === 'Verificado' ? (
                                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                                ) : (
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                )}
                                                {p.status}
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            {p.blocked ? (
                                                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                                                    Bloqueado
                                                </span>
                                            ) : (
                                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                                    Activo
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => toggleBlocked(p.id, p.blocked)}
                                                title="Bloquear o desbloquear atleta"
                                                className="p-1.5 rounded-lg border border-[#e2e8f0] text-[#53627a] hover:text-[#071b3b] hover:bg-[#f6f8fb] transition-all cursor-pointer"
                                            >
                                                {p.blocked ? (
                                                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                                ) : (
                                                    <Lock className="w-4 h-4 text-red-500" />
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer logo="alcaldia.jpg" />
        </div>
    )
}