import React from 'react';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { ColorPicker } from 'primereact/colorpicker';
import { Dropdown } from 'primereact/dropdown';

const TableToolbar = ({
  visible,
  position,
  onInsertRowAbove,
  onInsertRowBelow,
  onInsertColLeft,
  onInsertColRight,
  onDeleteRow,
  onDeleteCol,
  onMergeCells,
  onSplitCell,
  onDeleteTable,
  onApplyStyle,
  borderColor,
  onBorderColorChange,
  borderWidth,
  onBorderWidthChange,
  cellBgColor,
  onCellBgColorChange,
  textColor,
  onTextColorChange,
  align,
  onAlignChange
}) => {
  const alignOptions = [
    { label: '左对齐', value: 'left' },
    { label: '居中', value: 'center' },
    { label: '右对齐', value: 'right' },
  ];

  if (!visible) return null;

  return (
    <div 
      className="fixed bg-white shadow-lg rounded-lg border border-gray-200 p-3 z-50"
      style={{ 
        top: `${position.top}px`, 
        left: `${position.left}px`,
        maxWidth: '400px'
      }}
    >
      <div className="grid gap-3">
        <div className="flex flex-wrap gap-2 mb-3 pb-2 border-b border-gray-200">
          <div className="text-sm font-medium text-gray-700 w-full mb-2">行操作</div>
          <Button 
            icon="pi pi-arrow-up" 
            onClick={onInsertRowAbove} 
            tooltip="上方插入行"
            className="p-button-text p-button-sm"
            label="上插行"
          />
          <Button 
            icon="pi pi-arrow-down" 
            onClick={onInsertRowBelow} 
            tooltip="下方插入行"
            className="p-button-text p-button-sm"
            label="下插行"
          />
          <Button 
            icon="pi pi-trash" 
            onClick={onDeleteRow} 
            tooltip="删除当前行"
            className="p-button-text p-button-sm p-button-danger"
            label="删除行"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3 pb-2 border-b border-gray-200">
          <div className="text-sm font-medium text-gray-700 w-full mb-2">列操作</div>
          <Button 
            icon="pi pi-arrow-left" 
            onClick={onInsertColLeft} 
            tooltip="左侧插入列"
            className="p-button-text p-button-sm"
            label="左插列"
          />
          <Button 
            icon="pi pi-arrow-right" 
            onClick={onInsertColRight} 
            tooltip="右侧插入列"
            className="p-button-text p-button-sm"
            label="右插列"
          />
          <Button 
            icon="pi pi-trash" 
            onClick={onDeleteCol} 
            tooltip="删除当前列"
            className="p-button-text p-button-sm p-button-danger"
            label="删除列"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3 pb-2 border-b border-gray-200">
          <div className="text-sm font-medium text-gray-700 w-full mb-2">单元格操作</div>
          <Button 
            icon="pi pi-compress" 
            onClick={onMergeCells} 
            tooltip="合并选中单元格"
            className="p-button-text p-button-sm"
            label="合并"
          />
          <Button 
            icon="pi pi-expand" 
            onClick={onSplitCell} 
            tooltip="拆分单元格"
            className="p-button-text p-button-sm"
            label="拆分"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-3 pb-2 border-b border-gray-200">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">边框颜色</label>
            <ColorPicker 
              value={borderColor} 
              onChange={(e) => onBorderColorChange(e.value)} 
              format="hex"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">边框宽度</label>
            <InputNumber 
              value={borderWidth} 
              onValueChange={(e) => onBorderWidthChange(e.value)} 
              min={0} 
              max={10}
              className="w-full"
              size="small"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-3 pb-2 border-b border-gray-200">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">背景色</label>
            <ColorPicker 
              value={cellBgColor} 
              onChange={(e) => onCellBgColorChange(e.value)} 
              format="hex"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">文字颜色</label>
            <ColorPicker 
              value={textColor} 
              onChange={(e) => onTextColorChange(e.value)} 
              format="hex"
              className="w-full"
            />
          </div>
        </div>
        
        <div className="mb-3 pb-2 border-b border-gray-200">
          <label className="block text-xs font-medium text-gray-700 mb-1">对齐方式</label>
          <Dropdown 
            value={align} 
            onChange={(e) => onAlignChange(e.value)} 
            options={alignOptions} 
            optionLabel="label" 
            optionValue="value"
            className="w-full"
            size="small"
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            icon="pi pi-check" 
            onClick={onApplyStyle} 
            tooltip="应用样式"
            className="p-button-sm"
            label="应用样式"
          />
          <Button 
            icon="pi pi-trash" 
            onClick={onDeleteTable} 
            tooltip="删除整个表格"
            className="p-button-sm p-button-danger"
            label="删除表格"
          />
        </div>
      </div>
    </div>
  );
};

export default TableToolbar;
