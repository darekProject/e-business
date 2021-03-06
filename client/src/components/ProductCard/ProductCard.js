import React from 'react';

import "./ProductCard.css"

const ProductCard = (props) => {
    return <div className="col-lg-4 product-card-wrapper">
        <div className="product-card">
            <img src={`/images/${props.imgUrl}`} alt={`${props.imgUrl}`} onClick={() => props.goToDescription(props.idProduct)}/>
            <div className="small-description">
                <h3 className='title-product' onClick={() => props.goToDescription(props.idProduct)}>{props.title}</h3>
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

export default ProductCard;