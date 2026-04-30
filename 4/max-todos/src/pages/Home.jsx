import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { TaskItem } from '../components/TaskItem';
import { Toast } from '../components/Toast';
import { useTodos } from '../context/TodoContext';
import { useSettings } from '../context/SettingsContext';

export function Home() {
  const [newTaskText, setNewTaskText] = useState('');
  const [toast, setToast] = useState(null);
  const { todos, addTodo, editTodo, deleteTodo, toggleComplete, toggleStar, reorderTodos } = useTodos();
  const { deleteConfirm } = useSettings();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      addTodo(newTaskText.trim());
      setNewTaskText('');
      showToast('任务添加成功！');
    }
  };

  const handleEdit = (id, text) => {
    editTodo(id, text);
    showToast('任务编辑成功！');
  };

  const handleDelete = (id) => {
    if (deleteConfirm) {
      if (window.confirm('确定要删除这个任务吗？')) {
        deleteTodo(id);
        showToast('任务删除成功！');
      }
    } else {
      deleteTodo(id);
      showToast('任务删除成功！');
    }
  };

  const handleToggleComplete = (id) => {
    toggleComplete(id);
  };

  const handleToggleStar = (id) => {
    toggleStar(id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = todos.findIndex((t) => t.id === active.id);
      const newIndex = todos.findIndex((t) => t.id === over?.id);

      const newTodos = [...todos];
      const [removed] = newTodos.splice(oldIndex, 1);
      newTodos.splice(newIndex, 0, removed);

      reorderTodos(newTodos);
    }
  };

  const starredTasks = todos.filter((t) => t.starred);
  const regularTasks = todos.filter((t) => !t.starred);
  const sortedTodos = [...starredTasks, ...regularTasks];

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        任务列表
      </h2>

      <form onSubmit={handleAddTask} className="mb-6 flex gap-2">
        <InputText
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="添加新任务..."
          className="flex-1"
        />
        <Button
          type="submit"
          label="添加"
          icon="pi pi-plus"
          className="p-button-primary"
        />
      </form>

      {sortedTodos.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <i className="pi pi-inbox text-4xl mb-4"></i>
          <p>暂无任务，添加一个新任务开始吧！</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortedTodos.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {sortedTodos.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
                onToggleStar={handleToggleStar}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}