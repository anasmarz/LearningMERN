import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5555/api/todos')
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const addTodo = () => {
    axios.post('http://localhost:5555/api/todos', { title: newTodo })
      .then(res => {
        setTodos([...todos, res.data]);
        setNewTodo('');
      })
      .catch(err => {
        console.error(err);
      });
  };

  const toggleComplete = (id, completed) => {
    axios.patch(`http://localhost:5555/api/todos/${id}`, { completed: !completed })
      .then(res => {
        setTodos(todos.map(todo => todo._id === id ? res.data : todo));
      })
      .catch(err => {
        console.error(err);
      });
  };

  const deleteTodo = id => {
    axios.delete(`http://localhost:5555/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleComplete(todo._id, todo.completed)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
