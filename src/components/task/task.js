import React from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends React.Component {
  static defaultProps = {
    description: '',
    onDeleteClick: () => {},
    onToggleDone: () => {},
    onEditItem: () => {},
    editing: false,
    done: false,
  };

  static propTypes = {
    description: PropTypes.string,
    onDeleteClick: PropTypes.func,
    onToggleDone: PropTypes.func,
    onEditItem: PropTypes.func,
    editing: PropTypes.bool,
    done: PropTypes.bool,
  };

  state = {};

  render() {
    const { description, onDeleteClick, onToggleDone, onEditItem, done, editing } = this.props;
    let taskStatus = '';

    if (done) {
      taskStatus = 'completed';
    }

    if (editing) {
      taskStatus = 'editing';
    }

    return (
      <li className={taskStatus}>
        <div className="view">
          <input checked={done} onChange={onToggleDone} className="toggle" type="checkbox" />
          <label>
            <span className="description">{description}</span>
            <span className="created">{formatDistanceToNow(new Date(), { includeSeconds: true })}</span>
          </label>
          <button onClick={onEditItem} type="button" className="icon icon-edit" />
          <button onClick={onDeleteClick} type="button" className="icon icon-destroy" />
        </div>
        {editing ? <input type="text" className="edit" value="Editing task" /> : null}
      </li>
    );
  }
}
