import React from 'react';

import './footer.css';
import TaskFilter from '../taskFilter/taskFilter';

export default class Footer extends React.Component {
  state = {};

  render() {
    const { todosLeftCount } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{todosLeftCount} items left</span>
        <TaskFilter />
        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    );
  }
}
