import React, {Component, Fragment} from 'react';
import '../../App.css';

import Header from "../Header/Header";
import ProductCards from "../ProductsCards/ProductCards";

class HomePage extends Component {
  render() {
    return (
      <Fragment>
          <Header/>
          <ProductCards/>
      </Fragment>
    );
  }
}

export default HomePage;
