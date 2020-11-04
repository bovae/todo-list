import React, {Component} from 'react';

export default class ItemStatusFilter extends Component {

    buttons = [this.createButton('all', 'All'),
        this.createButton('active', 'Active'),
        this.createButton('done', 'Done')];

    createButton(id, label) {
        return {
            id,
            label
        }
    }

    render() {
        const {activeTab: activeTabId, onTabClick} = this.props;

        const buttonElements = this.buttons.map(({id, label}) => {
            const clazz = id === activeTabId ? 'btn-info' : 'btn-outline-secondary';

            return (
                <button type="button"
                        className={`btn ${clazz}`}
                        onClick={() => onTabClick(id)}>
                    {label}
                </button>
            );
        })

        return (
            <div className="btn-group">
                {buttonElements}
            </div>
        );
    }
}
