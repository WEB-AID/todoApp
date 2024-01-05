import React from 'react';

import './footer.css';
import TaskFilter from '../taskFilter/taskFilter';

function Footer() {
  return (
    <footer className="footer">
      <span className="todo-count">1 items left</span>
      <TaskFilter />
      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
