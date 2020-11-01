import React from 'react';

import TodoListItem from "./todo-list-item";

const TodoList = ({todos}) => {
    const todoElements = todos.map(todo => {
        const {id: todoId, ...todoProps} = todo;

        return (
            <li key={todoId}><TodoListItem {...todoProps}/></li>
        )
    });

    return (
        <ul>
            {todoElements}
        </ul>
    );
}

export default TodoList;
