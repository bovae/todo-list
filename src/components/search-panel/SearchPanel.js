import React from 'react';

import './search-panel.css';

const SearchPanel = ({onSearchFilterChange, searchFilter}) => {

    const onLabelChange = (e) => {
        e.preventDefault();
        onSearchFilterChange(e.target.value);
    }

    return <input className="form-control search-panel"
                  value={searchFilter}
                  onChange={onLabelChange}
                  placeholder="Type to search"/>;
}

export default SearchPanel;
