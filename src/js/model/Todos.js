export class Todos {
    static #instance

    #dom = document.getElementById("todo-list")

    constructor() {
        if (Todos.#instance) {
            return Todos.#instance
        }

        this.#dom.addEventListener('click', e => this.#completeEventHandler(e))

        Todos.#instance = this
    }

    addItem(item) {
        this.#dom.appendChild(item.dom)
    }

    #completeEventHandler(e) {
        this.#setCompletedIfPossible(e)
        this.#removeItemIfPossible(e)
    }

    #setCompletedIfPossible(e) {
        if (!(e.target && e.target.nodeName === "INPUT")) return

        const item = e.target.closest('Li')

        if (item.classList.toggle('completed')) {
            e.target.setAttribute('checked', '')
            return
        }

        e.target.removeAttribute('checked')

    }

    #removeItemIfPossible(e) {
        if (!(e.target && e.target.nodeName === 'BUTTON')) return

        const item = e.target.closest('Li')

        this.#dom.removeChild(item)
    }
}
