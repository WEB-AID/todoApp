import './app.css';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';

export default class App extends React.Component {
  maxId = 10;

  state = {
    todoData: [],
    filterMode: 'all',
  };

  addItem = (text, min, sec) => {
    const newItem = this.createItem(text, min, sec);

    this.setState(({ todoData }) => {
      const newArr = [...todoData.slice(0), newItem];
      return {
        todoData: newArr,
      };
    });
    this.updateTimerUnmounted(newItem.id);
  };

  toggleDone = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => id === el.id);
      const newElem = {
        ...todoData[index],
        done: !todoData[index].done,
      };
      const newArr = [...todoData.slice(0, index), newElem, ...todoData.slice(index + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  editItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => id === el.id);
      const newElem = {
        ...todoData[index],
        editing: !todoData[index].editing,
      };
      const newArr = [...todoData.slice(0, index), newElem, ...todoData.slice(index + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  setFilterMode = (mode) => {
    this.setState(() => {
      return {
        filterMode: mode,
      };
    });
  };

  clearCompleted = () => {
    this.setState(() => {
      return {
        todoData: this.filter('active'),
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((elem) => elem.id !== id);

      return {
        todoData: newArr,
      };
    });
  };

  doneItemEdit = (text, id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => id === el.id);
      const newElem = {
        ...todoData[index],
        description: text,
        editing: !todoData[index].editing,
      };
      const newArr = [...todoData.slice(0, index), newElem, ...todoData.slice(index + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  updateTimerUnmounted = (id, start = true) => {
    const x = this.state.todoData.find((item) => item.id === id);
    if (x && x.intervalId === null) {
      const intervalId = setInterval(() => {
        this.setState((prevState) => ({
          todoData: prevState.todoData.map((item) => {
            if (item.id === id && item.intervalId !== null) {
              const newSeconds = item.sec === 0 && item.min > 0 ? 59 : item.sec - 1;
              const newMinutes = item.sec === 0 && item.min > 0 ? item.min - 1 : item.min;

              const finalMinutes = newMinutes < 0 ? 0 : newMinutes;
              const finalSeconds = newSeconds < 0 ? 0 : newSeconds;

              return {
                ...item,
                min: finalMinutes,
                sec: finalSeconds,
              };
            }
            return item;
          }),
        }));
      }, 1000);

      this.setState((prevState) => ({
        todoData: prevState.todoData.map((item) => {
          if (item.id === id && item.intervalId === null) {
            return {
              ...item,
              intervalId: start ? intervalId : null,
            };
          }
          return item;
        }),
      }));
    }
  };

  startTimer = (id) => {
    const x = this.state.todoData.find((item) => item.id === id);
    if (x && x.intervalId === null) {
      this.stopTimer(id);
      this.updateTimerUnmounted(id);
    }
  };

  stopTimer = (id) => {
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((item) => {
        if (item.id === id) {
          clearInterval(item.intervalId);
          return {
            ...item,
            intervalId: null,
          };
        }
        return item;
      }),
    }));
  };

  createItem(text, min, sec) {
    this.maxId += 1;
    return {
      status: 'no-status',
      description: text,
      min,
      sec,
      intervalId: null,
      time: formatDistanceToNow(new Date(), { includeSeconds: true }),
      id: this.maxId,
      editing: false,
      done: false,
    };
  }

  filter(filterType) {
    const filters = {
      all: () => this.state.todoData,
      active: () => this.state.todoData.filter((item) => !item.done),
      completed: () => this.state.todoData.filter((item) => item.done),
    };
    return filters[filterType]();
  }

  render() {
    const todosLeftCount = this.state.todoData.filter((elem) => {
      return !elem.done;
    });
    const filteredItems = this.filter(this.state.filterMode);

    return (
      <section className="todoapp">
        <NewTaskForm onAddClick={this.addItem} />
        <section className="main">
          <TaskList
            todos={filteredItems}
            onToggleDone={this.toggleDone}
            onEditItem={this.editItem}
            onDeleteClick={this.deleteItem}
            doneItemEdit={this.doneItemEdit}
            updateTimerUnmounted={this.updateTimerUnmounted}
            stopTimer={this.stopTimer}
            startTimer={this.startTimer}
          />
          <Footer
            todosLeftCount={todosLeftCount.length}
            setFilterMode={this.setFilterMode}
            clearCompleted={this.clearCompleted}
            filterMode={this.state.filterMode}
          />
        </section>
      </section>
    );
  }
}
