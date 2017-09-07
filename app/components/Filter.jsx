import React from 'react';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.handleSeasonalInputChange = this.handleSeasonalInputChange.bind(this);
    this.handleLimitedInputChange = this.handleLimitedInputChange.bind(this)
  }

  handleSeasonalInputChange(e) {
    this.props.onSeasonalInput(e.target.checked);
  }

  handleLimitedInputChange(e) {
    this.props.onLimitedInput(e.target.checked);
  }

  render() {
    return (
      <div className="filter">
        <form>
          <label>
          Seasonal drinks
          <input
            type="checkbox"
            checked={this.props.seasonal}
            onChange={this.handleSeasonalInputChange}
          />
          </label>

          <label>
          Limited time offers
          <input
            type="checkbox"
            checked={this.props.limited}
            onChange={this.handleLimitedInputChange}
          />
          </label>

          <label>
          VQA designated
          <input
            type="checkbox"
          />
          </label>

          <label>
          Proudly produced by Ontario Craft Brewers
          <input
            type="checkbox"
          />
          </label> 

          <label>
          Kosher
          <input
            type="checkbox"
          />
          </label>           
        </form>
      </div>
    )
  }
}

module.exports = Filter;