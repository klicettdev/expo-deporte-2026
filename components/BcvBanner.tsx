import { DollarSign, RefreshCw, AlertCircle } from "lucide-react";
import { BcvBannerProps } from "@/interfaces/banner.interface";

export function BcvBanner({ rate, loading, error }: BcvBannerProps) {
    return (
        <div className="w-full bg-slate-900 border-b border-slate-800 text-slate-300 text-xs py-2 px-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold tracking-wide text-white uppercase">Tasa Oficial BCV:</span>
                    {loading ? (
                        <span className="flex items-center gap-1 text-slate-400">
                            <RefreshCw className="w-3 h-3 animate-spin" /> Actualizando...
                        </span>
                    ) : (
                        <span className="text-emerald-400 font-bold text-sm">
                            Bs. {rate ? rate.toFixed(2) : "--"} / USD
                        </span>
                    )}
                </div>
                {error && (
                    <div className="hidden sm:flex items-center gap-1 text-amber-400">
                        <AlertCircle className="w-3 h-3" />
                        <span>{error}</span>
                    </div>
                )}
            </div>
        </div>
    );
}