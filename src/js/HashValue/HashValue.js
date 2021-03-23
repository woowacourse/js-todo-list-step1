import {ElementRepository} from "../ElementRepository.js";
import {OutputView} from "../view/OutputView.js";

export class HashValue {

    #app

    constructor(app) {
        this.#app = app
    }

    addEvents(doms) {
        doms.forEach(
            dom => {
                this.#addCheckboxEvent(dom)
                this.#addRemoveEvent(dom)
                this.#addModifyEvent(dom)
            }
        )
        return doms
    }

    #addCheckboxEvent(dom) {
        let checkbox = dom.querySelector("input[type=checkbox]")
        let id = dom.getAttribute("id")
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                ElementRepository.setDone(id)
                dom.classList.add('completed')
            } else {
                ElementRepository.setUnDone(id)
                dom.classList.remove('completed')
            }
        })
    }

    #addRemoveEvent(dom) {
        let id = dom.getAttribute("id")
        let remove = dom.querySelector("button[class=destroy]")
        console.log(id)
        remove.addEventListener('click', () => {
            ElementRepository.removeElementById(id)
            document.getElementById(id).remove()
            OutputView.printCount()
        })
    }

    #addModifyEvent(dom) {
        let checkbox = dom.querySelector("label")

        checkbox.addEventListener('dblclick', () => {
            this.#app.setEditingElement(dom)
            dom.classList.remove('view')
            dom.classList.add('editing')
        })
    }

    toDom(id, element) {
        let html = `
        <li id="${id}" class="${element.getState()}">
            <div class="view">
                <input class="toggle" type="checkbox"/>
                <label class="label">${element.getText()}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit"/ value="${element.getText()}">
        </li>`

        let dom = new DOMParser().parseFromString(html, "text/html")
        return dom.getRootNode().body.querySelector("li")
    }

}