import { getClients } from '@/actions/Client'
import { IClient } from '@/models/Client'
import * as XLSX from 'xlsx'
import { z } from 'zod'

export async function GET() {
  try {
    const [data] = await getClients()

    const formattedData = JSON.parse(data as string).map((data: IClient) => {
      const date = new Date(data.joinDate)
      const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        numberingSystem: 'latn'
      })

      return {
        'نام و نام خانوادگی': data.name,
        'آدرس ایمیل': data.email,
        'شماره تماس': data.phoneNumber,
        'تاریخ عضویت': formatter.format(date).replace(/‎/g, ''),
        'وضعیت حساب کاربری': data.status === "hired" ? "استخدام شده" : "اخراج شده"
      }
    })

    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(formattedData)

    ws['!cols'] = [
      { wch: 25 }, // نام و نام خانوادگی
      { wch: 30 }, // آدرس ایمیل
      { wch: 15 }, // شماره تماس
      { wch: 20 }, // تاریخ عضویت
      { wch: 20 } // وضعیت حساب کاربری
    ]

    const range = XLSX.utils.decode_range(ws['!ref']!)
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C }) // First row cells
      if (!ws[cellAddress]) continue
      ws[cellAddress].s = { font: { bold: true } } // Make header bold
    }

    XLSX.utils.book_append_sheet(wb, ws, 'Clients')

    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

    return new Response(buf, {
      status: 200,
      headers: {
        'Content-Disposition': `attachment; filename="report.xlsx"`,
        'Content-Type': 'application/vnd.ms-excel'
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      return new Response(error.message, {
        status: 400
      })
    }
  }
}
