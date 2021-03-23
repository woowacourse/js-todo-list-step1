import {Element} from "../Element.js";
import {ElementRepository} from "../ElementRepository.js";
import {InputView} from "../view/InputView.js";

export class CreateNewElementCommand {

    #app

    constructor(app) {
        this.#app = app
    }

    execute() {
        let input = InputView.getTextFromInput()

        let newElement = new Element(input)
        ElementRepository.addElement(newElement)
    }

    isUsable(keyCode) {
        let input = InputView.getTextFromInput()

        return this.#isRightCommand(keyCode) && this.#isInputExist(input)
    }

    #isRightCommand(keyCode) {
        return keyCode === "Enter" && this.#app.getEditingElement() === undefined
    }

    #isInputExist(input) {
        if (!this.#isBlank(input)) {
            return false;
        }

        return true
    }

    #isBlank(input) {
        if (input === "" || input === undefined) return false
        return true
    }

}