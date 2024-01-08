import React from 'react';

import './footer.css';
import TaskFilter from '../taskFilter/taskFilter';

export default class Footer extends React.Component {
  state = {};

  render() {
    const { todosLeftCount, setFilterMode, clearCompleted } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{todosLeftCount} items left</span>
        <TaskFilter setFilterMode={setFilterMode} />
        <button onClick={clearCompleted} type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    );
  }
}
