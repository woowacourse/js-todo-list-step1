export class Todos {
    static #instance
    static #storage = new Map()

    #dom = document.getElementById("todo-list")

    constructor() {
        if (Todos.#instance) {
            return Todos.#instance
        }

        Todos.#instance = this
    }

    addItem(item) {
        Todos.#storage.set(item.id, item)

        this.#dom.appendChild(item.dom)
    }

    editItem(id, value) {
        const item = Todos.#storage.get(id)

        item.querySelector('label').innerText = value
        item.classList.toggle('editing')
    }

    cancelEditing(id) {
        const item = Todos.#storage.get(id)

        const originalValue = item.querySelector('label').textContent
        item.querySelector('.edit').value = originalValue

        item.classList.toggle('editing')
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

    setFilter(filter) {
        const values = [...Todos.#storage.values()]

        values.forEach(e => {
                if(filter(e)) e.toNoneHidden()
                else e.toHidden()
            })
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

    getSizeByFilter(filter) {
        const elements = [...this.#dom.querySelectorAll('li')]

        return elements.filter(e => filter(e)).length
    }

}
