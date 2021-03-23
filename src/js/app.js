import {CancelModifyElementCommand} from "./Command/CancelModifyElementCommand.js";
import {CreateNewElementCommand} from "./Command/CreateNewElementCommand.js";
import {ModifyElementCommand} from "./Command/ModifyElementCommand.js";
import {OutputView} from "./view/OutputView.js";

class App {

    #editingElement
    #commands

    constructor() {
        this.#commands = [
            new CancelModifyElementCommand(this),
            new CreateNewElementCommand(this),
            new ModifyElementCommand(this)
        ]
    }

    run() {
        this.#addCommandListener()
        this.#addCheckBoxListener()
        this.#addFilterListener()
    }

    #addFilterListener() {
        let filters = document.querySelector("ul[class=filters]").querySelectorAll("a")

        filters.forEach(filter =>
            this.#setFilterListener(filter, filters)
        )
    }

    #setFilterListener(filter, filters) {
        filter.addEventListener('click',
            () => {
                this.#setFiltersToUnSelected(filters);
                this.#setSelectedFilterToSelected(filter);
                OutputView.drawElementByHash(filter.getAttribute("href"))
            }
        );
    }

    #setSelectedFilterToSelected(filter) {
        filter.classList.add("selected")
    }

    #setFiltersToUnSelected(filters) {
        filters.forEach(f => f.classList.remove("selected"))
    }

    #addCheckBoxListener() {
        let checkboxes = document.querySelectorAll("input[type=checkbox]")

        checkboxes.forEach(checkbox =>
            this.#setCheckboxListener(checkbox)
        )
    }

    #setCheckboxListener(checkbox) {
        checkbox.addEventListener('change',
            () => {
                checkbox.classList.toggle('#complete')
            }
        );
    }

    #addCommandListener() {
        window.addEventListener("keydown", e => {
            let command = this.#commands.find(
                command => command.isUsable(e.code)
            );

            if(command === undefined) {
                return
            }

            command.execute()

            if(e.code === "Enter") {
                OutputView.printTodoList()
            }

        })
    }

    getEditingElement() {
        return this.#editingElement
    }

    setEditingElementToUndefined() {
        this.#editingElement = undefined
    }

    setEditingElement(dom) {
        this.#editingElement = dom
    }

}

let app = new App()
app.run()