import React from 'react';

class Drink extends React.Component {
  constructor(props) {
    super();
  }

  render () {
    let price = (this.props.price / 100).toFixed(2);
    let alcohol_volume = (this.props.alcohol / this.props.volume * 100).toFixed(1);

    return (
      <div className="drink">
      <img src={this.props.thumbnail} className="thumbnail" />
        <h1>{this.props.name}</h1>

        <div className="product-description">
          <div className="horizontal-rule"></div>

          <div className="desc-box">
            <p className="category">{this.props.category}</p>
            <p className="package">{this.props.package} - {alcohol_volume}% Alcohol</p>
          </div>

          <div className="price-box">
            <p className="price"><span className="dollar">$</span>{price} <br />
            {this.props.is_dead}</p>
          </div>

        </div>

      </div>
      )
  }
}

module.exports = Drink;