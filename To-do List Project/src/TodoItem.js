import React from 'react';

const TodoItem = ({ todo, onDelete }) => {
  return (
    <li>
      {todo} <button onClick={onDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
