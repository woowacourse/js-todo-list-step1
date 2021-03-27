import {Todos} from "./Todos.js";

export class Count {

    static #TODOS = new Todos()
    #dom = document.getElementsByClassName('todo-count')[0]

    setCount() {
        this.#dom.querySelector('strong').textContent = Count.#TODOS.allSize.toString()
    }

}