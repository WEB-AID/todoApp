import React from 'react';
import './taskFilter.css';

export default class TaskFilter extends React.Component {
  state = {};

  handleFilterClick(filterMode) {
    this.props.setFilterMode(filterMode);
  }

  render() {
    return (
      <ul className="filters">
        <li>
          <button
            onClick={() => this.handleFilterClick('all')}
            type="button"
            className={this.props.filterMode === 'all' ? 'selected' : ''}
          >
            All
          </button>
        </li>
        <li>
          <button
            onClick={() => this.handleFilterClick('active')}
            type="button"
            className={this.props.filterMode === 'active' ? 'selected' : ''}
          >
            Active
          </button>
        </li>
        <li>
          <button
            onClick={() => this.handleFilterClick('completed')}
            type="button"
            className={this.props.filterMode === 'completed' ? 'selected' : ''}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
