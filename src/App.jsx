import React, { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch('http://localhost:3000/api');
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async (todo) => {
    try {
      const res = await fetch('http://localhost:3000/api/create', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      if (!res.ok) {
        throw new Error('Server error');
      }
      const data = await res.json();
      setTodos([...todos, data]);
    } catch (err) {
      console.log('Error adding the todo:', err);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todoToToggle = todos.find((todo) => todo._id === id);
      const updatedTodo = { ...todoToToggle, completed: !todoToToggle.completed };
      const res = await fetch(`http://localhost:3000/api/up/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setTodos(todos.map((todo) => (todo._id === id ? { ...todo, completed: data.completed } : todo)));
    } catch (err) {
      console.log('Error toggling the todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/del/${id}`, {
        method: 'DELETE',
      });
       setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.log('Error deleting the todo:', err);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
