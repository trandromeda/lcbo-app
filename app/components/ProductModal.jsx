import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    };

    const price = (this.props.data.price_in_cents / 100).toFixed(2);
    const alcohol_volume = (this.props.data.alcohol_content / 100).toFixed(1);
    const name = (this.props.data.name);
    const url = "http://www.lcbo.com/lcbo/product/" + name.split(/[\s\']/).join('-') + "/" + (this.props.data.product_no);

    return (
      <div className="backdrop">
        <div className="modal drink">
          <button className="close" onClick={this.props.onClose}>
            <span className="fa fa-times"></span>
          </button>

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
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;