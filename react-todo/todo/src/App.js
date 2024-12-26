
import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';

function App() {
  
  const [todos, setTodos] = useState([]);

  const createTodo = (title) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);  
  };
  
  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  const changeTodo = (id, title, completed = false) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title, completed };
      }
      return todo;
    });
  
    setTodos(updatedTodos);
  };

  return (
    <main className="main">
      <h1>
        React Todo <span>Streamline Your Day, the React Way!</span>
      </h1>
      <TodoList todos={todos} removeTodo={removeTodo} changeTodo={changeTodo}/>
      <TodoCreate createTodo={createTodo} />
    </main>
  );
};


export default App;
