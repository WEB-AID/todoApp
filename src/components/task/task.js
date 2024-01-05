import React from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';

function Task({ status, description, time, editing = false }) {
  return (
    <li className={status}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{description}</span>
          <span className="created">{formatDistanceToNow(new Date(), { includeSeconds: true })}</span>
        </label>
        <button type="button" className="icon icon-edit" />
        <button type="button" className="icon icon-destroy" />
      </div>
      {editing ? <input type="text" className="edit" value="Editing task" /> : null}
    </li>
  );
}

export default Task;
