import React from 'react';
import './app.css';

import NewTaskForm from '../newTaskForm/newTaskForm';
import TaskList from '../taskList/taskList';
import Footer from '../footer/footer';

const App = () => {
    const todoData = [
        { status: 'completed', description: 'Completed task!', time: 'created 17 seconds ago' },
        { status: 'editing', description: 'Editing task', time: 'created 5 minutes ago', editing: true },
        { status: 'no-status', description: 'Active task', time: 'created 5 minutes ago' }
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
};

export default App; 