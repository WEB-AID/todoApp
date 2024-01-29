import React from 'react';

import TaskFilter from '../taskFilter/taskFilter';

export default class Footer extends React.Component {
  state = {};

  render() {
    const { todosLeftCount, setFilterMode, clearCompleted, filterMode } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{todosLeftCount} items left</span>
        <TaskFilter setFilterMode={setFilterMode} filterMode={filterMode} />
        <button onClick={clearCompleted} type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    );
  }
}
