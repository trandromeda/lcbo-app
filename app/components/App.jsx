import React from 'react';
import Drink from './Drink.jsx';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super();
  }

  componentWillMount() {

  }


  render () {
    return (
      <div className="container">
        <Drink />
        <Drink />
        <Drink />
        <Drink />
        <Drink />
        <Drink />        
      </div>
      )
  }
}

module.exports = App;