import type { PrintElement, Template, PaperSize } from '../types'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export function exportToJSON(template: Template): string {
  return JSON.stringify(template, null, 2)
}

export function downloadJSON(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function downloadHTML(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function generateHTML(elements: PrintElement[], paperSize: PaperSize): string {
  const elementsHTML = elements.map(elem => {
    let contentHTML = ''
    
    switch (elem.type) {
      case 'text':
      case 'longText':
        contentHTML = elem.content.replace(/\n/g, '<br>')
        break
      case 'image':
        contentHTML = elem.content ? `<img src="${elem.content}" style="width:100%;height:100%;object-fit:contain;" />` : ''
        break
      case 'table':
        if (elem.tableData) {
          const headersHTML = elem.tableData.headers.map(h => `<th style="border:1px solid #000;padding:4px;">${h}</th>`).join('')
          const rowsHTML = elem.tableData.rows.map(row => 
            `<tr>${row.map(cell => `<td style="border:1px solid #000;padding:4px;">${cell}</td>`).join('')}</tr>`
          ).join('')
          contentHTML = `<table style="border-collapse:collapse;width:100%;"><thead><tr>${headersHTML}</tr></thead><tbody>${rowsHTML}</tbody></table>`
        }
        break
      case 'html':
        contentHTML = elem.content
        break
      case 'barcode':
      case 'qrcode':
        contentHTML = `<canvas class="code-canvas" data-id="${elem.id}" data-type="${elem.type}" data-content="${encodeURIComponent(elem.content)}"></canvas>`
        break
    }
    
    return `
      <div style="
        position:absolute;
        left:${elem.x}px;
        top:${elem.y}px;
        width:${elem.width}px;
        height:${elem.height}px;
        font-size:${elem.fontSize}px;
        font-family:${elem.fontFamily};
        font-weight:${elem.fontWeight};
        color:${elem.color};
        text-align:${elem.textAlign};
        transform:rotate(${elem.rotation || 0}deg);
        overflow:hidden;
      ">${contentHTML}</div>
    `
  }).join('')

  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>打印模板</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #fff; }
    .print-page {
      position: relative;
      width: ${paperSize.width}px;
      height: ${paperSize.height}px;
      margin: 0 auto;
      background: #fff;
    }
    @media print {
      .print-page { margin: 0; }
      body { background: none; }
    }
  </style>
</head>
<body>
  <div class="print-page">
    ${elementsHTML}
  </div>
</body>
</html>
  `
}

export async function printElement(elementId: string): Promise<void> {
  const element = document.getElementById(elementId)
  if (!element) return
  
  const canvas = await html2canvas(element, { scale: 2 })
  const imgData = canvas.toDataURL('image/png')
  
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [element.offsetWidth, element.offsetHeight]
  })
  
  pdf.addImage(imgData, 'PNG', 0, 0, element.offsetWidth, element.offsetHeight)
  const pdfOutput = pdf.output('bloburl')
  const printWindow = window.open(pdfOutput, '_blank')
  if (printWindow) {
    setTimeout(() => printWindow.print(), 500)
  }
}

export function openPrintPreview(elements: PrintElement[], paperSize: PaperSize): void {
  const htmlContent = generateHTML(elements, paperSize)
  const previewWindow = window.open('', '_blank')
  if (previewWindow) {
    previewWindow.document.write(htmlContent)
    previewWindow.document.close()
  }
}

export async function printDirectly(canvasElement: HTMLElement): Promise<void> {
  const canvas = await html2canvas(canvasElement, {
    scale: 2,
    backgroundColor: '#ffffff',
  })
  
  const imgData = canvas.toDataURL('image/png')
  
  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { margin: 0; }
          img { max-width: 100%; }
          @media print {
            body { margin: 0; }
          }
        </style>
      </head>
      <body>
        <img src="${imgData}" />
      </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }
}
