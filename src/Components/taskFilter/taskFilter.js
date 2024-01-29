import React from 'react';

export default class TaskFilter extends React.Component {
  state = {};

  handleFilterClick(filterMode) {
    this.props.setFilterMode(filterMode);
  }

  render() {
    const { filterMode } = this.props;
    const filterButtons = ['all', 'active', 'completed'];

    return (
      <ul className="filters">
        {filterButtons.map((filterOption) => (
          <li key={filterOption}>
            <button
              onClick={() => this.handleFilterClick(filterOption)}
              type="button"
              className={filterMode === filterOption ? 'selected' : ''}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
