import React from 'react';

import Task from '../task/task';
import './taskList.css';

function TaskList({ todos, onDeleteClick, onToggleDone, onEditItem }) {
  const elements = todos.map((item) => {
    const { id, ...rest } = item;

    return (
      <Task
        key={id}
        onDeleteClick={() => onDeleteClick(id)}
        onToggleDone={() => onToggleDone(id)}
        onEditItem={() => onEditItem(id)}
        {...rest}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

export default TaskList;
