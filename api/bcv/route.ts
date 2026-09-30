import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const response = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`DolarApi respondió con status ${response.status}`);
    }

    const data = await response.json();
    const tasa = Number(data?.promedio ?? data?.venta ?? data?.compra ?? 0);

    return NextResponse.json(
      { tasa },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  } catch (error) {
    console.error('API BCV Dollar Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener la tasa', tasa: 0 },
      { status: 500 }
    );
  }
}