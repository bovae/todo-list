import React from 'react';

import './todo-list-item.css';

function TodoListItem(props) {

    const {label, done, important, onLabelClick, onDeleteClick, onImportantClick} = props;

    let classNames = 'todo-list-item';
    if (done) {
        classNames += ' done';
    }

    if (important) {
        classNames += ' important';
    }

    return (
        <span className={classNames}>
                <span className="todo-list-item-label"
                      onClick={onLabelClick}>
                    {label}
                </span>

                <button type="button"
                        className="btn btn-outline-success btn-sm float-right"
                        onClick={onImportantClick}>
                    <i className="fa fa-exclamation"/>
                </button>

                <button type="button"
                        className="btn btn-outline-danger btn-sm float-right"
                        onClick={onDeleteClick}>
                    <i className="fa fa-trash-o"/>
                </button>
            </span>
    );
}

export default TodoListItem;
