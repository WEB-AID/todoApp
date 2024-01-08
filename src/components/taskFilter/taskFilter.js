import React from 'react';
import './taskFilter.css';

export default class TaskFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilterMode: 'all',
    };
  }

  handleFilterClick(filterMode) {
    this.setState({ activeFilterMode: filterMode });
    this.props.setFilterMode(filterMode);
  }

  render() {
    return (
      <ul className="filters">
        <li>
          <button
            onClick={() => this.handleFilterClick('all')}
            type="button"
            className={this.state.activeFilterMode === 'all' ? 'selected' : ''}
          >
            All
          </button>
        </li>
        <li>
          <button
            onClick={() => this.handleFilterClick('active')}
            type="button"
            className={this.state.activeFilterMode === 'active' ? 'selected' : ''}
          >
            Active
          </button>
        </li>
        <li>
          <button
            onClick={() => this.handleFilterClick('completed')}
            type="button"
            className={this.state.activeFilterMode === 'completed' ? 'selected' : ''}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
