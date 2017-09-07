import React from 'react';

class DrinkCard extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const price = (this.props.data.price_in_cents / 100).toFixed(2);
    const alcohol_volume = (this.props.data.alcohol_content / 100).toFixed(1);

    return (
      <div className="product" onClick={this.props.onClick}>
      <img src={this.props.data.image_thumb_url} className="thumbnail" />
        <h1>{this.props.data.name}</h1>

        <div className="product-description">
          <div className="horizontal-rule"></div>

          <div className="desc-box">
            <p className="category">{this.props.data.tertiary_category}</p>
            <p className="package">{this.props.data.package} - {alcohol_volume}% Alcohol</p>
          </div>

          <div className="price-box">
            <p className="price"><span className="dollar">$</span>{price}</p>
            <p className="in-stock">
              {!this.props.data.is_dead 
                ?  <span className="fa fa-check"></span>
                :  <span className="fa fa-times"></span>} IN STOCK
            </p>
          </div>

        </div>

      </div>
      )
  }
}

module.exports = DrinkCard;