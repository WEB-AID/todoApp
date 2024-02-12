import React from 'react';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends React.Component {
  state = {
    inputValue: this.props.description,
  };

  onInputChange = (evt) => {
    this.setState(() => ({
      inputValue: evt.target.value,
    }));
  };

  onInputEvent = (evt) => {
    const { key } = evt;
    const text = evt.target.value;
    if (key === 'Enter' && text !== '') {
      this.props.doneItemEdit(text);
    } else {
      this.setState({ inputValue: text });
    }
  };

  render() {
    const { description, onDeleteClick, onToggleDone, onEditItem, done, editing, min, sec } = this.props;
    let taskStatus = '';

    if (done) {
      taskStatus = 'completed';
    } else if (editing) {
      taskStatus = 'editing';
    }

    return (
      <li className={taskStatus}>
        <div className="view">
          <input checked={done} onChange={onToggleDone} className="toggle" type="checkbox" />
          <label>
            <span className="title">{description}</span>
            <span className="description">
              <button className="icon icon-play" type="button" onClick={this.props.startTimer} />
              <button className="icon icon-pause" type="button" onClick={this.props.stopTimer} />
              {min} : {sec}
            </span>
            <span className="created">{formatDistanceToNow(new Date(), { includeSeconds: true })}</span>
          </label>
          <button onClick={onEditItem} type="button" className="icon icon-edit" />
          <button onClick={onDeleteClick} className="icon icon-destroy" type="button" />
        </div>
        <input
          type="text"
          className="edit"
          value={this.state.inputValue}
          onKeyUp={this.onInputEvent}
          onChange={this.onInputChange}
        />
      </li>
    );
  }
}
