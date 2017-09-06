import React from 'react';

class Drink extends React.Component {
  constructor(props) {
    super();
  }

  render () {
    return (
      <div className="drink">
      <img src={this.props.thumbnail} className="thumbnail" />
        <h1>{this.props.name}</h1>
        <p>{this.props.category} <br />
        {this.props.package} - {this.props.alcohol}</p>

        <p>{this.props.price} <br />
        {this.props.is_dead}</p>

      </div>
      )
  }
}

module.exports = Drink;