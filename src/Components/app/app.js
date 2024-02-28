import React, { useState, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './app.css';
import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';

function App() {
  const [todoData, setTodoData] = useState([]);
  const [filterMode, setFilterMode] = useState('all');
  const maxId = useRef(10);

  const addItem = (text, min, sec) => {
    const newItem = createItem(text, min, sec);
    setTodoData([...todoData, newItem]);
    updateTimerUnmounted(newItem.id);
  };

  const toggleDone = (id) => {
    setTodoData(todoData.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const editItem = (id) => {
    setTodoData(todoData.map((item) => (item.id === id ? { ...item, editing: !item.editing } : item)));
  };

  const clearCompleted = () => {
    setTodoData(filter('active'));
  };

  const deleteItem = (id) => {
    setTodoData(todoData.filter((item) => item.id !== id));
  };

  const doneItemEdit = (text, id) => {
    setTodoData(
      todoData.map((item) => (item.id === id ? { ...item, description: text, editing: !item.editing } : item))
    );
  };

  const updateTimerUnmounted = (id, start = true) => {
    const x = todoData.find((item) => item.id === id);
    if (x && x.intervalId === null) {
      const intervalId = setInterval(() => {
        setTodoData((prevState) =>
          prevState.map((item) => {
            if (item.id === id && item.intervalId !== null) {
              const newSeconds = item.sec === 0 && item.min > 0 ? 59 : item.sec - 1;
              const newMinutes = item.sec === 0 && item.min > 0 ? item.min - 1 : item.min;
              const finalMinutes = newMinutes < 0 ? 0 : newMinutes;
              const finalSeconds = newSeconds < 0 ? 0 : newSeconds;
              return { ...item, min: finalMinutes, sec: finalSeconds };
            }
            return item;
          })
        );
      }, 1000);

      setTodoData((prevState) =>
        prevState.map((item) =>
          item.id === id && item.intervalId === null ? { ...item, intervalId: start ? intervalId : null } : item
        )
      );
    }
  };

  const startTimer = (id) => {
    const x = todoData.find((item) => item.id === id);
    if (x && x.intervalId === null) {
      stopTimer(id);
      updateTimerUnmounted(id);
    }
  };

  const stopTimer = (id) => {
    setTodoData(
      todoData.map((item) => {
        if (item.id === id && item.intervalId !== null) {
          clearInterval(item.intervalId);
        }
        return item.id === id ? { ...item, intervalId: null } : item;
      })
    );
  };

  const createItem = (text, min, sec) => {
    maxId.current += 1;
    return {
      status: 'no-status',
      description: text,
      min,
      sec,
      intervalId: null,
      time: formatDistanceToNow(new Date(), { includeSeconds: true }),
      id: maxId.current,
      editing: false,
      done: false,
    };
  };

  const filter = (filterType) => {
    const filters = {
      all: () => todoData,
      active: () => todoData.filter((item) => !item.done),
      completed: () => todoData.filter((item) => item.done),
    };
    return filters[filterType]();
  };

  const todosLeftCount = todoData.filter((elem) => !elem.done);
  const filteredItems = filter(filterMode);

  return (
    <section className="todoapp">
      <NewTaskForm onAddClick={addItem} />
      <section className="main">
        <TaskList
          todos={filteredItems}
          onToggleDone={toggleDone}
          onEditItem={editItem}
          onDeleteClick={deleteItem}
          doneItemEdit={doneItemEdit}
          updateTimerUnmounted={updateTimerUnmounted}
          stopTimer={stopTimer}
          startTimer={startTimer}
        />
        <Footer
          todosLeftCount={todosLeftCount.length}
          setFilterMode={setFilterMode}
          clearCompleted={clearCompleted}
          filterMode={filterMode}
        />
      </section>
    </section>
  );
}

export default App;
