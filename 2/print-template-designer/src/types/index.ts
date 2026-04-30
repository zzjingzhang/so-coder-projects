export type ElementType = 'text' | 'image' | 'longText' | 'table' | 'html' | 'barcode' | 'qrcode'

export interface PrintElement {
  id: string
  type: ElementType
  x: number
  y: number
  width: number
  height: number
  content: string
  fontSize?: number
  fontFamily?: string
  fontWeight?: string
  color?: string
  textAlign?: 'left' | 'center' | 'right'
  rotation?: number
  tableData?: TableData
  barcodeFormat?: string
  qrcodeErrorLevel?: 'L' | 'M' | 'Q' | 'H'
}

export interface TableData {
  headers: string[]
  rows: string[][]
}

export interface PaperSize {
  name: string
  width: number
  height: number
}

export const PAPER_SIZES: Record<string, PaperSize> = {
  A3: { name: 'A3', width: 841, height: 1190 },
  A4: { name: 'A4', width: 595, height: 842 },
  A5: { name: 'A5', width: 420, height: 595 },
  B3: { name: 'B3', width: 1000, height: 1414 },
  B4: { name: 'B4', width: 707, height: 1000 },
  B5: { name: 'B5', width: 500, height: 707 },
}

export interface Template {
  name: string
  paperSize: PaperSize
  rotation: number
  elements: PrintElement[]
  createdAt: string
}
