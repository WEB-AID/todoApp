import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';
import './taskList.css';

export default class TaskList extends React.Component {
  static defaultProps = {
    todos: [
      {
        status: 'status-default prop',
        description: 'description-default prop',
        time: 'time-default prop',
        id: 666,
        editing: false,
      },
    ],
    onDeleteClick: () => {},
    onToggleDone: () => {},
    onEditItem: () => {},
  };

  static propTypes = {
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        status: PropTypes.string,
        description: PropTypes.string,
        time: PropTypes.string,
        id: PropTypes.number,
        editing: PropTypes.bool,
      })
    ),
    onDeleteClick: PropTypes.func,
    onToggleDone: PropTypes.func,
    onEditItem: PropTypes.func,
  };

  state = {};

  render() {
    const { todos, onDeleteClick, onToggleDone, onEditItem } = this.props;

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
}
