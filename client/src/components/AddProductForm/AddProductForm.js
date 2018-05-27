import React, {Component, Fragment} from 'react';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../../actions';
import {connect} from 'react-redux';

import './AddProductForm.css';

const renderField = ({input, placeholder, type, meta: {touched, error, warning}}) => (
    <Fragment>
        <input {...input} placeholder={placeholder} type={type}/>
        {touched && ((error && <span className="error-info">{error}</span>) || (warning &&
            <span className="error-info">{warning}</span>))}
    </Fragment>
);

const renderFieldText = ({input, placeholder, type, meta: {touched, error, warning}}) => (
    <Fragment>
        <textarea {...input} placeholder={placeholder} type={type}></textarea>
        {touched && ((error && <span className="error-info">{error}</span>) || (warning &&
            <span className="error-info">{warning}</span>))}
    </Fragment>
);

class AddProductForm extends Component {

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 add-product-box">
                        <h2>Add Products:</h2>
                        <form id="addProduct"
                              onSubmit={handleSubmit((values) => this.props.handleSubmitProductForm(values))}>
                            <div className="form-box">
                                <label>Title:</label>
                                <div>
                                    <Field type="text"
                                           name="name"
                                           component={renderField}
                                           placeholder="name..."/>
                                </div>
                            </div>
                            <div className="form-box">
                                <label>Key words:</label>
                                <div>
                                    <Field type="text"
                                           name="keyWords"
                                           component={renderField}
                                           placeholder="phone, asus..."/>
                                </div>
                            </div>
                            <div className="form-box">
                                <label>Category:</label>
                                <div>
                                    <Field type="text"
                                           name="category"
                                           component={renderField}
                                           placeholder="category..."/>
                                </div>
                            </div>
                            <div className="form-box">
                                <label>Img url:</label>
                                <div>
                                    <Field type="text"
                                           name="imgUrl"
                                           component={renderField}
                                           placeholder="asus_zenfone.png"/>
                                </div>
                            </div>
                            <div className="form-box">
                                <label>Description:</label>
                                <div>
                                    <Field type="text"
                                           name="description"
                                           component={renderFieldText}
                                           placeholder="description..."/>
                                </div>
                            </div>
                            <div className="form-box">
                                <label>Prize:</label>
                                <div>
                                    <Field type="text"
                                           name="prize"
                                           component={renderField}
                                           placeholder="300$"/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Add product</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Give a name!'
    } else if (!values.keywords) {
        errors.keywords = 'Give any key words!'
    } else if (!values.category) {
        errors.category = 'Give a category!'
    } else if (!values.imgUrl) {
        errors.imgUrl = 'Give an img url!'
    } else if (!values.description) {
        errors.description = 'Give a description!'
    }
    return errors;
};

const reduxAddProductForm = reduxForm({
    form: 'addProduct',
    validate,
})(AddProductForm);

export default connect(null, actions)(reduxAddProductForm);