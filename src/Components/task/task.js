import React from 'react';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends React.Component {
  state = {
    inputValue: this.props.description,
    minutes: this.props.min,
    seconds: this.props.sec,
  };

  timerId = null;

  componentDidMount() {
    this.startTimer();
  }

  startTimer = () => {
    if (!this.timerId) {
      this.timerId = setInterval(() => {
        this.setState((prevState) => {
          const { minutes, seconds } = prevState;

          const newSeconds = seconds === 0 && minutes > 0 ? 59 : seconds - 1;
          const newMinutes = seconds === 0 && minutes > 0 ? minutes - 1 : minutes;

          const finalMinutes = newMinutes < 0 ? 0 : newMinutes;
          const finalSeconds = newSeconds < 0 ? 0 : newSeconds;

          if (finalMinutes === 0 && finalSeconds === 0) {
            this.stopTimer();
          }

          this.props.updateTimer(finalMinutes, finalSeconds);

          return {
            minutes: finalMinutes,
            seconds: finalSeconds,
          };
        });
      }, 1000);
    }
  };

  stopTimer = () => {
    clearInterval(this.timerId);
    this.timerId = null;
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
    const { description, onDeleteClick, onToggleDone, onEditItem, done, editing } = this.props;
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
              <button className="icon icon-play" type="button" onClick={this.startTimer} />
              <button className="icon icon-pause" type="button" onClick={this.stopTimer} />
              {this.state.minutes} {this.state.seconds}
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
