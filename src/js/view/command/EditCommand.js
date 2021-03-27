export class EditCommand {

    #TODO_CONTROLLER

    constructor(controller) {
        this.#TODO_CONTROLLER = controller
    }

    isUsable({keyCode}) {
        return keyCode === 13 &&
            [...document.activeElement.classList]
                .find(cls => cls === "edit") !== undefined
    }

    execute() {
        const dom = document.activeElement
        if (!this.#isValueExist(dom)) return

        const id = dom.closest('Li').id
        const value = dom.value

        this.#TODO_CONTROLLER.editItem(id, value)
    }

    #isValueExist(dom) {
        return dom.value !== ''
    }

}