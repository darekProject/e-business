import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import {Route, BrowserRouter} from 'react-router-dom';

import './index.css';
import App from './container/HomePage/HomePage';
import AddProducts from "./container/AddProcucts/AddProducts";
import ShoppingCartPage from './container/ShoppingCartPage/ShoppingCartPage';
import ProductDescription from "./container/ProductDescription/ProductDescription";
import axios from 'axios';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

window.axios = require('axios');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Fragment>
                <Route exact path="/" component={App}/>
                <Route exact path="/shopping-cart" component={ShoppingCartPage}/>
                <Route exact path="/product/:id" component={ProductDescription}/>
                <Route path="/admin/addProduct" component={AddProducts}/>
            </Fragment>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
