import React from 'react';

import './newTaskForm.css';

export default class NewTaskForm extends React.Component {
  state = {
    inputValue: '',
  };

  onInputEvent = (evt) => {
    const { key } = evt;
    const text = evt.target.value;
    if (key === 'Enter' && text !== '') {
      this.props.onAddClick(text);
      this.setState({ inputValue: '' });
    } else {
      this.setState({ inputValue: text });
    }
  };

  onInputChange = (evt) => {
    this.setState(() => ({
      inputValue: evt.target.value,
    }));
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          onKeyUp={this.onInputEvent}
          onChange={this.onInputChange}
          value={this.state.inputValue}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </header>
    );
  }
}
