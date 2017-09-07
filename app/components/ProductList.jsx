import React from 'react';
import Drink from './Drink.jsx';
import Media from 'react-media'

class ProductList extends React.Component {
  constructor(props) {
    super(props);
  }

  showProduct(product) {
    this.props.showProduct(product);
  }

  render() {
    return (
      <div className="container">
        {this.props.data.map(product =>
          <Drink 
          key={product.id}
          data={product}
          onClick={this.showProduct.bind(this, product)}
          />
        )}     
      </div>
    )
  }
}

module.exports = ProductList;