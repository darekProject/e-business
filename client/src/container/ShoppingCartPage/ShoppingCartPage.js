import React, {Component, Fragment} from 'react';

import Header from '../Header/Header';
import Cart from "../Cart/Cart";

class ShoppingCartPage extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <Cart/>
            </Fragment>
        )
    }
}

export default ShoppingCartPage;