import type { PrintElement, ElementType } from '../types'

export function generateId(): string {
  return 'elem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

export function createDefaultElement(type: ElementType): PrintElement {
  const baseElement: PrintElement = {
    id: generateId(),
    type,
    x: 50,
    y: 50,
    width: 200,
    height: 50,
    content: '',
    fontSize: 14,
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'normal',
    color: '#000000',
    textAlign: 'left',
    rotation: 0,
  }

  switch (type) {
    case 'text':
      return { ...baseElement, content: '文本内容', width: 150, height: 30 }
    case 'longText':
      return { ...baseElement, content: '这是一段长文本内容，可以支持多行显示。\n支持换行符和自动换行。', width: 300, height: 100 }
    case 'image':
      return { ...baseElement, content: '', width: 150, height: 150 }
    case 'table':
      return {
        ...baseElement,
        content: '',
        width: 400,
        height: 150,
        tableData: {
          headers: ['列1', '列2', '列3'],
          rows: [
            ['数据1', '数据2', '数据3'],
            ['数据4', '数据5', '数据6'],
          ]
        }
      }
    case 'html':
      return {
        ...baseElement,
        content: '<div style="padding: 10px; border: 1px solid #ccc;"><h4>自定义HTML</h4><p>支持HTML标签渲染</p></div>',
        width: 250,
        height: 100
      }
    case 'barcode':
      return { ...baseElement, content: '1234567890', width: 200, height: 60, barcodeFormat: 'CODE128' }
    case 'qrcode':
      return { ...baseElement, content: 'https://example.com', width: 120, height: 120, qrcodeErrorLevel: 'M' }
    default:
      return baseElement
  }
}

export function cloneElement(element: PrintElement): PrintElement {
  return {
    ...element,
    id: generateId(),
    x: element.x + 20,
    y: element.y + 20,
    tableData: element.tableData ? JSON.parse(JSON.stringify(element.tableData)) : undefined,
  }
}
