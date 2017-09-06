import React from 'react';
import Drink from './Drink.jsx';
import axios from 'axios'

class ProductList extends React.Component {
  constructor(props) {
    super();

    this.state = {
      products: []
    }
  }

  componentDidMount() {
    const config = {
      headers: {'Authorization': 'Token token=MDplNzZhNjgwMi05MzMwLTExZTctOTc4NC1iN2U4ZjMxZDA4ODM6WDBwa1hqQTB0N01HOE1VY1JEbmlJd0FHRGR2c0Jhc3NvSmVI'}
    }
    axios.get("https://lcboapi.com/products?where=has_limited_time_offer", config)
      .then(res => {
        const products = res.data.result
        this.setState({ products: products })
        console.log(this.state.products)
      })
  }
  render() {
    return (
      <div className="container">
        {this.state.products.map(product =>
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