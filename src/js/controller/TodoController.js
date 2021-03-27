import {Item} from "../model/Item.js"
import {Todos} from "../model/Todos.js"
import {Count} from "../model/Count.js";
import {Filter} from "../model/Filter.js";


export class TodoController {

    constructor() {
        this.eventHandler()
    }


    addItem(value) {
        const todos = new Todos()

        const item = new Item(value)
        todos.addItem(item)

        new Count().setCount()
    }

    editItem(id, value) {
        const todos = new Todos()

        todos.editItem(id, value)

        new Count().setCount()
    }

    cancelEditing(id) {
        const todos = new Todos()

        todos.cancelEditing(id)

        new Count().setCount()
    }

    eventHandler() {
        let filters = document.getElementsByClassName('filters')[0];
        let filter = new Filter()
        filters.addEventListener('click', e => {
            filter.filterHandler(e)

            new Count().setCount(e.target)
        })

        let todoList =document.getElementById("todo-list")
        let todos = new Todos()

        todoList.addEventListener('click', e => {
            todos.completeEventHandler(e)
            todos.removeEventHandler(e)

            new Count().setCount()
        })

        todoList.addEventListener('dblclick', e => todos.editEventHandler(e))
    }

}