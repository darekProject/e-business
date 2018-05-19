import React from 'react';

import './NoProducts.css';

const NoProduct = props => {
    return <div className="container">
        <div className="row">
            <div className="col-lg-12 text-center no-products">
                {props.information}
            </div>
        </div>
    </div>
};

export default NoProduct;