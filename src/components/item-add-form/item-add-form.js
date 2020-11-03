import React, {Component} from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {

    state = {
        label: ''
    }

    onLabelChange = ({target: {value}}) => {
        this.setState({
            label: !value.trim() ? value.trim() : value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {label} = this.state;

        if (label.trim()) {
            this.props.onAddButtonClick(label);
            this.setState({
                label: ''
            });
        }
    }

    render() {
        return (
            <form className="item-add-form d-flex"
                  onSubmit={this.onSubmit}>
                <input type="text"
                       className="form-control"
                       value={this.state.label}
                       onChange={this.onLabelChange}
                       placeholder="What need to be done"/>
                <button className="btn btn-outline-secondary">
                    Add Item
                </button>
            </form>
        )
    }
}
