import React from 'react';

class ProductView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const price = (this.props.data.price_in_cents / 100).toFixed(2);
    const alcohol_volume = (this.props.data.alcohol_content / 100).toFixed(1);
    const name = (this.props.data.name);
    const url = "http://www.lcbo.com/lcbo/product/" + name.split(/[\s\']/).join('-') + "/" + (this.props.data.product_no);

    return (
      <div>
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
          

          <div className="details-box">
            <div className="details-labels">
              <p>Release Date</p>
              <p>Made in</p>
              <p>By</p>
              <p>Sugar Content</p>
              <p>Sweetness</p>
              <p>Style</p>
            </div>

            <div className="details-values">
              <p>{this.props.data.released_on ? this.props.data.released_on : '...'}</p>
              <p>{this.props.data.origin ? this.props.data.origin : '...'}</p>
              <p>{this.props.data.producer_name ? this.props.data.producer_name : '...'}</p>
              <p>{this.props.data.sugar_in_grams_per_liter ? this.props.data.sugar_in_grams_per_leter : '...'}</p>
              <p>{this.props.data.sugar_content ? this.props.data.sugar_content : '...'}</p>
              <p>{this.props.data.style ? this.props.data.style : '...'}</p>
            </div>
          </div>

            <a href={url}  target="_blank">
              <button className="buy">
              Buy on LCBO.com
              </button>
            </a>

        </div>
      </div>
    )
  }
}

export default ProductView;
