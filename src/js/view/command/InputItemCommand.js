export class InputItemCommand {
    static #DOM = document.getElementById('new-todo-title')

    #TODO_CONTROLLER

    constructor(controller) {
     this.#TODO_CONTROLLER = controller
    }

    isUsable({keyCode}) {
        return keyCode === 13 &&
            [...document.activeElement.classList]
                .find(cls => cls === "edit") === undefined
    }

    execute() {
        if (!InputItemCommand.#isValueExist()) return

        const value = InputItemCommand.#DOM.value

        this.#TODO_CONTROLLER.addItem(value)
    }

    static #isValueExist() {
        return InputItemCommand.#DOM.value !== "";
    }

}