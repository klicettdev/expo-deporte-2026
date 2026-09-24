import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Participant } from '@/components/AdminPanel'

async function getBase64ImageFromUrl(imageUrl: string): Promise<string | null> {
    try {
        const res = await fetch(imageUrl)
        if (!res.ok) return null
        const blob = await res.blob()
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result as string)
            reader.onerror = () => resolve(null)
            reader.readAsDataURL(blob)
        })
    } catch {
        return null
    }
}

function formatNumericDate(rawDate?: string): string {
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

export async function exportParticipantsPDF(
    participants: Participant[],
    mode: 'general' | '10k' | '5k'
) {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

    let reportTitle = 'CONSOLIDADO GENERAL DE PARTICIPANTES'
    let reportSubtitle = 'CARRERA 10K COMPETITIVA & CAMINATA 5K NOCTURNA'
    let data = [...participants]

    if (mode === '10k') {
        reportTitle = 'LISTA OFICIAL DE COMPETIDORES — CARRERA 10K'
        reportSubtitle = 'EVENTO CENTRAL ARANCELADO CON PREMIACIÓN EN METÁLICO'
        data = participants.filter((p) => p.category === 'Carrera 10K')
    } else if (mode === '5k') {
        reportTitle = 'LISTA OFICIAL DE PARTICIPANTES — CAMINATA 5K NOCTURNA'
        reportSubtitle = 'EVENTO CENTRAL ARANCELADO RECREATIVO CON ENTREGA DE KIT'
        data = participants.filter((p) => p.category === 'Caminata 5k Nocturna')
    }

    const [logoExpoBase64, logoAlcaldiaBase64] = await Promise.all([
        getBase64ImageFromUrl('/logo.jpeg'),
        getBase64ImageFromUrl('/alcaldia.jpg'),
    ])

    doc.setFillColor(7, 27, 59)
    doc.rect(0, 0, pageWidth, 4.5, 'F')

    doc.setFillColor(238, 117, 27)
    doc.rect(0, 4.5, pageWidth, 1.2, 'F')

    if (logoExpoBase64) {
        try {
            doc.addImage(logoExpoBase64, 'JPEG', 14, 8, 22, 22)
        } catch { }
    }

    if (logoAlcaldiaBase64) {
        try {
            doc.addImage(logoAlcaldiaBase64, 'JPEG', pageWidth - 46, 8, 32, 20)
        } catch { }
    }

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(7, 27, 59)
    doc.text('ALCALDÍA BOLIVARIANA DE SANTIAGO MARIÑO', pageWidth / 2, 12, { align: 'center' })

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(238, 117, 27)
    doc.text('INADEMAR — INSTITUTO AUTÓNOMO PARA EL DEPORTE DE MARIÑO', pageWidth / 2, 17, { align: 'center' })

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(7, 27, 59)
    doc.text(reportTitle, pageWidth / 2, 23, { align: 'center' })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(83, 98, 122)
    doc.text(reportSubtitle, pageWidth / 2, 27.5, { align: 'center' })

    const now = new Date()
    const nowFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`
    const verifiedCount = data.filter((p) => p.status === 'Verificado').length
    const pendingCount = data.length - verifiedCount
    const totalUSD = data.reduce((acc, p) => acc + (p.amount_usd || 0), 0)

    const cardX = 14
    const cardY = 32
    const cardW = pageWidth - 28
    const cardH = 11

    doc.setDrawColor(226, 232, 240)
    doc.setFillColor(246, 248, 251)
    doc.roundedRect(cardX, cardY, cardW, cardH, 2, 2, 'FD')

    const colWidth = cardW / 5
    const textY = cardY + 7

    doc.setFontSize(7.5)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(7, 27, 59)
    doc.text('Emisión: ', cardX + 4, textY)
    doc.setFont('helvetica', 'normal')
    doc.text(nowFormatted, cardX + 17, textY)

    doc.setFont('helvetica', 'bold')
    doc.text('Total Atletas: ', cardX + colWidth + 4, textY)
    doc.setFont('helvetica', 'normal')
    doc.text(String(data.length), cardX + colWidth + 24, textY)

    doc.setFont('helvetica', 'bold')
    doc.setTextColor(5, 150, 105)
    doc.text('Verificados: ', cardX + colWidth * 2 + 4, textY)
    doc.setFont('helvetica', 'normal')
    doc.text(String(verifiedCount), cardX + colWidth * 2 + 22, textY)

    doc.setFont('helvetica', 'bold')
    doc.setTextColor(217, 119, 6)
    doc.text('Pendientes: ', cardX + colWidth * 3 + 4, textY)
    doc.setFont('helvetica', 'normal')
    doc.text(String(pendingCount), cardX + colWidth * 3 + 22, textY)

    doc.setFont('helvetica', 'bold')
    doc.setTextColor(7, 27, 59)
    doc.text('Recaudación: ', cardX + colWidth * 4 + 4, textY)
    doc.setFont('helvetica', 'normal')
    doc.text(`$${totalUSD.toLocaleString('es-VE')} USD`, cardX + colWidth * 4 + 24, textY)

    const tableRows = data.map((p, index) => [
        index + 1,
        p.name.toUpperCase(),
        p.cedula,
        p.phone || 'N/A',
        p.category,
        p.payment || 'N/A',
        formatNumericDate(p.date),
        p.status.toUpperCase(),
        p.blocked ? 'BLOQUEADO' : 'ACTIVO',
    ])

    autoTable(doc, {
        startY: 46,
        head: [['#', 'ATLETA', 'CÉDULA', 'TELÉFONO', 'DISCIPLINA', 'REFERENCIA', 'FECHA PAGO', 'ESTADO', 'ACCESO']],
        body: tableRows,
        theme: 'grid',
        headStyles: {
            fillColor: [7, 27, 59],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            fontSize: 7.5,
            halign: 'center',
            cellPadding: 2,
        },
        bodyStyles: {
            fontSize: 7.5,
            textColor: [15, 23, 42],
            valign: 'middle',
            cellPadding: 2,
        },
        columnStyles: {
            0: { halign: 'center', cellWidth: 10 },
            1: { cellWidth: 62 },
            2: { halign: 'center', cellWidth: 26 },
            3: { halign: 'center', cellWidth: 28 },
            4: { halign: 'center', cellWidth: 44 },
            5: { halign: 'center', cellWidth: 32 },
            6: { halign: 'center', cellWidth: 24 },
            7: { halign: 'center', cellWidth: 24 },
            8: { halign: 'center', cellWidth: 19 },
        },
        alternateRowStyles: {
            fillColor: [248, 250, 252],
        },
        didParseCell: (dataCell) => {
            if (dataCell.section === 'body' && dataCell.column.index === 7) {
                if (dataCell.cell.raw === 'VERIFICADO') {
                    dataCell.cell.styles.textColor = [5, 150, 105]
                    dataCell.cell.styles.fontStyle = 'bold'
                } else {
                    dataCell.cell.styles.textColor = [217, 119, 6]
                    dataCell.cell.styles.fontStyle = 'bold'
                }
            }
            if (dataCell.section === 'body' && dataCell.column.index === 8) {
                if (dataCell.cell.raw === 'BLOQUEADO') {
                    dataCell.cell.styles.textColor = [220, 38, 38]
                    dataCell.cell.styles.fontStyle = 'bold'
                } else {
                    dataCell.cell.styles.textColor = [16, 185, 129]
                }
            }
        },
        didDrawPage: (hookData) => {
            const pageStr = `Página ${hookData.pageNumber} de ${doc.internal.pages.length - 1}`
            doc.setFontSize(7.5)
            doc.setFont('helvetica', 'normal')
            doc.setTextColor(148, 163, 184)
            doc.text(
                'EXPO DEPORTE 2026 — Documento de Control Interno emitido por la Dirección Técnica de INADEMAR',
                14,
                pageHeight - 6
            )
            doc.text(pageStr, pageWidth - 14, pageHeight - 6, { align: 'right' })

            doc.setDrawColor(226, 232, 240)
            doc.line(14, pageHeight - 9, pageWidth - 14, pageHeight - 9)
        },
    })

    const fileName = `Reporte_ExpoDeporte2026_${mode.toUpperCase()}_${nowFormatted.replace(/\//g, '-')}.pdf`
    doc.save(fileName)
}