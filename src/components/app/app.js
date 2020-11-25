import React, {useState} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from "../item-add-form";

import './app.css';

const App = () => {

    let idGen = 0;

    const [todoData, setTodoData] = useState([
        createTodoItem('Drink Coffee'),
        createTodoItem('Build Awesome App', true),
        createTodoItem('Have a lunch', false, true)
    ]);

    const [activeTab, setActiveTab] = useState('all');

    const [searchFilter, setSearchFilter] = useState('');

    const addItem = (label) => {
        setTodoData(prevTodoData => [createTodoItem(label), ...prevTodoData]);
    }

    const deleteItem = (idToDelete) => {
        setTodoData(prevTodoData => {
            const idx = prevTodoData.findIndex(({id}) => id === idToDelete);

            return [...prevTodoData.slice(0, idx), ...prevTodoData.slice(idx + 1)];

        });
    }

    const changeActiveTab = (newActiveTab) => {
        setActiveTab(newActiveTab);
    }

    const changeSearchFilter = (newSearchFilter) => {
        setSearchFilter(!newSearchFilter.trim() ? newSearchFilter.trim() : newSearchFilter);
    }

    const toggleItemDoneProperty = (idToUpdateDoneStatus) => {
        setTodoData(togglePropertyAndGenerateTodoData(todoData, idToUpdateDoneStatus, 'done'));
    }

    const toggleItemImportantProperty = (idToUpdateImportantStatus) => {
        setTodoData(togglePropertyAndGenerateTodoData(todoData, idToUpdateImportantStatus, 'important'));
    }

    function togglePropertyAndGenerateTodoData(oldTodoData, itemId, propName) {
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

    function createTodoItem(label, important = false, done = false) {
        return {
            id: idGen++,
            label,
            important,
            done
        }
    }

    function filterByActiveTab(todoData, activeTab) {
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

    function filterBySearchFilter(todoData, searchFilter) {
        if (!searchFilter) {
            return todoData;
        }

        return todoData.filter(({label}) => label.toLowerCase().includes(searchFilter.trim().toLowerCase()));
    }

    function countDoneElements(todoData) {
        return todoData.filter((item) => item.done).length;
    }

    function countTodoElements(totalElements, doneElements) {
        return totalElements - doneElements;
    }

    const filteredTodoData = filterBySearchFilter(filterByActiveTab(todoData, activeTab), searchFilter);
    const doneCount = countDoneElements(todoData);
    const todoCount = countTodoElements(todoData.length, doneCount);

    return (
        <div className="todo-app">
            <AppHeader
                done={doneCount}
                toDo={todoCount}/>

            <div className="top-panel d-flex">
                <SearchPanel
                    searchFilter={searchFilter}
                    onSearchFilterChange={changeSearchFilter}/>
                <ItemStatusFilter
                    activeTab={activeTab}
                    onTabClick={changeActiveTab}/>
            </div>

            <ItemAddForm
                onAddButtonClick={addItem}/>

            <TodoList
                todos={filteredTodoData}
                onLabelClick={toggleItemDoneProperty}
                onDeleteClick={deleteItem}
                onImportantClick={toggleItemImportantProperty}/>
        </div>
    );
}

export default App;
