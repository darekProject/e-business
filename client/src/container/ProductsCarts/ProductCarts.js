import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from '../../actions';

import ProductCart from "../../components/ProductCart/ProductCart";
import Preloader from '../../components/Preloader/Preloader';

import './ProductsCarts.css';

class ProductCarts extends Component {

    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            allProducts: null
        }
    };

    handleAddProductToShoppingCarts = (idProduct) => {
        this.props.addProductToShoppingCart(idProduct);
    };

    renderProducts = () => {
        if (this.props.allProducts) {
            const {allProducts} = this.props;
            this.state.allProducts = allProducts;

            return allProducts.map(product => {
                const {
                    id,
                    title,
                    imgUrl,
                    cost,
                    freeDelivery
                } = product;

                const props = {
                    idProduct: id,
                    title,
                    imgUrl,
                    cost,
                    freeDelivery,
                    handleAddProductToShoppingCarts: this.handleAddProductToShoppingCarts
                };
                return <ProductCart {...props} />
            })
        } else {
            return <Preloader/>
        }
    };

    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        return <div className="container all-products">
            <div className="row">
                {this.renderProducts()}
            </div>
        </div>
    }
}

ProductCarts.propTypes = {
    addProductToShoppingCart: PropTypes.func,
    getProducts: PropTypes.func
};

ProductCarts.defaultTypes = {
    addProductToShoppingCart: () => {
    },
    getProducts: () => {
    }
};

const mapStateToProps = state => {
    return {
        allProducts: state.product.allProducts
    }
};

export default connect(mapStateToProps, actions)(ProductCarts);