import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({todos,toggleComplete,deleteTodo}) => {
  return (
    <div>
      {todos.map(todo => <TodoItem key={todo._id} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>)}

    </div>
  );

};

export default TodoList;
