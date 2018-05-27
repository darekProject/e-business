import React, {Component} from 'react';
import * as acions from '../../actions';
import {connect} from 'react-redux';

class Comments extends Component {

    constructor(props) {
        super(props);
        this.state.idProduct = props.idProduct
    }

    render() {
        return <div>Comments {this.state.idProduct}</div>
    }
}

const mapStateToProps = state => {
  return {
      comments: state.product.comments
  }
};

export default connect(mapStateToProps, acions)(Comments);