import React from 'react';
import Drink from './Drink.jsx';

class App extends React.Component {
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