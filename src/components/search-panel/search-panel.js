import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

    onLabelChange = (e) => {
        e.preventDefault();
        this.props.onSearchFilterChange(e.target.value);
    }

    render() {
        return <input className="form-control search-panel"
                      value={this.props.searchFilter}
                      onChange={this.onLabelChange}
                      placeholder="Type to search"/>;
    }
}
