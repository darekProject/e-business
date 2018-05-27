import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';

import AddProductForm from "../../components/AddProductForm/AddProductForm";

class AddProducts extends Component {

    handleSubmitProductForm = (values) => {
        this.props.addProduct(values);
    };

    renderMessage = () => {
        if (this.props.status && this.props.status.data.status === 'OK') {
            return <div className="added-product">PRODUCT ADDED!!!</div>
        }
    };

    render() {
        return <Fragment>
            <AddProductForm handleSubmitProductForm={values => this.handleSubmitProductForm(values)}/>
            {this.renderMessage()}
        </Fragment>
    }
}

const mapStateToProps = state => {
    return {
        status: state.product.status
    }
};

AddProducts.propTypes = {
    addProduct: PropTypes.func,
    product: PropTypes.object
};

AddProducts.defaultProps = {
    product: '',
    addProduct: () => {
    }
};

export default connect(mapStateToProps, actions)(AddProducts);