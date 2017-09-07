import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super();
  }

  render () {
    return (
      <div className="header">
        <div className="inner-wrapper">
        {this.props.nav 
          ? <div className="back" onClick={this.props.back}><span className="fa fa-chevron-left"></span></div>
          : <div className="filter-icon" onClick={this.props.filter}><span className="fa fa-filter"></span></div>
        }
          <h1>Drynk</h1>
        </div>
      </div>
    )
  }
}

module.exports = Header;