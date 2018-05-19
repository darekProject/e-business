import React from 'react';

import "./ProductCart.css"

const ProductCart = (props) => {
    return <div className="col-lg-4 product-cart-wrapper">
        <div className="product-cart">
            <img src={`/images/${props.imgUrl}`} alt={`${props.imgUrl}`}/>
            <div className="small-description">
                <h3 className='title-product'>{props.title}</h3>
                <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                </div>
                <footer>
                    <button onClick={() => props.handleAddProductToShoppingCarts(props.idProduct)} className="btn-buy">
                        <img src="/images/shoppingCarts.png" alt=""/>
                    </button>
                    <div className="cost">
                        <span>{props.cost}</span>
                        {props.freeDelivery ?
                            <div className="free-delivery">
                                <img src="/images/free-delivery.png" alt=""/>
                                <span>Darmowa dostawa</span>
                            </div> : null}
                    </div>
                </footer>
            </div>
        </div>
    </div>

};

export default ProductCart;