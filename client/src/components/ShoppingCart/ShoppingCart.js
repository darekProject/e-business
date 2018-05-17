import React from 'react';

import './ShoppingCart.css'

const shoppingCart = (props) => {
    return <div className="shopping-carts">
        <img src="/images/shoppingCarts.png" alt=""/>
        <div id="amount-products">{props.amountProducts}</div>
    </div>
};

export default shoppingCart;