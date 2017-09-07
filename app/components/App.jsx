import React from 'react';
import Header from './Header.jsx';
import Filter from './Filter.jsx';
import ProductList from './ProductList.jsx';
import ProductModal from './ProductModal.jsx';
import ProductView from './ProductView.jsx';

import axios from 'axios'
import update from 'immutability-helper';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
      searchOn: false,
      showModal: false,
      product: {},
      width: '0',
      height: '0',
      showMobileProduct: false
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleShowProduct = this.handleShowProduct.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
    this.setState({
      product: product
    })

    this.state.width > 500 ? this.toggleModal() : this.setState({showMobileProduct: !this.state.showMobileProduct})
  }

  toggleFilter() {
    this.setState({filterVisible: !this.state.filterVisible});
    this.setState({searchOn: !this.state.searchOn});
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentDidMount() {
    this.getProducts();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);    
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
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

        {!this.state.showMobileProduct && 
          <ProductList data={this.state.products} showProduct={this.handleShowProduct} isSearching={this.state.searchOn}/>
        }
        
        <Media query="(max-width: 500px)">
          { matches => matches ? (
            this.state.showMobileProduct && <ProductView data={this.state.product}/>
          ) : (
            <ProductModal 
              show={this.state.showModal}
              onClose={this.toggleModal}
              data={this.state.product}
            / >
          )}
        </Media>
      </div>
      )
  }
}

module.exports = App;