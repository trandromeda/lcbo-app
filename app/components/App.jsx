import React from 'react';
import Filter from './Filter.jsx';
import ProductList from './ProductList.jsx';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super();

    this.state = {
      
    }
  }

  render () {
    return (
      <div className="wrapper">
        <div className="header">
          <h1>Drynk</h1>
        </div>

        <Filter />

        <ProductList />
      </div>
      )
  }
}

module.exports = App;