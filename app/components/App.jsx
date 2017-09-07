import React from 'react';
import Header from './Header.jsx';
import Filter from './Filter.jsx';
import ProductList from './ProductList.jsx';
import ProductModal from './ProductModal.jsx';

import axios from 'axios'
import update from 'immutability-helper';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Media from 'react-media';

axios.defaults.headers.common['Authorization'] = 'Token token=MDplNzZhNjgwMi05MzMwLTExZTctOTc4NC1iN2U4ZjMxZDA4ODM6WDBwa1hqQTB0N01HOE1VY1JEbmlJd0FHRGR2c0Jhc3NvSmVI';

class App extends React.Component {
  constructor(props) {
    super();

    this.state = {
      products: [],
      where: [],
      query: '',
      filterVisible: false,
      showModal: false,
      product: {}
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleShowProduct = this.handleShowProduct.bind(this);
  }

  getProducts() {
    const config = {
      params: {
        where: this.state.where.join(','),
        q: this.state.query,
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
        where: [...prevState.where, value]
      }))      
    } else {
      this.setState(prevState => ({
        where: update(this.state.where, {$splice: [[prevState.where.indexOf(value), 1]]})
      }))
    }
  }

  handleSearch(search) {
    this.setState({
      query: search.split(' ').join('+')
    })
  }

  handleSubmit() {
    this.getProducts();
  }

  handleShowProduct(product) {
    console.log(product);
    this.setState({
      product: product
    })
    this.toggleModal();
  }

  toggleFilter() {
    this.setState({filterVisible: !this.state.filterVisible});
        console.log(this.state.products)

  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  componentDidMount() {
    this.getProducts();
  }

  render () {
    return (
      <div className="wrapper">
        <Header onClick={this.toggleFilter}/>

        {
          this.state.filterVisible
            ?  <Filter 
                onInput={this.handleInput}
                search={this.state.query}
                onSearch={this.handleSearch}
                onSubmit={this.handleSubmit}
                />
            : null
        }
        <ProductList data={this.state.products} showProduct={this.handleShowProduct}/>

        <ProductModal 
          show={this.state.showModal}
          onClose={this.toggleModal}
          data={this.state.product}
        / >
      </div>
      )
  }
}

module.exports = App;