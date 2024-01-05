import React from 'react';
import './app.css';

import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';

function App() {
  const todoData = [
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
      editing: true,
      id: 2,
    },
    {
      status: 'no-status',
      description: 'Active task',
      time: 'created 5 minutes ago',
      id: 3,
    },
  ];

  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList todos={todoData} />
        <Footer />
      </section>
    </section>
  );
}

export default App;
