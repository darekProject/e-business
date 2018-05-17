import React, {Component, Fragment} from 'react';

import Categories from "../../components/Categories/Categories";
import Search from "../../components/Search/Search";
import ShoppingCart from '../../components/ShoppingCart/ShoppingCart';

import './Header.css';

class Header extends Component {
    render() {
        return <Fragment>
            <div className="container title-cart-box">
                <div className="row">
                    <div className="col-lg-12">
                        <div id="title">
                            <img src="/images/title-img.png" alt=""/>
                            <h1>SMART-SHOP</h1>
                        </div>
                        <div id="user">
                            <button>
                                <i className="far fa-user"></i>
                            </button>
                            <ShoppingCart amountProducts="3"/>
                        </div>
                    </div>
                </div>
            </div>
            <Search/>
            <Categories/>
        </Fragment>
    }
}

export default Header;