import React, { useState } from 'react';
import TodoList from './TodoList';
// import './style.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((item, i) => i !== index));
  };

  return (
    <div class="cards">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new todo"
      />
      <button class= "b" onClick={addTodo}>Add Todo</button>
      <TodoList todos={todos} onDelete={deleteTodo} />
    </div>
  );
};

export default App;
