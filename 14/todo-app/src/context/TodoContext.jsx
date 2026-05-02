import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TodoContext = createContext();

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const userTodos = JSON.parse(localStorage.getItem(`todos_${currentUser.id}`) || '[]');
      setTodos(userTodos);
    } else {
      setTodos([]);
    }
  }, [currentUser]);

  const saveTodos = (newTodos) => {
    if (currentUser) {
      localStorage.setItem(`todos_${currentUser.id}`, JSON.stringify(newTodos));
      setTodos(newTodos);
    }
  };

  const addTodo = (todo) => {
    const newTodo = {
      id: Date.now().toString(),
      ...todo,
      createdAt: new Date().toISOString()
    };
    const newTodos = [...todos, newTodo];
    saveTodos(newTodos);
    return newTodo;
  };

  const updateTodo = (id, updatedTodo) => {
    const newTodos = todos.map(todo => 
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    );
    saveTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    saveTodos(newTodos);
  };

  const getTodoById = (id) => {
    return todos.find(todo => todo.id === id);
  };

  const value = {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    getTodoById
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
