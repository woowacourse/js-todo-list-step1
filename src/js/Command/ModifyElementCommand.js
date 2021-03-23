import {ElementRepository} from "../ElementRepository.js";

export class ModifyElementCommand {

    #app

    constructor(app) {
        this.#app = app
    }

    execute() {
        let id = this.#app.getEditingElement().getAttribute("id")
        let text = this.#app.getEditingElement().querySelector("input[class=edit]").value
        ElementRepository.changeText(id, text)

        this.#app.getEditingElement().classList.remove('editing')
        this.#app.getEditingElement().classList.add('view')
    }

    isUsable(keyCode) {
        return this.#isRightCommand(keyCode)
    }

    #isRightCommand(keyCode) {
        return keyCode === "Enter" && this.#app.getEditingElement() !== undefined;
    }

}