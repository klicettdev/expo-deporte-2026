'use client'

import { useState, useEffect } from 'react'

export function useBCVRate() {
  const [rate, setRate] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchRate() {
      try {
        setLoading(true)
        setError(null)

        // 1. Intentar primero a la API oficial directa (sin pasar por /api/bcv local)
        const res = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', {
          cache: 'no-store',
        })

        if (!res.ok) {
          throw new Error('Fallo al consultar la tasa oficial')
        }

        const data = await res.json()
        const valorTasa = Number(data?.promedio ?? data?.venta ?? data?.compra ?? 0)

        if (isMounted) {
          if (valorTasa > 0) {
            setRate(valorTasa)
          } else {
            throw new Error('Tasa no válida')
          }
        }
      } catch (err: any) {
        console.error('Error obteniendo tasa BCV:', err)
        if (isMounted) {
          setError(err.message || 'Error al obtener la tasa')
          // Fallback de contingencia si no hay internet
          setRate(857.89)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchRate()

    return () => {
      isMounted = false
    }
  }, [])

  return { rate, loading, error }
}