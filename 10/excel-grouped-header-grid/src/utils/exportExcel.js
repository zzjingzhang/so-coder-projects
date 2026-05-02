import * as XLSX from 'xlsx'

const getMaxDepth = (columns) => {
  let maxDepth = 1
  columns.forEach(col => {
    if (col.children && col.children.length > 0) {
      const childDepth = getMaxDepth(col.children) + 1
      maxDepth = Math.max(maxDepth, childDepth)
    }
  })
  return maxDepth
}

const getLeafColumns = (columns) => {
  const leaves = []
  columns.forEach(col => {
    if (col.children && col.children.length > 0) {
      leaves.push(...getLeafColumns(col.children))
    } else {
      leaves.push(col)
    }
  })
  return leaves
}

const buildHeaderMatrix = (columns, maxDepth) => {
  const matrix = Array(maxDepth).fill(null).map(() => [])
  const merges = []

  const processColumns = (cols, depth, startCol = 0) => {
    let currentCol = startCol
    cols.forEach(col => {
      if (col.children && col.children.length > 0) {
        const leafCount = getLeafColumns([col]).length
        matrix[depth][currentCol] = col.title
        
        merges.push({
          s: { r: depth, c: currentCol },
          e: { r: depth, c: currentCol + leafCount - 1 }
        })
        
        processColumns(col.children, depth + 1, currentCol)
        currentCol += leafCount
      } else {
        const rowSpan = maxDepth - depth
        matrix[depth][currentCol] = col.title
        
        if (rowSpan > 1) {
          merges.push({
            s: { r: depth, c: currentCol },
            e: { r: depth + rowSpan - 1, c: currentCol }
          })
          
          for (let i = depth + 1; i < depth + rowSpan; i++) {
            matrix[i][currentCol] = ''
          }
        }
        currentCol += 1
      }
    })
  }

  processColumns(columns, 0, 0)
  
  const leafColumns = getLeafColumns(columns)
  const totalCols = leafColumns.length
  for (let i = 0; i < maxDepth; i++) {
    for (let j = 0; j < totalCols; j++) {
      if (matrix[i][j] === undefined) {
        matrix[i][j] = ''
      }
    }
  }

  return { matrix, merges }
}

export const exportToExcel = (columns, data, fileName = 'export.xlsx') => {
  const maxDepth = getMaxDepth(columns)
  const { matrix, merges } = buildHeaderMatrix(columns, maxDepth)
  const leafColumns = getLeafColumns(columns)

  const wsData = [...matrix]

  data.forEach(row => {
    const dataRow = leafColumns.map(col => {
      if (col.render) {
        const rendered = col.render(row[col.key], row, data.indexOf(row))
        if (typeof rendered === 'object' && rendered.props) {
          return row[col.key]
        }
        return rendered
      }
      return row[col.key]
    })
    wsData.push(dataRow)
  })

  const ws = XLSX.utils.aoa_to_sheet(wsData)

  if (merges.length > 0) {
    ws['!merges'] = merges
  }

  const colWidths = leafColumns.map(col => ({
    wch: col.width ? Math.round(col.width / 7) : 15
  }))
  ws['!cols'] = colWidths

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  XLSX.writeFile(wb, fileName)
}

export default exportToExcel
