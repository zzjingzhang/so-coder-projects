import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { ColorPicker } from 'primereact/colorpicker';
import { Dropdown } from 'primereact/dropdown';
import TableToolbar from './TableToolbar';

const RichTextEditor = () => {
  const editorRef = useRef(null);
  const [showTableDialog, setShowTableDialog] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [selectedCell, setSelectedCell] = useState(null);
  const [showTableToolbar, setShowTableToolbar] = useState(false);
  const [tableToolbarPosition, setTableToolbarPosition] = useState({ top: 0, left: 0 });
  const [tableBorderColor, setTableBorderColor] = useState('#000000');
  const [tableBorderWidth, setTableBorderWidth] = useState(1);
  const [tableCellBgColor, setTableCellBgColor] = useState('#ffffff');
  const [tableTextColor, setTableTextColor] = useState('#000000');
  const [tableAlign, setTableAlign] = useState('left');

  const alignOptions = [
    { label: '左对齐', value: 'left' },
    { label: '居中', value: 'center' },
    { label: '右对齐', value: 'right' },
  ];

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const insertTable = () => {
    let tableHTML = '<table style="border-collapse: collapse; width: 100%;">';
    for (let i = 0; i < tableRows; i++) {
      tableHTML += '<tr>';
      for (let j = 0; j < tableCols; j++) {
        tableHTML += `<td style="border: ${tableBorderWidth}px solid ${tableBorderColor}; padding: 8px; min-width: 100px; min-height: 40px;">&nbsp;</td>`;
      }
      tableHTML += '</tr>';
    }
    tableHTML += '</table><p>&nbsp;</p>';
    
    execCommand('insertHTML', tableHTML);
    setShowTableDialog(false);
    setTableRows(3);
    setTableCols(3);
  };

  const handleEditorClick = (e) => {
    const cell = e.target.closest('td, th');
    if (cell) {
      setSelectedCell(cell);
      const rect = cell.getBoundingClientRect();
      setTableToolbarPosition({
        top: rect.top - 50,
        left: rect.left
      });
      setShowTableToolbar(true);
    } else {
      setShowTableToolbar(false);
      setSelectedCell(null);
    }
  };

  const insertRowAbove = () => {
    if (!selectedCell) return;
    const row = selectedCell.closest('tr');
    const table = row.closest('table');
    const newRow = row.cloneNode(true);
    const cells = newRow.querySelectorAll('td, th');
    cells.forEach(cell => {
      cell.innerHTML = '&nbsp;';
    });
    table.insertBefore(newRow, row);
  };

  const insertRowBelow = () => {
    if (!selectedCell) return;
    const row = selectedCell.closest('tr');
    const table = row.closest('table');
    const newRow = row.cloneNode(true);
    const cells = newRow.querySelectorAll('td, th');
    cells.forEach(cell => {
      cell.innerHTML = '&nbsp;';
    });
    row.parentNode.insertBefore(newRow, row.nextSibling);
  };

  const insertColLeft = () => {
    if (!selectedCell) return;
    const table = selectedCell.closest('table');
    const cellIndex = Array.from(selectedCell.parentNode.children).indexOf(selectedCell);
    
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
      const cell = row.children[cellIndex];
      if (cell) {
        const newCell = cell.cloneNode(true);
        newCell.innerHTML = '&nbsp;';
        row.insertBefore(newCell, cell);
      }
    });
  };

  const insertColRight = () => {
    if (!selectedCell) return;
    const table = selectedCell.closest('table');
    const cellIndex = Array.from(selectedCell.parentNode.children).indexOf(selectedCell);
    
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
      const cell = row.children[cellIndex];
      if (cell) {
        const newCell = cell.cloneNode(true);
        newCell.innerHTML = '&nbsp;';
        row.insertBefore(newCell, cell.nextSibling);
      }
    });
  };

  const deleteRow = () => {
    if (!selectedCell) return;
    const row = selectedCell.closest('tr');
    const table = row.closest('table');
    const rowCount = table.querySelectorAll('tr').length;
    
    if (rowCount > 1) {
      row.remove();
      setShowTableToolbar(false);
      setSelectedCell(null);
    }
  };

  const deleteCol = () => {
    if (!selectedCell) return;
    const table = selectedCell.closest('table');
    const cellIndex = Array.from(selectedCell.parentNode.children).indexOf(selectedCell);
    const colCount = selectedCell.parentNode.children.length;
    
    if (colCount > 1) {
      const rows = table.querySelectorAll('tr');
      rows.forEach(row => {
        if (row.children[cellIndex]) {
          row.children[cellIndex].remove();
        }
      });
      setShowTableToolbar(false);
      setSelectedCell(null);
    }
  };

  const mergeCells = () => {
    if (!selectedCell) return;
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const startCell = range.startContainer.closest('td, th');
      const endCell = range.endContainer.closest('td, th');
      
      if (startCell && endCell && startCell !== endCell) {
        const startRow = startCell.closest('tr');
        const endRow = endCell.closest('tr');
        const startRowIndex = Array.from(startRow.parentNode.children).indexOf(startRow);
        const endRowIndex = Array.from(endRow.parentNode.children).indexOf(endRow);
        const startColIndex = Array.from(startRow.children).indexOf(startCell);
        const endColIndex = Array.from(endRow.children).indexOf(endCell);
        
        const rowSpan = Math.abs(endRowIndex - startRowIndex) + 1;
        const colSpan = Math.abs(endColIndex - startColIndex) + 1;
        
        const minRowIndex = Math.min(startRowIndex, endRowIndex);
        const minColIndex = Math.min(startColIndex, endColIndex);
        
        const table = startCell.closest('table');
        const rows = table.querySelectorAll('tr');
        
        const firstCell = rows[minRowIndex].children[minColIndex];
        firstCell.rowSpan = rowSpan;
        firstCell.colSpan = colSpan;
        
        for (let i = minRowIndex; i < minRowIndex + rowSpan; i++) {
          for (let j = minColIndex; j < minColIndex + colSpan; j++) {
            if (i !== minRowIndex || j !== minColIndex) {
              if (rows[i] && rows[i].children[j]) {
                rows[i].children[j].remove();
              }
            }
          }
        }
      }
    }
  };

  const splitCell = () => {
    if (!selectedCell) return;
    const rowSpan = selectedCell.rowSpan || 1;
    const colSpan = selectedCell.colSpan || 1;
    
    if (rowSpan > 1 || colSpan > 1) {
      const row = selectedCell.closest('tr');
      const table = row.closest('table');
      const rowIndex = Array.from(row.parentNode.children).indexOf(row);
      const colIndex = Array.from(row.children).indexOf(selectedCell);
      const cellContent = selectedCell.innerHTML;
      
      const borderStyle = selectedCell.style.border || '1px solid #000000';
      
      selectedCell.rowSpan = 1;
      selectedCell.colSpan = 1;
      selectedCell.innerHTML = cellContent;
      
      for (let i = 0; i < rowSpan; i++) {
        const targetRow = table.querySelectorAll('tr')[rowIndex + i];
        if (targetRow) {
          for (let j = 0; j < colSpan; j++) {
            if (i === 0 && j === 0) continue;
            
            const newCell = document.createElement('td');
            newCell.style.border = borderStyle;
            newCell.style.padding = '8px';
            newCell.style.minWidth = '100px';
            newCell.style.minHeight = '40px';
            newCell.innerHTML = '&nbsp;';
            
            if (i === 0) {
              targetRow.insertBefore(newCell, selectedCell.nextSibling);
            } else {
              const insertIndex = colIndex + j;
              if (targetRow.children[insertIndex]) {
                targetRow.insertBefore(newCell, targetRow.children[insertIndex]);
              } else {
                targetRow.appendChild(newCell);
              }
            }
          }
        }
      }
    }
  };

  const applyTableStyle = () => {
    if (!selectedCell) return;
    const table = selectedCell.closest('table');
    if (table) {
      table.style.borderCollapse = 'collapse';
      table.style.textAlign = tableAlign;
      
      const cells = table.querySelectorAll('td, th');
      cells.forEach(cell => {
        cell.style.border = `${tableBorderWidth}px solid ${tableBorderColor}`;
        cell.style.backgroundColor = tableCellBgColor;
        cell.style.color = tableTextColor;
      });
    }
  };

  const deleteTable = () => {
    if (!selectedCell) return;
    const table = selectedCell.closest('table');
    if (table) {
      table.remove();
      setShowTableToolbar(false);
      setSelectedCell(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showTableToolbar && !e.target.closest('.p-dialog') && !e.target.closest('td, th')) {
        setShowTableToolbar(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showTableToolbar]);

  return (
    <div className="rich-text-editor">
      <div className="editor-toolbar flex flex-wrap gap-2 p-3 border border-gray-300 rounded-t-lg bg-gray-50">
        <Button 
          icon="pi pi-bold" 
          onClick={() => execCommand('bold')} 
          tooltip="加粗"
          className="p-button-text"
        />
        <Button 
          icon="pi pi-italic" 
          onClick={() => execCommand('italic')} 
          tooltip="斜体"
          className="p-button-text"
        />
        <Button 
          icon="pi pi-underline" 
          onClick={() => execCommand('underline')} 
          tooltip="下划线"
          className="p-button-text"
        />
        <Button 
          icon="pi pi-align-left" 
          onClick={() => execCommand('justifyLeft')} 
          tooltip="左对齐"
          className="p-button-text"
        />
        <Button 
          icon="pi pi-align-center" 
          onClick={() => execCommand('justifyCenter')} 
          tooltip="居中对齐"
          className="p-button-text"
        />
        <Button 
          icon="pi pi-align-right" 
          onClick={() => execCommand('justifyRight')} 
          tooltip="右对齐"
          className="p-button-text"
        />
        <Button 
          icon="pi pi-list" 
          onClick={() => execCommand('insertUnorderedList')} 
          tooltip="无序列表"
          className="p-button-text"
        />
        <Button 
          icon="pi pi-list-ol" 
          onClick={() => execCommand('insertOrderedList')} 
          tooltip="有序列表"
          className="p-button-text"
        />
        <Button 
          icon="pi pi-table" 
          onClick={() => setShowTableDialog(true)} 
          tooltip="插入表格"
          className="p-button-text"
        />
      </div>
      
      <div
        ref={editorRef}
        contentEditable
        className="editor-content min-h-[500px] p-4 border border-t-0 border-gray-300 rounded-b-lg focus:outline-none"
        onClick={handleEditorClick}
        placeholder="在此输入内容..."
      />
      
      <Dialog
        header="插入表格"
        visible={showTableDialog}
        onHide={() => setShowTableDialog(false)}
        style={{ width: '400px' }}
        footer={
          <div>
            <Button 
              label="取消" 
              icon="pi pi-times" 
              onClick={() => setShowTableDialog(false)} 
              className="p-button-text" 
            />
            <Button 
              label="插入" 
              icon="pi pi-check" 
              onClick={insertTable} 
              autoFocus 
            />
          </div>
        }
      >
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">行数</label>
              <InputNumber 
                value={tableRows} 
                onValueChange={(e) => setTableRows(e.value)} 
                min={1} 
                max={20}
                className="w-full"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">列数</label>
              <InputNumber 
                value={tableCols} 
                onValueChange={(e) => setTableCols(e.value)} 
                min={1} 
                max={10}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">边框颜色</label>
              <ColorPicker 
                value={tableBorderColor} 
                onChange={(e) => setTableBorderColor(e.value)} 
                format="hex"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">边框宽度</label>
              <InputNumber 
                value={tableBorderWidth} 
                onValueChange={(e) => setTableBorderWidth(e.value)} 
                min={0} 
                max={10}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">单元格背景色</label>
              <ColorPicker 
                value={tableCellBgColor} 
                onChange={(e) => setTableCellBgColor(e.value)} 
                format="hex"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">文字颜色</label>
              <ColorPicker 
                value={tableTextColor} 
                onChange={(e) => setTableTextColor(e.value)} 
                format="hex"
              />
            </div>
          </div>
          
          <div>
            <label className="block mb-2 font-medium">对齐方式</label>
            <Dropdown 
              value={tableAlign} 
              onChange={(e) => setTableAlign(e.value)} 
              options={alignOptions} 
              optionLabel="label" 
              optionValue="value"
              className="w-full"
            />
          </div>
        </div>
      </Dialog>
      
      <TableToolbar
        visible={showTableToolbar}
        position={tableToolbarPosition}
        onInsertRowAbove={insertRowAbove}
        onInsertRowBelow={insertRowBelow}
        onInsertColLeft={insertColLeft}
        onInsertColRight={insertColRight}
        onDeleteRow={deleteRow}
        onDeleteCol={deleteCol}
        onMergeCells={mergeCells}
        onSplitCell={splitCell}
        onDeleteTable={deleteTable}
        onApplyStyle={applyTableStyle}
        borderColor={tableBorderColor}
        onBorderColorChange={setTableBorderColor}
        borderWidth={tableBorderWidth}
        onBorderWidthChange={setTableBorderWidth}
        cellBgColor={tableCellBgColor}
        onCellBgColorChange={setTableCellBgColor}
        textColor={tableTextColor}
        onTextColorChange={setTableTextColor}
        align={tableAlign}
        onAlignChange={setTableAlign}
      />
    </div>
  );
};

export default RichTextEditor;
