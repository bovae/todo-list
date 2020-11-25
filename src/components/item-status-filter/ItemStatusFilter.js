import React from 'react';

const ItemStatusFilter = (props) => {

    const buttons = [
        createButton('all', 'All'),
        createButton('active', 'Active'),
        createButton('done', 'Done')
    ];

    function createButton(id, label) {
        return {
            id,
            label
        }
    }

    const {activeTab: activeTabId, onTabClick} = props;

    const buttonElements = buttons.map(({id, label}) => {
        const clazz = id === activeTabId ? 'btn-info' : 'btn-outline-secondary';

        return (
            <button type="button"
                    className={`btn ${clazz}`}
                    onClick={() => onTabClick(id)}>
                {label}
            </button>
        );
    });

    return (
        <div className="btn-group">
            {buttonElements}
        </div>
    );
}

export default ItemStatusFilter;
