import React from 'react';
import Drink from './Drink.jsx';
import axios from 'axios'

axios.defaults.headers.common['Authorization'] = 'Token token=MDplNzZhNjgwMi05MzMwLTExZTctOTc4NC1iN2U4ZjMxZDA4ODM6WDBwa1hqQTB0N01HOE1VY1JEbmlJd0FHRGR2c0Jhc3NvSmVI';

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      seasonal: this.props.seasonal,
      limited: this.props.limited   
    }

    this.getProducts = this.getProducts.bind(this);
  }

  getProducts() {
    let query = [];

    if (this.state.seasonal) { query.push("is_seasonal") };
    if (this.state.limited) { query.push("has_limited_time_offer") };

    const config = {
      params: {
        where: query.join(',')
      }
    }

    axios.get("https://lcboapi.com/products?", config)
      .then(res => {
        const products = res.data.result
        this.setState({ products: products })
        console.log(this.state.products)
      })
  }

  componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate() {
    console.log('updated')
  }

  render() {
    return (
      <div className="container">
        Displaying:
        {this.props.seasonal ? 'Seasonal' : 'All'},
        {this.props.limited ? 'Limited' : 'All'}
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