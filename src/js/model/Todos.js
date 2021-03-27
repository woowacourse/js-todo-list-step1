export class Todos {
    static #instance

    #dom = document.getElementById("todo-list")

    constructor() {
        if(Todos.#instance) {
            return Todos.#instance
        }

        this.#dom.addEventListener('click', e => Todos.#completeEventHandler(e))

        Todos.#instance = this
    }

    addItem(item) {
        this.#dom.appendChild(item.dom)
    }

    static #completeEventHandler(e) {
        if(e.target && e.target.nodeName === "INPUT") {
            const item = e.target.closest('Li')

            if(item.classList.toggle('completed')) {
                e.target.setAttribute('checked', '')
                return
            }

            e.target.removeAttribute('checked')
        }
    }
}
