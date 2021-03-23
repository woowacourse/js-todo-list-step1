import {ElementRepository} from './ElementRepository.js'
import {Element} from './Element.js'

class App {

    #editingElement

    run() {
        console.log("hello")
        this.#addEnterListenerWithElementHandler()
        this.#addCheckBoxListener()
    }


    #addCheckBoxListener() {
        let checkboxs = document.querySelectorAll("input[type=checkbox]")
        checkboxs.forEach(checkbox =>
            checkbox.addEventListener('change',
                () => {
                    checkbox.classList.toggle('#complete')
                }
            )
        )
    }

    #addEnterListenerWithElementHandler() {
        window.addEventListener("keydown", e => {
            if (e.code === "Escape" && this.#editingElement !== undefined) {
                this.#editingElement.classList.remove('editing')
                this.#editingElement.classList.add('view')
                this.#editingElement = undefined
            } else if (e.code === "Enter" && this.#editingElement !== undefined) {
                let id = this.#editingElement.getAttribute("id")
                let text = this.#editingElement.querySelector("input[class=edit]").value
                ElementRepository.changeText(id, text)
                this.#editingElement.classList.remove('editing')
                this.#editingElement.classList.add('view')
                this.#drawElementByHash()
            } else if (e.code === "Enter") {
                this.#addElement()
                // this.#addCheckboxListener()
                this.#clearInput()
                this.#drawElementByHash()
            }

        })
    }

    #addElement() {
        let userInput = this.#getTextFromUserInput();
        if (!this.#isBlank(userInput)) {
            return;
        }

        let newElement = new Element(userInput)
        ElementRepository.addElement(newElement)
    }

    #getTextFromUserInput() {
        return document.getElementsByClassName("new-todo")[0].value
    }

    #isBlank(input) {
        if (input === "" || input === undefined) return false
        return true
    }

    #drawElementByHash() {
        let hash = window.location.hash
        if (hash === "#active") {
            this.#draw(this.#getViewElementsByDom())
            return
        }

        if (hash === "#completed") {
            this.#draw(this.#getCompleteElementsByDom())
            return
        }
        console.log("tetsd")
        this.#draw(this.#getAllElementsByDom())
    }

    #draw(doms) {
        document.getElementById("todo-list").innerHTML = ""
        doms.forEach(dom => document.getElementById("todo-list").appendChild(dom))

    }

    #getCompleteElementsByDom() {
        return this.#toDomAndAddEvent(ElementRepository.getAllElements()
            .filter(element => element.value.isDone()))
    }

    #getViewElementsByDom() {
        return this.#toDomAndAddEvent(ElementRepository.getAllElements()
            .filter(element => !element.value.isDone()))
    }

    #getAllElementsByDom() {
        return this.#toDomAndAddEvent(ElementRepository.getAllElements())

    }

    #toDomAndAddEvent(elements) {
        let doms = elements.map(element => this.#toDom(element.id, element.value))
        doms.forEach(
            dom => {
                this.#addCheckboxEvent(dom)
                this.#addRemoveEvent(dom)
                this.#addModifyEvent(dom)
            }
        )

        return doms
    }

    #addModifyEvent(dom) {
        let checkbox = dom.querySelector("label")

        checkbox.addEventListener('dblclick', () => {
            this.#editingElement = dom
            dom.classList.remove('view')
            dom.classList.add('editing')
        })
    }

    #addRemoveEvent(dom) {
        let id = dom.getAttribute("id")
        let remove = dom.querySelector("button[class=destroy]")
        console.log(id)
        remove.addEventListener('click', () => {
            ElementRepository.removeElementById(id)
            document.getElementById(id).remove()
        })
    }

    #addCheckboxEvent(dom) {
        let checkbox = dom.querySelector("input[type=checkbox]")

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                console.log('tets')
                dom.classList.add('completed')
            } else {
                console.log("wesdf")
                dom.classList.remove('completed')
            }
        })
    }

    #toDom(id, element) {
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

    #clearInput() {
        document.getElementById("new-todo-title").value = ""
    }
}

let app = new App()
app.run()