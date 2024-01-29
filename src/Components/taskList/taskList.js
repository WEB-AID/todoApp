import React from 'react';

import Task from '../task/task';

export default class TaskList extends React.Component {
  state = {};

  render() {
    const { todos, onDeleteClick, onToggleDone, onEditItem, doneItemEdit, updateTimer } = this.props;

    const elements = todos.map((item) => {
      const { id, ...rest } = item;

      return (
        <Task
          key={id}
          onToggleDone={() => onToggleDone(id)}
          onEditItem={() => onEditItem(id)}
          doneItemEdit={(text) => doneItemEdit(text, id)}
          onDeleteClick={() => onDeleteClick(id)}
          updateTimer={(finalMinutes, finalSeconds) => updateTimer(finalMinutes, finalSeconds, id)}
          {...rest}
        />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
