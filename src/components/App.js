import TodoHeader from "./TodoHeader.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoTab from "./TodoTab.js";
import TodoCounter from "./TodoCounter.js";

class App {

    constructor() {
        try {
            this.todoHeader = new TodoHeader({
                $target: document.querySelector(".todo-header")
            });

            this.todoInput = new TodoInput({
                $target: document.querySelector(".todo-input")
            });

            this.todoList = new TodoList({
                $target: document.querySelector(".todo-list")
            });

            this.todoCounter = new TodoCounter({
                $target: document.querySelector(".todo-counter")
            });

            this.todoTab = new TodoTab({
                $target: document.querySelector(".filters")
            });

        } catch (e) {
            console.error(e.error);
        }
    }

}

export default App;
