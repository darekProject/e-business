import React from 'react';
import {Link} from 'react-router-dom';

import './ShoppingCart.css'

const shoppingCart = (props) => {
    return <div className="shopping-carts">
        <Link to='/shopping-cart'>
            <img src="/images/shoppingCarts.png" alt=""/>
            <div id="amount-products">{props.amountProducts}</div>
        </Link>
    </div>
};

export default shoppingCart;