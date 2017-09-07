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
      product: {},
      width: '0',
      filterVisible: false,
      searchOn: false,
      showModal: false,      
      showMobileProduct: false
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleShowProduct = this.handleShowProduct.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.toggleView = this.toggleView.bind(this);
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

  // This is executed by both the mobile and desktop views
  handleShowProduct(product) {
    this.setState({
      product: product
    })

  // If the viewport is desktop, show the modal. Otherwise, toggle the showMobileProduct state
  // This will hide the product list and show only the single product that was clicked
    this.state.width > 500 ? this.toggleModal() : this.setState({showMobileProduct: !this.state.showMobileProduct})
  }

  // Hide and show the filter form. Also set the app's status to searching or not
  toggleFilter() {
    this.setState({filterVisible: !this.state.filterVisible});
    this.setState({searchOn: !this.state.searchOn});
  }

  // This is solely responsible for returning the page to its default when navigating back from a mobile product page
  toggleView() {
    this.setState({showMobileProduct: !this.state.showMobileProduct})
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
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

        <Header filter={this.toggleFilter} back={this.toggleView} nav={this.state.showMobileProduct}/>

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

      {/* These next two if statements toggle on and off when going between single product view and list view */}  
        {!this.state.showMobileProduct && 
          <ProductList data={this.state.products} showProduct={this.handleShowProduct} isSearching={this.state.searchOn}/>
        }
        {this.state.showMobileProduct && <ProductView data={this.state.product}/>}

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