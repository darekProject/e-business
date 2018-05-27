import React, {Component} from 'react';
import * as acions from '../../actions';
import {connect} from 'react-redux';
import Preloader from "../../components/Preloader/Preloader";
import Comment from "../../components/Comment/Comment";
import NoProduct from "../../components/NoProducts/NoProducts";

import './Comments.css';
import CommentsModal from "../../components/CommentsModal/CommentsModal";

class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState()
    }

    getInitialState = () => {
        return {
            idProduct: this.props.idProduct,
            comments: null,
            modalVisible: false
        }
    };

    componentDidMount() {
        this.props.getComments(this.state.idProduct);
    }

    static getDerivedStateFromProps(nextProps) {
        const {comments} = nextProps;

        if (comments) {
            return {
                comments
            }
        }
    }

    handleSubmitAddComments = (values) => {
        console.log(values);
    };

    renderComments = () => {
        const {comments} = this.state;

        if (comments && comments.length > 0) {
            return comments.map(comment => {
                const {
                    timestamp,
                    userName,
                    content
                } = comment;

                const props = {
                    timestamp,
                    userName,
                    content
                };

                return <Comment {...props}/>
            });
        } else if (comments && comments.length === 0) {
            return <NoProduct information="This product do not have comments"/>
        } else {
            return <Preloader/>
        }
    };

    renderButtonAddComment = () => {
        const {comments} = this.state;

        if (comments && comments.length > 0) {
            return (
                <div className="col-lg-12 add-comments">
                    <button className="add-comments-btn" onClick={() => this.switchModal()}><i className="fas fa-pencil-alt"></i></button>
                </div>
            )
        }
    };

    modalBackdropClicked = () => {
        this.setState({modalVisible: false});
    };

    renderModal = () => {
        return <CommentsModal modalVisible={this.state.modalVisible}
                              modalBackdropClicked={this.modalBackdropClicked}
                              switchModal={this.switchModal}
                              handleSubmitAddComments={values => this.handleSubmitAddComments(values)}/>
    };

    switchModal = () => {
        const {modalVisible} = this.state;
        this.setState({modalVisible: !modalVisible});
    };

    render() {
        return (
            <div className="container comments-box">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="product-opinins">Opinions about the product:</h1>
                    </div>
                </div>
                <div className="row comments">
                    {this.renderComments()}
                </div>
                <div className="row">
                    {this.renderButtonAddComment()}
                </div>
                {this.renderModal()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        comments: state.product.comments
    }
};

export default connect(mapStateToProps, acions)(Comments);