export class EditCancelCommand {

    #TODO_CONTROLLER

    constructor(controller) {
        this.#TODO_CONTROLLER = controller
    }

    isUsable({keyCode}) {
        return keyCode === 27 &&
            [...document.activeElement.classList]
                .find(cls => cls === "edit") !== undefined
    }

    execute() {
        const dom = document.activeElement

        const id = dom.closest('Li').id

        this.#TODO_CONTROLLER.cancelEditing(id)
    }

}