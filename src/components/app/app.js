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
        ]
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

    render() {
        const {todoData} = this.state;
        const doneCount = todoData
            .filter((el) => el.done)
            .length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader
                    toDo={todoCount}
                    done={doneCount}/>

                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>

                <ItemAddForm
                    onAddButtonClick={this.addItem}/>

                <TodoList
                    todos={todoData}
                    onLabelClick={this.updateItemDoneStatus}
                    onDeleteClick={this.deleteItem}
                    onImportantClick={this.updateItemImportantStatus}/>
            </div>
        );
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
}
