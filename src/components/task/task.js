import React from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends React.Component {
  state = {};

  render() {
    const { description, onDeleteClick, onToggleDone, onEditItem, done, editing } = this.props;
    let statusClass = '';

    if (done) {
      statusClass = 'completed';
    }

    if (editing) {
      statusClass = 'editing';
    }

    return (
      <li className={statusClass}>
        <div className="view">
          <input checked={done} onClick={onToggleDone} className="toggle" type="checkbox" />
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
