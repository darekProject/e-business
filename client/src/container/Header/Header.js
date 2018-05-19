import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

import Categories from "../../components/Categories/Categories";
import Search from "../../components/Search/Search";
import ShoppingCart from '../../components/ShoppingCart/ShoppingCart';

import './Header.css';

class Header extends Component {

    constructor() {
        super();

        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            amountAddedProductToCart: this.getAmountAddedProducts()
        }
    };

    getAmountAddedProducts = () => {
        const addedProduct = JSON.parse(localStorage.getItem('productInShoppingCart'));
        return addedProduct ? addedProduct.length : 0;
    };


    componentWillReceiveProps(nextProps) {
        if (nextProps.productAddedToShoppingCarts) {
            const addedProduct = JSON.parse(localStorage.getItem('productInShoppingCart'));
            const amountAddedProduct = addedProduct.length;

            this.setState({amountAddedProductToCart: amountAddedProduct});
        }
    };

    render() {
        return <Fragment>
            <div className="container title-cart-box">
                <div className="row">
                    <div className="col-lg-12">
                        <div id="title">
                            <img src="/images/title-img.png" alt=""/>
                            <h1>SMART-SHOP</h1>
                        </div>
                        <div id="user">
                            <button>
                                <i className="far fa-user"></i>
                            </button>
                            <ShoppingCart amountProducts={this.state.amountAddedProductToCart}/>
                        </div>
                    </div>
                </div>
            </div>
            <Search/>
            <Categories/>
        </Fragment>
    }
}

const mapStateToProps = state => {
    return {
        productAddedToShoppingCarts: state.product.productAddedToShoppingCarts
    }
};

export default connect(mapStateToProps, actions)(Header);