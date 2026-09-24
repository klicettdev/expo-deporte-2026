'use client';

import { useState, useEffect } from 'react';

export function useBCVRate() {
  const [rate, setRate] = useState<number>(832.48);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRate() {
      try {
        setLoading(true);
        const res = await fetch('/api/bcv');
        
        if (!res.ok) {
          throw new Error('Fallo al consultar el endpoint interno');
        }
        
        const data = await res.json();
        
        if (typeof data?.tasa === 'number' && data.tasa > 0) {
          setRate(data.tasa);
          setError(null);
        } else {
          throw new Error('Tasa recibida inválida o en 0');
        }
      } catch (err: any) {
        setError(err?.message || 'Error al obtener la tasa en vivo');
      } finally {
        setLoading(false);
      }
    }

    fetchRate();
  }, []);

  return { rate, loading, error };
}