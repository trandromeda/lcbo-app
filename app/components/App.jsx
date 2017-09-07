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
      where: [],
      query: '',
      filterVisible: false
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
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

  toggleFilter() {
    this.setState({filterVisible: !this.state.filterVisible});
  }

  componentDidMount() {
    this.getProducts();
  }

  render () {
    return (
      <div className="wrapper">
        <div className="header">
          <div className="inner-wrapper">
            <div className="filter-icon" onClick={this.toggleFilter}>Filter</div>
            <h1>Drynk</h1>
          </div>
        </div>
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
        <ProductList data={this.state.products}/>
      </div>
      )
  }
}

module.exports = App;