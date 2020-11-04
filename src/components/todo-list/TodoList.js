import React from 'react';

import TodoListItem from "../todo-list-item";

const TodoList = ({todos, onLabelClick, onDeleteClick, onImportantClick}) => {
    const todoElements = todos.map(todo => {
        const {id: todoId, ...todoProps} = todo;

        return (
            <TodoListItem
                {...todoProps}
                onLabelClick={() => onLabelClick(todoId)}
                onDeleteClick={() => onDeleteClick(todoId)}
                onImportantClick={() => onImportantClick(todoId)}/>
        )
    });

    return (
        <ul className="list-group">
            {todoElements}
        </ul>
    );
}

export default TodoList;
