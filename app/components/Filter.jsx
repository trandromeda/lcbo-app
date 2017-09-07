import React from 'react';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.props.onInput(e.target.checked, e.target.value);
  }

  handleSearchChange(e) {
    this.setState({
      search: e.target.value
    })
    this.props.onSearch(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }

  render() {
    return (
      <div className="filter">
        <form onSubmit={this.handleSubmit}>
          <label>
          Seasonal drinks
          <input
            type="checkbox"
            value="is_seasonal"
            onChange={this.handleInputChange}
          />
          </label>

          <label>
          Limited time offers
          <input
            type="checkbox"
            value="has_limited_time_offer"
            onChange={this.handleInputChange}
          />
          </label>

          <label>
          VQA designated
          <input
            type="checkbox"
            value="is_vqa"
            onChange={this.handleInputChange}
          />
          </label>

          <label>
          Proudly produced by Ontario Craft Brewers
          <input
            type="checkbox"
            value="is_ocb"
            onChange={this.handleInputChange}
          />
          </label> 

          <label>
          Enter some keywords (e.g. wine, red, fruit)
          <input
            type="text"
            name="search"
            value={this.state.search}
            onChange={this.handleSearchChange}
          />
          </label> 

          <input 
            type="submit" 
            value="Submit"
          />
        </form>
      </div>
    )
  }
}

module.exports = Filter;