import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super();
  }

  render () {
    return (
      <div className="header">
        <div className="inner-wrapper">
          <div className="filter-icon" onClick={this.props.onClick}>Filter</div>
          <h1>Drynk</h1>
        </div>
      </div>
    )
  }
}

module.exports = Header;