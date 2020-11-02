import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from "../item-add-form";

import './app.css';

export default class App extends Component {

    idGen = 0;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Build Awesome App', true),
            this.createTodoItem('Have a lunch', false, true)
        ],
        activeTab: 'all',
        searchFilter: ''
    };

    addItem = (label) => {
        const newTodoItem = this.createTodoItem(label);

        this.setState(({todoData}) => {
            const newTodoData = [newTodoItem, ...todoData]

            return {
                todoData: newTodoData
            };
        });
    }

    updateItemDoneStatus = (idToUpdateDoneStatus) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.togglePropertyAndGenerateTodoData(todoData, idToUpdateDoneStatus, 'done')
            };
        });
    }

    deleteItem = (idToDelete) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex(({id}) => id === idToDelete);

            const newTodoData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

            return {
                todoData: newTodoData
            };
        });
    }

    updateItemImportantStatus = (idToUpdateImportantStatus) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.togglePropertyAndGenerateTodoData(todoData, idToUpdateImportantStatus, 'important')
            };
        });
    }

    changeActiveTab = (activeTab) => {
        this.setState({
            activeTab
        });
    }

    changeSearchFilter = (searchFilter) => {
        this.setState({
            searchFilter: searchFilter.trim()
        });
    }

    createTodoItem(label, important = false, done = false) {
        return {
            id: this.idGen++,
            label,
            important,
            done
        }
    }

    togglePropertyAndGenerateTodoData(oldTodoData, itemId, propName) {
        const donePropName = 'done';
        const importantPropName = 'important';

        const idx = oldTodoData.findIndex(({id}) => id === itemId);
        const oldItem = oldTodoData[idx];

        const updatedItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        }

        let newTodoData;
        if (propName === donePropName) {
            if (!oldItem[donePropName]) {
                newTodoData = [...oldTodoData.slice(0, idx), ...oldTodoData.slice(idx + 1), updatedItem];
            } else {
                newTodoData = [updatedItem, ...oldTodoData.slice(0, idx), ...oldTodoData.slice(idx + 1)];
            }
        } else if (propName === importantPropName) {
            if (!oldItem[importantPropName] && !oldItem[donePropName]) {
                newTodoData = [updatedItem, ...oldTodoData.slice(0, idx), ...oldTodoData.slice(idx + 1)];
            } else {
                newTodoData = [...oldTodoData.slice(0, idx), updatedItem, ...oldTodoData.slice(idx + 1)];
            }
        }

        return newTodoData;
    }

    render() {
        const {todoData, activeTab, searchFilter} = this.state;
        let activeTodoData;

        if (activeTab === 'all') {
            activeTodoData = todoData.filter((item) => item.label.toLowerCase().includes(searchFilter.toLowerCase()));
        } else if (activeTab === 'active') {
            activeTodoData = todoData
                .filter((item) => !item.done)
                .filter((item) => item.label.toLowerCase().includes(searchFilter.toLowerCase()));
        } else if (activeTab === 'done') {
            activeTodoData = todoData
                .filter((item) => item.done)
                .filter((item) => item.label.toLowerCase().includes(searchFilter.toLowerCase()));
        }

        const doneCount = todoData
            .filter((item) => item.done)
            .length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader
                    toDo={todoCount}
                    done={doneCount}/>

                <div className="top-panel d-flex">
                    <SearchPanel
                        searchFilter={searchFilter}
                        onSearchFilterChange={this.changeSearchFilter}/>
                    <ItemStatusFilter
                        activeTab={activeTab}
                        onTabClick={this.changeActiveTab}/>
                </div>

                <ItemAddForm
                    onAddButtonClick={this.addItem}/>

                <TodoList
                    todos={activeTodoData}
                    onLabelClick={this.updateItemDoneStatus}
                    onDeleteClick={this.deleteItem}
                    onImportantClick={this.updateItemImportantStatus}/>
            </div>
        );
    }
}
