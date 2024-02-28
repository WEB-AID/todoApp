import React, { useState } from 'react';

function NewTaskForm({ onAddClick }) {
  const [inputValue, setInputValue] = useState('');
  const [inputMin, setInputMin] = useState('');
  const [inputSec, setInputSec] = useState('');

  const validateInput = (value) => {
    if (value >= 0 && value <= 60) {
      return value;
    }
    return '<60!';
  };

  const onValueChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const onMinChange = (evt) => {
    const min = validateInput(evt.target.value);
    setInputMin(min);
  };

  const onSecChange = (evt) => {
    const sec = validateInput(evt.target.value);
    setInputSec(sec);
  };

  const onInputEvent = (evt) => {
    const { key } = evt;
    if (key === 'Enter' && inputValue !== '' && inputMin !== '<60!' && inputSec !== '<60!') {
      onAddClick(inputValue, inputMin, inputSec);
      setInputValue('');
      setInputMin('');
      setInputSec('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          className="new-todo"
          onChange={onValueChange}
          value={inputValue}
          onKeyUp={onInputEvent}
          placeholder="Task"
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          onChange={onMinChange}
          value={inputMin}
          onKeyUp={onInputEvent}
          placeholder="Min"
        />
        <input
          className="new-todo-form__timer"
          onChange={onSecChange}
          value={inputSec}
          onKeyUp={onInputEvent}
          placeholder="Sec"
        />
      </form>
    </header>
  );
}

export default NewTaskForm;
