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
        this.setState(({todoData}) => {
            return {
                todoData: [this.createTodoItem(label), ...todoData]
            };
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

    deleteItem = (idToDelete) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex(({id}) => id === idToDelete);

            return {
                todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
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
            searchFilter: !searchFilter.trim() ? searchFilter.trim() : searchFilter
        });
    }

    filterByActiveTab(todoData, activeTab) {
        switch (activeTab.toLowerCase()) {
            default:
            case 'all':
                return todoData;
            case 'active':
                return todoData.filter(todo => !todo.done);
            case 'done':
                return todoData.filter(todo => todo.done);
        }
    }

    filterBySearchFilter(todoData, searchFilter) {
        if (!searchFilter) {
            return todoData;
        }

        return todoData.filter(({label}) => label.toLowerCase().includes(searchFilter.trim().toLowerCase()));
    }

    toggleItemDoneProperty = (idToUpdateDoneStatus) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.togglePropertyAndGenerateTodoData(todoData, idToUpdateDoneStatus, 'done')
            };
        });
    }

    toggleItemImportantProperty = (idToUpdateImportantStatus) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.togglePropertyAndGenerateTodoData(todoData, idToUpdateImportantStatus, 'important')
            };
        });
    }

    togglePropertyAndGenerateTodoData(oldTodoData, itemId, propName) {
        const donePropName = 'done';
        const importantPropName = 'important';

        function addDoneElement(todoData, updatedItem, itemIdx, prevDoneProperty) {
            if (!prevDoneProperty) {
                return [...todoData.slice(0, itemIdx), ...todoData.slice(itemIdx + 1), updatedItem];
            }
            return [updatedItem, ...todoData.slice(0, itemIdx), ...todoData.slice(itemIdx + 1)];
        }

        function addImportantElement(todoData, updatedItem, itemIdx, prevImportantProperty, prevDoneProperty) {
            if (!prevImportantProperty && !prevDoneProperty) {
                return [updatedItem, ...todoData.slice(0, itemIdx), ...todoData.slice(itemIdx + 1)];
            }
            return [...todoData.slice(0, itemIdx), updatedItem, ...oldTodoData.slice(itemIdx + 1)];
        }

        const idx = oldTodoData.findIndex(({id}) => id === itemId);
        const oldItem = oldTodoData[idx];

        const updatedItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        }

        switch (propName) {
            case donePropName:
                return addDoneElement(oldTodoData, updatedItem, idx, oldItem[donePropName]);
            case importantPropName:
                return addImportantElement(oldTodoData, updatedItem, idx, oldItem[importantPropName], oldItem[donePropName]);
            default:
                return oldTodoData;
        }
    }

    render() {
        const {todoData, activeTab, searchFilter} = this.state;

        const filteredTodoData = this.filterBySearchFilter(this.filterByActiveTab(todoData, activeTab), searchFilter);

        const doneCount = todoData.filter((item) => item.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader
                    done={doneCount}
                    toDo={todoCount}/>

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
                    todos={filteredTodoData}
                    onLabelClick={this.toggleItemDoneProperty}
                    onDeleteClick={this.deleteItem}
                    onImportantClick={this.toggleItemImportantProperty}/>
            </div>
        );
    }
}
