export class Todos {
    static #instance

    #dom = document.getElementById("todo-list")

    constructor() {
        if(Todos.#instance) {
            return Todos.#instance
        }

        Todos.#instance = this
    }

    addItem(item) {
        this.#dom.appendChild(item.dom)
    }
}
