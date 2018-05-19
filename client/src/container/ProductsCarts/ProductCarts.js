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
            allProducts: null,
            filteredProducts: null
        }
    };

    handleAddProductToShoppingCarts = (idProduct) => {
        this.props.addProductToShoppingCart(idProduct);
    };

    renderProducts = () => {
        const {allProducts, filteredProducts} = this.state;

        if (allProducts && !filteredProducts) {
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
            });
        } else if (filteredProducts) {
            return filteredProducts.map(product => {
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
            });
        } else {
            return <Preloader/>
        }
    };

    filterDataByCategory = category => {
        const {allProducts} = this.state;
        let rightProducts = null;
        if (category === 'all') {
            rightProducts = allProducts;
        } else {
            rightProducts = allProducts.filter(product => product.category === category);
        }

        this.setState({
            filteredProducts: rightProducts
        });
    };

    componentDidMount() {
        this.props.getProducts();
    }

    componentWillReceiveProps(nextProps) {

        const {allProducts, sortByCategory} = nextProps;

        if (allProducts) {
            this.setState({
                allProducts
            })
        }

        if (sortByCategory) {
            this.filterDataByCategory(sortByCategory);
        }

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
    getProducts: PropTypes.func,
    sortByCategory: PropTypes.string
};

ProductCarts.defaultTypes = {
    addProductToShoppingCart: () => {
    },
    getProducts: () => {
    },
    sortByCategory: null
};

const mapStateToProps = state => {
    return {
        allProducts: state.product.allProducts,
        sortByCategory: state.product.sortByCategory
    }
};

export default connect(mapStateToProps, actions)(ProductCarts);