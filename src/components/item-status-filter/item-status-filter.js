import React, {Component} from 'react';

import './item-status-filter.css'

export default class ItemStatusFilter extends Component {

    render() {
        const {activeTab, onTabClick} = this.props;
        const allTabId = 'all';
        const activeTabId = 'active';
        const doneTabId = 'done';

        let allTabClasses = 'btn';
        let activeTabClasses = 'btn';
        let doneTabClasses = 'btn';

        if (activeTab === allTabId) {
            allTabClasses += ' btn-info';
            activeTabClasses += ' btn-outline-secondary';
            doneTabClasses += ' btn-outline-secondary';
        } else if (activeTab === activeTabId) {
            allTabClasses += ' btn-outline-secondary';
            activeTabClasses += ' btn-info';
            doneTabClasses += ' btn-outline-secondary';
        } else if (activeTab === doneTabId) {
            allTabClasses += ' btn-outline-secondary';
            activeTabClasses += ' btn-outline-secondary';
            doneTabClasses += ' btn-info';
        }

        return (
            <div className="btn-group">
                <button type="button"
                        className={allTabClasses}
                        onClick={() => onTabClick(allTabId)}>
                    All
                </button>
                <button type="button"
                        className={activeTabClasses}
                        onClick={() => onTabClick(activeTabId)}>
                    Active
                </button>
                <button type="button"
                        className={doneTabClasses}
                        onClick={() => onTabClick(doneTabId)}>
                    Done
                </button>
            </div>
        );
    }
}
