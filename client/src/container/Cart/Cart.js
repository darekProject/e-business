import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import Preloader from "../../components/Preloader/Preloader";
import ProductCart from "../../components/ProductCart/ProductCart";
import NoProduct from "../../components/NoProducts/NoProducts";

import './Cart.css';

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            products: null,
            summaryCost: 0
        }
    };

    componentDidMount() {
        this.props.getProductsOfCart();
    }

    componentWillReceiveProps(nextProps) {
        const {products} = nextProps;
        if (products) {
            let summaryCost = 0;
            const rightProduct = [];

            products.map(prod => {
                const productExist = rightProduct.findIndex(p => p.id === prod.id);
                if (productExist !== -1) {
                    rightProduct[productExist].amount += 1;
                } else {
                    prod.amount = 1;
                    rightProduct.push(prod);
                }

                return prod;
            });

            rightProduct.map(prod => {
                const {cost, amount} = prod;
                const allCost = parseInt(cost.substring(0, cost.length - 1), 10) * amount;
                summaryCost += allCost;
                prod.allCost = `${allCost}$`;

                return prod;
            });

            this.setState({products: rightProduct, summaryCost: summaryCost + '$'});
        }
    }

    changeAmountProduct = (id, type) => {
        const {products} = this.state;
        let {summaryCost} = this.state;
        summaryCost = parseInt(summaryCost.substring(0, summaryCost.length - 1), 10);
        const prodIndex = products.findIndex(prod => prod.id === id);
        let {cost, amount, allCost} = products[prodIndex];

        if (type === "ADD") {
            amount += 1;
            allCost = parseInt(cost.substring(0, cost.length - 1), 10) * amount;
            summaryCost += parseInt(cost.substring(0, cost.length - 1), 10);
            products[prodIndex].allCost = `${allCost}$`;
            products[prodIndex].amount = amount;

            this.props.addProductToShoppingCart(id);
            this.setState({products, summaryCost: summaryCost + '$'});
        } else {
            amount -= 1;
            if (amount < 1) {
                this.removeProductOfCart(id, false);
                return;
            }
            allCost = parseInt(cost.substring(0, cost.length - 1), 10) * amount;
            summaryCost -= parseInt(cost.substring(0, cost.length - 1), 10);
            products[prodIndex].allCost = `${allCost}$`;
            products[prodIndex].amount = amount;

            this.props.removeProductOfShoppingCart(id, false);
            this.setState({products, summaryCost: summaryCost + '$'})
        }
    };

    removeProductOfCart = (id, force) => {
        const {products} = this.state;
        let {summaryCost} = this.state;
        const prodIndex = products.findIndex(prod => prod.id === id);
        let {cost, amount} = products[prodIndex];
        summaryCost = parseInt(summaryCost.substring(0, summaryCost.length - 1), 10);
        summaryCost -= parseInt(cost.substring(0, cost.length - 1), 10) * amount;
        products.splice(prodIndex, 1);

        this.props.removeProductOfShoppingCart(id, force);
        this.setState({products, summaryCost: summaryCost + '$'});
    };

    renderProductsOfCart() {
        const {products} = this.state;

        if (products && products.length > 0) {
            return (
                <div className="wrapper-products-cart">
                    <div className="title-table-column">
                        <span>Product</span>
                        <span>Prize</span>
                        <span>Amount</span>
                        <span>All</span>
                    </div>
                    <div className="custome-tbody">
                        {products.map(prod => {

                            const {
                                imgUrl,
                                title,
                                allCost,
                                cost,
                                id,
                                amount
                            } = prod;

                            const props = {
                                imgUrl,
                                allCost,
                                title,
                                prize: cost,
                                id,
                                amount,
                                changeAmountProduct: (id, type) => this.changeAmountProduct(id, type),
                                removeProductOfCart: (id, force) => this.removeProductOfCart(id, force)
                            };

                            return <ProductCart key={prod.id} {...props} />
                        })}
                    </div>
                </div>
            )
        } else if (products && products.length === 0) {
            return <NoProduct information={"You don`t have any products!"}/>
        } else {
            return <Preloader/>
        }
    }

    renderSummary = () => {
        const {summaryCost, products} = this.state;

        if (summaryCost !== 0 && products.length > 0) {
            return (
                <div>
                    <Link to='/'><i className="fas fa-arrow-left"></i>Go back to shop</Link>
                    <div>
                        <p>Cost of order: <span>{this.state.summaryCost}</span></p>
                        <button className="btn-buy-cart">Buy</button>
                    </div>
                </div>
            )
        }
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h1 className="shopping-cart-title">Your shopping cart:</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        {this.renderProductsOfCart()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 summary">
                        {this.renderSummary()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.product.productsOfCart,
        authenticated: state.user.authenticated,
        authUser: state.user.authenticated
    }
};

export default connect(mapStateToProps, actions)(Cart);