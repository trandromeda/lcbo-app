import React from 'react';
import Drink from './Drink.jsx';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        {this.props.data.map(product =>
          <Drink 
          key={product.id}
          data={product} 
          />
        )}     
      </div>
    )
  }
}

module.exports = ProductList;