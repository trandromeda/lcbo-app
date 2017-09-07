import React from 'react';
import Filter from './Filter.jsx';
import ProductList from './ProductList.jsx';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super();

    this.state = {
      seasonal: false,
      limited: false
    }

    this.handleSeasonalInput = this.handleSeasonalInput.bind(this);
    this.handleLimitedInput = this.handleLimitedInput.bind(this);
  }

  handleSeasonalInput(seasonal) {
    seasonal ? this.setState({seasonal: true}) : this.setState({seasonal: false})
  }

  handleLimitedInput(limited) {
    if (limited) {
      this.setState({
        limited: true
      })     
    } else {
      this.setState({
        limited: false
      })
    }
  }

  render () {
    return (
      <div className="wrapper">
        <div className="header">
          <h1>Drynk</h1>
        </div>

        <Filter 
          onSeasonalInput={this.handleSeasonalInput}
          onLimitedInput={this.handleLimitedInput}
        />

        <ProductList seasonal={this.state.seasonal} limited={this.state.limited}/>
      </div>
      )
  }
}

module.exports = App;