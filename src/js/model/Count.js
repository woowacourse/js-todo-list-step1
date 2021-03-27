import {Todos} from "./Todos.js";

export class Count {

    static #TODOS = new Todos()
    #dom = document.getElementsByClassName('todo-count')[0]

    setCount(e) {
        const hash = this.#getHash(e)
        let cnt = 0;

        if(hash === '#' || hash == '') {
            cnt = Count.#TODOS.getSizeByFilter(n => true)
        }

        if(hash === '#active') {
            cnt = Count.#TODOS.getSizeByFilter(n => n.className !== 'completed')
        }

        if(hash === '#completed') {
            cnt = Count.#TODOS.getSizeByFilter(n => n.className === 'completed')
        }

        this.#dom.querySelector('strong').textContent = cnt.toString()
    }

    #getHash(e) {
        return e ? e.href.substring(e.href.indexOf('#')) : location.hash
    }

}