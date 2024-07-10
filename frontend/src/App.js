// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/about'; 
import Profile from './components/profile';
import Navbar from './components/navbar'; // Import the Navbar component

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
    if (newTodo.trim() === '') return;

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
    <Router>
      <div className="App">
        <Navbar /> {/* Include the Navbar component */}
        <Routes>
          <Route path="/" element={
            <div>
              <h1>Todo List</h1>
              <div className="inputContainer">
                <input
                  type="text"
                  value={newTodo}
                  onChange={e => setNewTodo(e.target.value)}
                  placeholder="Add a new todo"
                />
                <button onClick={addTodo}>Add</button>
              </div>
              <div className="todoContainer">
                <ul>
                  {todos.map(todo => (
                    <li key={todo._id} className="todoItem">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo._id, todo.completed)}
                      />
                      <span className={todo.completed ? 'completed' : ''}>
                        {todo.title}
                      </span>
                      <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
