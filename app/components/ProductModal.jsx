import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Display a single product in a modal on desktop

import ProductView from './ProductView.jsx';

class Modal extends React.Component {
    render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="modal">
          <button className="close" onClick={this.props.onClose}>
            <span className="fa fa-times"></span>
          </button>

          <ProductView data={this.props.data} />

        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;