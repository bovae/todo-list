import React from 'react';

import TodoListItem from "../todo-list-item";

import './todo-list.css';

const TodoList = ({todos}) => {
    const todoElements = todos.map(todo => {
        const {id: todoId, ...todoProps} = todo;

        return (
            <li key={todoId} className="list-group-item">
                <TodoListItem {...todoProps}/>
            </li>
        )
    });

    return (
        <ul className="list-group todo-list">
            {todoElements}
        </ul>
    );
}

export default TodoList;
