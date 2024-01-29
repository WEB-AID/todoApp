import React from 'react';

export default class NewTaskForm extends React.Component {
  state = {
    inputValue: '',
    inputMin: '',
    inputSec: '',
  };

  validateInput = (value) => {
    if (value >= 0 && value <= 60) {
      return value;
    }
    return '<60!';
  };

  onValueChange = (evt) => {
    this.setState({ inputValue: evt.target.value });
  };

  onMinChange = (evt) => {
    const min = this.validateInput(evt.target.value);

    this.setState({ inputMin: min });
  };

  onSecChange = (evt) => {
    const sec = this.validateInput(evt.target.value);

    this.setState({ inputSec: sec });
  };

  onInputEvent = (evt) => {
    const { key } = evt;
    const text = this.state.inputValue;
    const min = this.state.inputMin;
    const sec = this.state.inputSec;
    if (key === 'Enter' && text !== '' && min !== '<60!' && sec !== '<60!') {
      this.props.onAddClick(text, min, sec);
      this.setState({ inputValue: '', inputMin: '', inputSec: '' });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form">
          <input
            className="new-todo"
            onChange={this.onValueChange}
            value={this.state.inputValue}
            onKeyUp={this.onInputEvent}
            placeholder="Task"
            autoFocus
          />
          <input
            className="new-todo-form__timer"
            onChange={this.onMinChange}
            value={this.state.inputMin}
            onKeyUp={this.onInputEvent}
            placeholder="Min"
          />
          <input
            className="new-todo-form__timer"
            onChange={this.onSecChange}
            value={this.state.inputSec}
            onKeyUp={this.onInputEvent}
            placeholder="Sec"
          />
        </form>
      </header>
    );
  }
}
