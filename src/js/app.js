import {ElementRepository} from './ElementRepository.js'
import {Element} from './Element.js'

class App {

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
            if (e.code === "Enter") {
                this.#addElement()
                this.#drawElementByHash()
               // this.#addCheckboxListener()
                this.#clearInput()
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
        document.getElementById("todo-list").innerHTML=""
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
        let doms = elements.map(element => this.#toDom(element.index, element.value))
        doms.forEach(
            dom => {
                let checkbox = dom.querySelector("input[type=checkbox]")

                checkbox.addEventListener('change', () => {
                    if(checkbox.checked) {
                        console.log('tets')
                        dom.classList.add('completed')
                    } else {
                        console.log("wesdf")
                        dom.classList.remove('completed')
                    }
                })
            }
        )

        return doms
    }

    #toDom(index, element) {
        let html = `
        <li id="${index}" class="${element.getState()}">
            <div class="view">
                <input class="toggle" type="checkbox"/>
                <label class="label">${element.getText()}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${element.getText()}" />
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