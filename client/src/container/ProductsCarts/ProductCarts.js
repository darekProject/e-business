import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from '../../actions';

import ProductCart from "../../components/ProductCart/ProductCart";
import Preloader from '../../components/Preloader/Preloader';

import './ProductsCarts.css';
import NoProduct from "../../components/NoProducts/NoProducts";

class ProductCarts extends Component {

    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            allProducts: null,
            filteredProducts: null,
            noProducts: null
        }
    };

    handleAddProductToShoppingCarts = (idProduct) => {
        this.props.addProductToShoppingCart(idProduct);
    };

    renderProducts = () => {
        const {allProducts, filteredProducts, noProducts} = this.state;

        if (noProducts) {
            return <NoProduct information={'No products. You have to change key words!'}/>
        } else if (allProducts && !filteredProducts) {
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

        if (rightProducts.length > 0) {
            this.setState({
                filteredProducts: rightProducts
            });
        } else {
            this.setState({
                noProducts: true
            });
        }

    };

    filterProductsByKeyWords = keyWords => {
        const {allProducts} = this.state;

        const rightProducts = [];

        allProducts.map(product => {
            const productHasKey = product.keywords.split(',');
            const hasGoodKey = productHasKey.find(key => key.toLocaleLowerCase().trim() === keyWords.toLocaleLowerCase().trim());
            if (hasGoodKey) {
                rightProducts.push(product)
            }
        });

        if (rightProducts.length > 0) {
            this.setState({
                filteredProducts: rightProducts
            });
        } else {
            this.setState({
                noProducts: true
            });
        }
    };

    componentDidMount() {
        this.props.getProducts();
    }

    componentWillReceiveProps(nextProps) {

        const {allProducts, sortByCategory, sortByKeyWords} = nextProps;

        if (allProducts) {
            this.setState({
                allProducts
            })
        }

        if (sortByCategory) {
            this.filterDataByCategory(sortByCategory);
        }

        if (sortByKeyWords) {
            this.filterProductsByKeyWords(sortByKeyWords);
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
        sortByCategory: state.product.sortByCategory,
        sortByKeyWords: state.product.sortByKeyWords
    }
};

export default connect(mapStateToProps, actions)(ProductCarts);