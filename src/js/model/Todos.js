export class Todos {
    static #instance

    #dom = document.getElementById("todo-list")

    constructor() {
        if (Todos.#instance) {
            return Todos.#instance
        }

        Todos.#instance = this
    }

    addItem(item) {
        this.#dom.appendChild(item.dom)
    }

    editItem(id, value) {
        const item = document.getElementById(id)

        item.querySelector('label').innerText = value
        item.classList.toggle('editing')
    }

    cancelEditing(id) {
        const item = document.getElementById(id)

        const originalValue = item.querySelector('label').textContent
        item.querySelector('.edit').value = originalValue

        item.classList.toggle('editing')
    }

    get allSize() {
        const elements = [...this.#dom.querySelectorAll('li')]
        return elements.length
    }

    completeEventHandler(e) {
        if (!(e.target && e.target.type === "checkbox")) return

        const item = e.target.closest('Li')

        if (item.classList.toggle('completed')) {
            e.target.setAttribute('checked', '')
            return
        }

        e.target.removeAttribute('checked')

    }

    removeEventHandler(e) {
        if (!(e.target && e.target.nodeName === 'BUTTON')) return
        const item = e.target.closest('Li')

        this.#dom.removeChild(item)
    }

    editEventHandler(e) {
        if (!(e.target && e.target.nodeName === 'LABEL')) return

        const item = e.target.closest('Li')

        item.classList.toggle('editing')
    }

}
