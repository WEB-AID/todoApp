import React from 'react';
import './app.css';
import { formatDistanceToNow } from 'date-fns';

import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';

export default class App extends React.Component {
  maxId = 10;

  state = {
    todoData: [
      this.createItem('Completed task'),
      this.createItem('Editing task'),
      this.createItem('Active task'),
      this.createItem('Active task'),
      this.createItem('Active task'),
    ],
    filterMode: 'all',
  };

  addItem = (text) => {
    const newItem = this.createItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData.slice(0), newItem];
      return {
        todoData: newArr,
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

  setFilterMode = (mode) => {
    this.setState(() => {
      return {
        filterMode: mode,
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.filter(todoData, 'active'),
      };
    });
  };

  filter(filterType) {
    const filters = {
      all: () => this.state.todoData,
      active: () => this.state.todoData.filter((item) => !item.done),
      completed: () => this.state.todoData.filter((item) => item.done),
    };
    return filters[filterType]();
  }

  createItem(text) {
    this.maxId += 1;
    return {
      status: 'no-status',
      description: text,
      time: formatDistanceToNow(new Date(), { includeSeconds: true }),
      id: this.maxId,
      editing: false,
    };
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
            onDeleteClick={this.deleteItem}
            onToggleDone={this.toggleDone}
            onEditItem={this.editItem}
            doneItemEdit={this.doneItemEdit}
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
