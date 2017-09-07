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
        <h1>Discover the LCBO</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="form-box">
          <input
            type="checkbox"
            value="is_seasonal"
            onChange={this.handleInputChange}
          />
          <h2>Seasonal</h2>
          </label>

          <label className="form-box">
          <input
            type="checkbox"
            value="has_limited_time_offer"
            onChange={this.handleInputChange}
          />
          <h2>Limited Time</h2>

          </label>

          <label className="form-box">
          <input
            type="checkbox"
            value="is_vqa"
            onChange={this.handleInputChange}
          />
          <h2>VQA Designated</h2>
          </label>

          <label className="form-box">
          <input
            type="checkbox"
            value="is_ocb"
            onChange={this.handleInputChange}
          />
          <h2>Ontario Craft Brewers</h2>
          </label> 

          <label className="form-search">
          <p>Enter some keywords (e.g. colour, country, fruit)</p>
          <input
            type="text"
            name="search"
            value={this.state.search}
            onChange={this.handleSearchChange}
          />
          </label> 

          <button className="form-submit" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

module.exports = Filter;