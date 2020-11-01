import React from 'react';
import ReactDOM from 'react-dom';

import AppHeader from "./components/app-header";
import SearchPanel from "./components/search-panel";
import TodoList from "./components/todo-list";

const App = () => {
    const todoItems = [
        {
            id: 1,
            label: 'Learn React'
        },
        {
            id: 2,
            label: 'Build Awesome App',
            important: true
        },
        {
            id: 3,
            label: 'Have a  lunch'
        }];

    return (
        <div>
            <AppHeader/>
            <SearchPanel/>
            <TodoList todos={todoItems}/>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));
