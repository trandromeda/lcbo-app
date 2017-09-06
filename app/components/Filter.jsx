import React from 'react';

class Filter extends React.Component {

  render() {
    return (
      <div className="filter">
        <form>
          <label>
          Keywords:
          <input
            type="text"
            placeholder="Enter keywords"
          />
          </label>
          <label>
          Discover seasonal drinks
          <input
            type="checkbox"
          />
          </label>
          <input
            type="dropdown"
          />
          <label>
          What's your maximum spend?
          <input 
            type="text"
            placeholder="Enter maximum price"
          />
          </label>
        </form>
      </div>
    )
  }
}

module.exports = Filter;