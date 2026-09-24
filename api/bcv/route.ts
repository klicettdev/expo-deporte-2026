import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Fallo al consultar la tasa oficial en DolarApi');
    }

    const data = await response.json();
    const tasa = data?.promedio || data?.venta || data?.compra || 0;

    return NextResponse.json({ tasa }, { status: 200 });
  } catch (error) {
    console.error('API BCV Dollar Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener la tasa', tasa: 0 },
      { status: 500 }
    );
  }
}