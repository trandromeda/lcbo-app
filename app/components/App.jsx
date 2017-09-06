import React from 'react';
import Drink from './Drink.jsx';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super();

    this.state = {
      products: []
    }
  }

  componentDidMount() {
    axios.get("https://lcboapi.com/products?access_key=MDplNzZhNjgwMi05MzMwLTExZTctOTc4NC1iN2U4ZjMxZDA4ODM6WDBwa1hqQTB0N01HOE1VY1JEbmlJd0FHRGR2c0Jhc3NvSmVI")
      .then(res => {
        const products = res.data.result
        this.setState({ products: products })
        console.log(this.state)
      })
  }

  render () {
    return (
      <div className="container">
        {this.state.products.map(product =>
          <Drink 
          key={product.id} 
          name={product.name} 
          thumbnail={product.image_thumb_url} 
          category={product.tertiary_category} 
          package={product.package}
          alcohol={product.alcohol_content}
          price={product.price_in_cents}
          is_dead={product.is_dead}
          />
        )}     
      </div>
      )
  }
}

module.exports = App;