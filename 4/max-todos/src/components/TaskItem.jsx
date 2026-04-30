import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { useSettings } from '../context/SettingsContext';

export function TaskItem({ task, onEdit, onDelete, onToggleComplete, onToggleStar }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const { deleteConfirm } = useSettings();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-2 ${
          task.completed ? 'opacity-60' : ''
        }`}
      >
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <i className="pi pi-bars"></i>
        </button>

        <button
          onClick={() => onToggleComplete(task.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-400 hover:border-green-500'
          }`}
        >
          {task.completed && <i className="pi pi-check text-xs"></i>}
        </button>

        {isEditing ? (
          <InputText
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1"
          />
        ) : (
          <span
            className={`flex-1 cursor-pointer ${
              task.completed ? 'line-through text-gray-500' : ''
            }`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.text}
          </span>
        )}

        <button
          onClick={() => onToggleStar(task.id)}
          className={`p-2 rounded transition-colors ${
            task.starred
              ? 'text-yellow-500 hover:text-yellow-600'
              : 'text-gray-400 hover:text-yellow-500'
          }`}
        >
          <i className={`pi ${task.starred ? 'pi-star-fill' : 'pi-star'}`}></i>
        </button>

        {isEditing ? (
          <>
            <Button
              icon="pi pi-check"
              className="p-button-rounded p-button-success p-button-sm"
              onClick={handleSave}
            />
            <Button
              icon="pi pi-times"
              className="p-button-rounded p-button-secondary p-button-sm"
              onClick={handleCancel}
            />
          </>
        ) : (
          <>
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-text p-button-sm"
              onClick={() => setIsEditing(true)}
            />
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-text p-button-danger p-button-sm"
              onClick={() => onDelete(task.id)}
            />
          </>
        )}
      </div>

      {deleteConfirm && (
        <ConfirmDialog />
      )}
    </>
  );
}