import React, {Component, Fragment} from 'react';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../../actions';
import {connect} from 'react-redux';

import './Search.css';

const renderField = ({input, placeholder, type, meta: {touched, error, warning}}) => (
    <Fragment>
        <input {...input} placeholder={placeholder} type={type}/>
        {touched && ((error && <span className="error-info">{error}</span>) || (warning &&
            <span className="error-info">{warning}</span>))}
    </Fragment>
);

class Search extends Component {

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 search-box">
                        <h2>Search Products:</h2>
                        <form id="search" onSubmit={handleSubmit((values) => this.props.handleSubmitSearch(values))}>
                            <Field type="text"
                                   name="keywords"
                                   component={renderField}
                                   placeholder="Write keywords..."/>
                            <button type="submit" className="btn btn-primary"><i className="fas fa-search"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const validate = values => {
    const errors = {};
    if (!values.keywords) {
        errors.keywords = 'Give any keywords'
    }
    return errors;
};

const reduxFormSearch = reduxForm({
    form: 'search',
    validate,
})(Search);

export default connect(null, actions)(reduxFormSearch);