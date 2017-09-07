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
    const isEmpty = this.props.data.length > 1 ? true : false;
    const isSearching = this.props.isSearching;

    return (
      <div className="container">
        {isEmpty 
          ? 
          this.props.data.map(product =>
            <Drink 
            key={product.id}
            data={product}
            onClick={this.showProduct.bind(this, product)}
            />
          )
          : 
            isSearching ?
              <div className="empty">Sorry, we couldn't find anything matching that. Please try again!
                <img src="https://media.giphy.com/media/K4849SW5Womc0/giphy.gif"/>
              </div>
              : <span class="fa fa-spinner fa-pulse fa-3x fa-fw"></span>
            
        }    
      </div>
    )
  }
}

module.exports = ProductList;