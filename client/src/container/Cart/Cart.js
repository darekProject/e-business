import React, {Component, Fragment} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import Preloader from "../../components/Preloader/Preloader";

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            products: null
        }
    };

    componentDidMount() {
        this.props.getProductsOfCart();
    }

    componentWillReceiveProps(nextProps) {
        const {products} = nextProps;
        if (products) {
            const rightProduct = [];

            products.map(prod => {
                const productExist = rightProduct.findIndex(p => p.id === prod.id);
                if (productExist !== -1) {
                    rightProduct[productExist].amount += 1;
                } else {
                    prod.amount = 1;
                    rightProduct.push(prod);
                }
            });

            rightProduct.map(prod => {
                const {cost, amount} = prod;
                const allCost = parseInt(cost.substring(0, cost.length - 1)) * amount;
                prod.cost = `${allCost}$`;
            });

            this.setState({products: rightProduct});
        }
    }

    renderProductsOfCart() {
        const {products} = this.state;

        if (products) {
            return <div>products</div>
        } else {
            return <Preloader/>
        }
    }

    render() {
        return (
            <Fragment>
                {this.renderProductsOfCart()}
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.product.productsOfCart
    }
};

export default connect(mapStateToProps, actions)(Cart);