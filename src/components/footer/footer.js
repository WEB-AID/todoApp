import React from "react";
import '../footer/footer.css';
import TaskFilter from "../taskFilter/taskFilter";

const Footer = () => {

    return (
        <footer className="footer">
            <span className="todo-count">1 items left</span>
            <TaskFilter />
            <button className="clear-completed">Clear completed</button>
        </footer>
    )
}

export default Footer;