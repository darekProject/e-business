import React, {Component} from 'react';

import ProductCart from "../../components/ProductCart/ProductCart";

import './ProductsCarts.css';

const MOCK_PRODUCTS = [
    {
        id: 1,
        title: "Asus Zenfone 2",
        imgUrl: 'asus_zenfone_5.jpg',
        cost: '350$',
        freeDelivery: false
    },
    {
        id: 2,
        title: "Asus Zenfone 5",
        imgUrl: 'asus_zenfone_5.jpg',
        cost: '1200$',
        freeDelivery: true
    },
    {
        id: 3,
        title: "Asus Zenfone 1",
        imgUrl: 'asus_zenfone_5.jpg',
        cost: '450$',
        freeDelivery: false
    },
    {
        id: 4,
        title: "Samsung Galaxy 3",
        imgUrl: 'asus_zenfone_5.jpg',
        cost: '1450$',
        freeDelivery: true
    },
    {
        id: 5,
        title: "Asus Zenfone 1",
        imgUrl: 'asus_zenfone_5.jpg',
        cost: '450$',
        freeDelivery: false
    },
    {
        id: 5,
        title: "Asus Zenfone 1",
        imgUrl: 'asus_zenfone_5.jpg',
        cost: '4450$',
        freeDelivery: true
    },
];

class ProductCarts extends Component {

    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            products: MOCK_PRODUCTS
        }
    };

    renderProducts = () => {
        return this.state.products.map(product => {
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
                freeDelivery
            };
            return <ProductCart {...props} />
        })
    };

    render() {
        return <div className="container all-products">
            <div className="row">
                {this.renderProducts()}
            </div>
        </div>
    }
}

export default ProductCarts;