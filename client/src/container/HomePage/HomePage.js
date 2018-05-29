import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import '../../App.css';

import Header from "../Header/Header";
import ProductCards from "../ProductsCards/ProductCards";

class HomePage extends Component {

    componentDidMount() {
        this.props.fetchUser()
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <ProductCards/>
            </Fragment>
        );
    }
}

export default connect(null, actions)(HomePage);
