import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

function Task({
  description,
  onDeleteClick,
  onToggleDone,
  onEditItem,
  done,
  editing,
  min,
  sec,
  startTimer,
  stopTimer,
  doneItemEdit,
}) {
  const [inputValue, setInputValue] = useState(description);

  const onInputChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const onInputEvent = (evt) => {
    const { key } = evt;
    const text = evt.target.value;
    if (key === 'Enter' && text !== '') {
      doneItemEdit(text);
    } else {
      setInputValue(text);
    }
  };

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
            <button className="icon icon-play" type="button" onClick={startTimer} />
            <button className="icon icon-pause" type="button" onClick={stopTimer} />
            {min} : {sec}
          </span>
          <span className="created">{formatDistanceToNow(new Date(), { includeSeconds: true })}</span>
        </label>
        <button onClick={onEditItem} type="button" className="icon icon-edit" />
        <button onClick={onDeleteClick} className="icon icon-destroy" type="button" />
      </div>
      <input type="text" className="edit" value={inputValue} onKeyUp={onInputEvent} onChange={onInputChange} />
    </li>
  );
}

export default Task;
