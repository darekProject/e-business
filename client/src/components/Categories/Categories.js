import React, {Component} from 'react';

import './Categories.css'

class Categories extends Component {

    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            activeCat: [false, false, false],
            categories: ['smartphone', 'laptops', 'accessories']
        }
    };

    getProductByCategory = (category, i) => {
        const activeCat = [false, false, false];
        activeCat[i] = true;
        this.setState({activeCat: [...activeCat]});
    };

    renderCategory = () => {
        return this.state.categories.map((category, i) => {
            return <div key={i} className={this.state.activeCat[i] ? "category active" : "category"}
                        onClick={() => this.getProductByCategory(category, i)}>
                {category}
            </div>
        })
    };

    render() {
        return <div className="container">
            <div className="row">
                <div className="categories-wrapper">
                    {this.renderCategory()}
                </div>
            </div>
        </div>
    }
}

export default Categories;