import React from 'react';

import './todo-list-item.css';

const TodoListItem = ({id, label, done, important, onLabelClick, onDeleteClick, onImportantClick}) => {

    let classNames = 'todo-list-item list-group-item';
    if (done) {
        classNames += ' todo-list-item-label-done';
    }
    if (important) {
        classNames += ' todo-list-item-label-important';
    }

    return (
        <li key={id} className={classNames}>
            <span className="todo-list-item-label"
                  onClick={onLabelClick}>
                {label}
            </span>

            <button type="button"
                    className="btn btn-outline-success btn-sm float-right todo-list-item-button"
                    onClick={onImportantClick}>
                <i className="fa fa-exclamation"/>
            </button>

            <button type="button"
                    className="btn btn-outline-danger btn-sm float-right todo-list-item-button"
                    onClick={onDeleteClick}>
                <i className="fa fa-trash-o"/>
            </button>
        </li>
    );
}

export default TodoListItem;
