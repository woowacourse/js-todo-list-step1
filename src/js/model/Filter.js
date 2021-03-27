import {Todos} from "./Todos.js";

export class Filter {
    static #DOM = document.getElementsByClassName('filters')[0]

    filterHandler(e) {
        if(!(e.target && e.target.nodeName === 'A')) {
            return
        }

        this.#setAllNodesToNoneSelected()

        e.target.classList.add('selected')

        this.#setItemsByFilter(e.target)
    }

    #setItemsByFilter(e) {
        const hash = e.href.substring(e.href.indexOf('#'))

        if(hash === '#') {
            new Todos().setFilter((n => true))
        }

        if(hash === '#active') {
            new Todos().setFilter((n => n.dom.className !== 'completed'))
        }

        if(hash === '#completed') {
            new Todos().setFilter((n => n.dom.className === 'completed'))
        }

    }

    #setAllNodesToNoneSelected() {
        const nodes = [...Filter.#DOM.querySelectorAll('a')]

        nodes.forEach(n => n.classList.remove('selected'))
    }


}