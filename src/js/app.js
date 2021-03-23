import {ElementRepository} from './ElementRepository.js'
import {Element} from './Element.js'

class App {

    run() {
        console.log("hello")
        this.#addListenerWithElementHandler()
    }

    #addListenerWithElementHandler() {
        window.addEventListener("keydown", e => {
            if (e.code === "Enter") {
                this.#addElement()
                this.#drawElementByHash()
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
            console.log("tets")
            this.#draw(this.#getViewElementsByHtml())
            return
        }

        if (hash === "#completed") {
            console.log("tets2")
            this.#draw(this.#getCompleteElementsByHtml())
            return
        }
        console.log("tetsd")
        this.#draw(this.#getAllElementsByHtml())
    }

    #draw(html) {
        document.getElementById("todo-list").innerHTML = html
    }

    #getCompleteElementsByHtml() {
        return ElementRepository.getAllElements()
            .filter(element => element.value.isDone())
            .map(element => this.#toHtml(element.index, element.value))
            .join("")
    }

    #getViewElementsByHtml() {
        return ElementRepository.getAllElements()
            .filter(element => !element.value.isDone())
            .map(element => this.#toHtml(element.index, element.value))
            .join("")
    }

    #getAllElementsByHtml() {
        return ElementRepository.getAllElements()
            .map(element => this.#toHtml(element.index, element.value))
            .join("")
    }

    #toHtml(index, element) {
        return `
        <li id="${index}">
            <div class="${element.getState()}">
                <input class="toggle" type="checkbox"/>
                <label class="label">${element.getText()}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${element.getText()}" />
        </li>`
    }

    #clearInput() {
        document.getElementById("new-todo-title").value=""
    }
}

let app = new App()
app.run()