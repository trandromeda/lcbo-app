import React from 'react';
import DrinkCard from './DrinkCard.jsx';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Display a list of products 

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
              <DrinkCard
              key={product.id}
              data={product}
              onClick={this.showProduct.bind(this, product)}
              />
          )
          : 
            isSearching ?
              <div className="empty">Sorry, we couldn't find anything matching that. Please try again!
                <img src="https://media.giphy.com/media/VILJHh5AodVIs/giphy.gif"/>
              </div>
              : <span className="fa fa-spinner fa-pulse fa-3x fa-fw"></span>
            
        }    
      </div>
    )
  }
}

module.exports = ProductList;