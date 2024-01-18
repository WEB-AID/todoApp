import React from 'react';
import PropTypes from 'prop-types';

import './footer.css';
import TaskFilter from '../taskFilter/taskFilter';

export default class Footer extends React.Component {
  static defaultProps = {
    todosLeftCount: 666,
    setFilterMode: () => {},
    clearCompleted: () => {},
    filterMode: 'all',
  };

  static propTypes = {
    todosLeftCount: PropTypes.number,
    setFilterMode: PropTypes.func,
    clearCompleted: PropTypes.func,
    filterMode: PropTypes.string,
  };

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
