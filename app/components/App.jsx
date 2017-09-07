import React from 'react';
import Filter from './Filter.jsx';
import ProductList from './ProductList.jsx';
import axios from 'axios'
import update from 'immutability-helper';

axios.defaults.headers.common['Authorization'] = 'Token token=MDplNzZhNjgwMi05MzMwLTExZTctOTc4NC1iN2U4ZjMxZDA4ODM6WDBwa1hqQTB0N01HOE1VY1JEbmlJd0FHRGR2c0Jhc3NvSmVI';

class App extends React.Component {
  constructor(props) {
    super();

    this.state = {
      products: [],
      query: []
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getProducts() {
    const config = {
      params: {
        where: this.state.query.join(','),
        per_page: 21
      }
    }

    axios.get("https://lcboapi.com/products?", config)
      .then(res => {
        const products = res.data.result
        this.setState({ products: products })
      })
  }

  handleInput(checked, value) {
    if (checked) {
      this.setState(prevState => ({
        query: [...prevState.query, value]
      }))      
    } else {
      this.setState(prevState => ({
        query: update(this.state.query, {$splice: [[prevState.query.indexOf(value), 1]]})
      }))
    }
  }

  handleSubmit() {
    this.getProducts();
  }

  componentDidMount() {
    this.getProducts();
  }

  render () {
    return (
      <div className="wrapper">
        <div className="header">
          <h1>Drynk</h1>
        </div>

        <Filter 
          onInput={this.handleInput}
          onSubmit={this.handleSubmit}
        />

        <ProductList data={this.state.products}/>
      </div>
      )
  }
}

module.exports = App;