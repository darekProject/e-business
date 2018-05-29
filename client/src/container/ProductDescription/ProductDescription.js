import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../../actions';

import Header from '../Header/Header';
import Preloader from "../../components/Preloader/Preloader";
import Comments from "../Comments/Comments";

import './ProductDescription.css';

class ProductDescription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idProduct: parseInt(props.match.params.id, 10),
            quantity: 1
        }
    }

    componentDidMount() {
        this.props.getProduct(this.state.idProduct);
    }

    changeQuantity = type => {
        let {quantity} = this.state;

        if (type === "UP") {
            quantity += 1;
        } else {
            if (quantity < 2) {
                return;
            }
            quantity -= 1;
        }

        this.setState({quantity});
    };

    addProductToCart = id => {
        const {quantity} = this.state;
        this.props.addProductsToShoppingCart(id, quantity);
    };

    renderDescription = () => {
        const {product} = this.props;
        if (product) {
            return (
                <div className="container product-container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="product-title">{product.title}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 img-box">
                            <img src={`/images/${product.imgUrl}`} alt=""/>
                        </div>
                        <div className="col-lg prize-box">
                            <div>
                                <div className="prize">
                                    <p>Prize: <span>{product.cost}</span></p>
                                </div>
                                {product.freeDelivery ?
                                    <div className="free-delivery">
                                        <img src="/images/free-delivery.png" alt=""/>
                                        <span>Free delivery</span>
                                    </div> : null}
                                <div className="avaible">In magazine</div>
                                <span className="horizontal-line"></span>
                                <div className="section-buy">
                                    <p>Buy now - you will receive your order the day after tomorrow.</p>
                                    <p>Quantity: </p>
                                    <div className="quantity">
                                        <div onClick={() => this.changeQuantity("UP")}>
                                            <i className="fas fa-plus"></i>
                                        </div>
                                        <p className="amount">{this.state.quantity}</p>
                                        <div onClick={() => this.changeQuantity("DOWN")}>
                                            <i className="fas fa-minus"></i>
                                        </div>
                                    </div>
                                    <button className="btn-buy-product" onClick={() => this.addProductToCart(product.id)}>
                                        <i className="fas fa-shopping-cart"></i>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row product-description">
                        <div className="col-lg-2">
                            <img src="/images/wifi.jpg" alt=""/>
                        </div>
                        <div className="col-lg">
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Preloader/>
        }
    };

    render() {
        return <div>
            <Header/>
            {this.renderDescription()}
            <Comments idProduct={this.state.idProduct} />
        </div>
    }
}

const mapStateToProps = state => {
    return {
        product: state.product.product
    }
};

export default withRouter(connect(mapStateToProps, actions)(ProductDescription));