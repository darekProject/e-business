import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../../actions';

import Header from '../Header/Header';

class ProductDescription extends Component {

    constructor(props) {
        super(props);
    }

    test = () => {
        console.log(this.props);
        console.log(this.props.match.params.id);
    };

    render() {
        return <div>
            <Header/>
            <div>Product Description</div>
            {this.test()}
        </div>
    }
}

export default withRouter(connect(null, actions)(ProductDescription));