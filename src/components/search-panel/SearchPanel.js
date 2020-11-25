import React from 'react';

import './search-panel.css';

const SearchPanel = (props) => {

    const onLabelChange = (e) => {
        e.preventDefault();
        props.onSearchFilterChange(e.target.value);
    }

    return <input className="form-control search-panel"
                  value={props.searchFilter}
                  onChange={onLabelChange}
                  placeholder="Type to search"/>;
}

export default SearchPanel;
