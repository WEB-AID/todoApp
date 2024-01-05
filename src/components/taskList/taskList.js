import React from 'react';

import Task from '../task/task';
import './taskList.css';

function TaskList({ todos }) {
  const elements = todos.map((item) => {
    return <Task key={item.id} {...item} />;
  });

  return <ul className="todo-list">{elements}</ul>;
}

export default TaskList;
