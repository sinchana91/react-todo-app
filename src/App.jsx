import React,{useState, useEffect } from 'react'  ;
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './App.css';
const App = () => {
  const [todos, setTodos] = useState([]);
  useEffect(()=>{
    fetchTodos();
  },[]);
  const fetchTodos = async () => {
    const res = await fetch('http://localhost:3300/api');
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async (todo) => {
    const res = await fetch('http://localhost:3300/api/create',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
    const data = await res.json();
    setTodos([...todos,data]);
  };

  const toggleComplete = async (id) => {
    const todoToToggle=todos.find(todo=>todo._id===id);
    const updatedTodo={...todoToToggle,completed:!todoToToggle.completed};
    const res = await fetch(`http://localhost:3300/api/up/${id}`,{
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTodo)
    });
    const data = await res.json();
    setTodos(todos.map(todo=>todo._id===id ? {...todo,completed:data.completed} : todo));
  };

    const deleteTodo=async (id) => {
      const res = await fetch(`http://localhost:3300/api/del/${id}`,{
        method: 'DELETE'
      });
      setTodos(todos.filter(todo=>todo._id!==id));
    };

    return (
      <div>
        <h1>Todo List</h1>
        <AddTodo addTodo={addTodo}/>
        <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
      </div>
    );
  };

  export default App;