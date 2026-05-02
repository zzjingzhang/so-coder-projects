import React from 'react'

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

const buildHeaderRows = (columns, maxDepth, currentDepth = 0) => {
  const rows = Array(maxDepth).fill(null).map(() => [])

  const processColumns = (cols, depth) => {
    cols.forEach(col => {
      if (col.children && col.children.length > 0) {
        const colSpan = getLeafColumns([col]).length
        const rowSpan = 1
        rows[depth].push({ ...col, colSpan, rowSpan, isGroup: true })
        processColumns(col.children, depth + 1)
      } else {
        const rowSpan = maxDepth - depth
        rows[depth].push({ ...col, colSpan: 1, rowSpan, isGroup: false })
      }
    })
  }

  processColumns(columns, 0)
  return rows
}

const GridControl = ({ columns, data, className = '' }) => {
  const maxDepth = getMaxDepth(columns)
  const headerRows = buildHeaderRows(columns, maxDepth)
  const leafColumns = getLeafColumns(columns)

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="border-collapse w-full">
        <thead>
          {headerRows.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-gray-100">
              {row.map((col, colIndex) => (
                <th
                  key={colIndex}
                  colSpan={col.colSpan}
                  rowSpan={col.rowSpan}
                  className="border border-gray-300 px-4 py-2 text-center font-semibold"
                  style={{
                    backgroundColor: col.isGroup ? '#e5e7eb' : '#f3f4f6',
                    minWidth: col.width ? `${col.width}px` : '120px',
                  }}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {leafColumns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  {col.render ? col.render(row[col.key], row, rowIndex) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GridControl
