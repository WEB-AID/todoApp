import React from 'react';
import './task.css';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      editing: false,
    };
  }

  onEditClick = () => {
    this.setState(({ editing }) => {
      return {
        editing: !editing,
      };
    });
  };

  onDoneClick = () => {
    this.setState(({ done }) => {
      return {
        done: !done,
      };
    });
  };

  render() {
    const { description, onDeleteClick } = this.props;
    const { done, editing } = this.state;
    let statusClass = 'no-status';

    if (editing) {
      statusClass = 'editing';
    }

    if (done) {
      statusClass = 'completed';
    }

    return (
      <li className={statusClass}>
        <div className="view">
          <input onClick={this.onDoneClick} className="toggle" type="checkbox" />
          <label>
            <span className="description">{description}</span>
            <span className="created">{formatDistanceToNow(new Date(), { includeSeconds: true })}</span>
          </label>
          <button onClick={this.onEditClick} type="button" className="icon icon-edit" />
          <button onClick={onDeleteClick} type="button" className="icon icon-destroy" />
        </div>
        {editing ? <input type="text" className="edit" value="Editing task" /> : null}
      </li>
    );
  }
}
