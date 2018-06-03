import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {withRouter, Link} from 'react-router-dom';

import Categories from "../../components/Categories/Categories";
import Search from "../../components/Search/Search";
import ShoppingCart from '../../components/ShoppingCart/ShoppingCart';

import './Header.css';
import {getUserName} from "../../utils/token";

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

    handleSubmitSearch = ({keywords}) => {
        this.props.filterProductsByKeyWords(keywords);
        this.props.history.push('/');
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.productAddedToShoppingCarts) {
            const addedProduct = JSON.parse(localStorage.getItem('productInShoppingCart'));
            const amountAddedProduct = addedProduct ? addedProduct.length : 0;

            this.setState({amountAddedProductToCart: amountAddedProduct});
        }
    };

    checkAuthUser = () => {
        const {authenticated} = this.props;
        const name = getUserName();
        if (authenticated) {
            return (
                <div className="if-login" onClick={() => this.props.signOut()}>
                    <span>Welcome, {name}</span>
                    <a href="http://localhost:9090/signOut">
                        <img src="/images/logout.png" alt=""/>
                    </a>
                </div>)
        } else {
            return <Link to="/signIn">
                <button>
                    <i className="far fa-user"></i>
                </button>
            </Link>
        }
    };

    render() {
        return <Fragment>
            <div className="container title-cart-box">
                <div className="row">
                    <div className="col-lg-12">
                        <div id="title">
                            <Link to="/"><img src="/images/title-img.png" alt=""/></Link>
                            <h1>SMART-SHOP</h1>
                        </div>
                        <div id="user">
                            {this.checkAuthUser()}
                            <ShoppingCart amountProducts={this.state.amountAddedProductToCart}/>
                        </div>
                    </div>
                </div>
            </div>
            < Search handleSubmitSearch={(values) => this.handleSubmitSearch(values)}/>
            <Categories/>
        </Fragment>
    }
}

const mapStateToProps = state => {
    return {
        productAddedToShoppingCarts: state.product.productAddedToShoppingCarts || state.user.productAddedToShoppingCarts,
        authenticated: state.user.authenticated,
        authUser: state.user.authUser
    }
};

export default withRouter(connect(mapStateToProps, actions)(Header));