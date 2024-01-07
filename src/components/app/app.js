import React from 'react';
import './app.css';

import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';

export default class App extends React.Component {
  state = {
    todoData: [
      {
        status: 'completed',
        description: 'Completed task',
        time: 'created 17 seconds ago',
        id: 1,
      },
      {
        status: 'editing',
        description: 'Editing task',
        time: 'created 5 minutes ago',
        id: 2,
      },
      {
        status: 'no-status',
        description: 'Active task',
        time: 'created 5 minutes ago',
        id: 3,
      },
    ],
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((elem) => elem.id === id);
      const newArr = [...todoData.slice(0, index), ...todoData.slice(index + 1)];

      return {
        todoData: newArr,
      };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm />
        <section className="main">
          <TaskList todos={this.state.todoData} onDeleteClick={this.deleteItem} />
          <Footer />
        </section>
      </section>
    );
  }
}
