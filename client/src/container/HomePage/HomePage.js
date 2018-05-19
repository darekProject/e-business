import React, {Component, Fragment} from 'react';
import '../../App.css';

import Header from "../Header/Header";
import ProductCarts from "../ProductsCarts/ProductCarts";

class HomePage extends Component {
  render() {
    return (
      <Fragment>
          <Header/>
          <ProductCarts/>
      </Fragment>
    );
  }
}

export default HomePage;
