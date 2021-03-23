export class CancelModifyElementCommand {

    #app

    constructor(app) {
        this.#app = app
    }

    execute() {
        this.#app.getEditingElement().classList.remove('editing')
        this.#app.getEditingElement().classList.add('view')
        this.#app.setEditingElementToUndefined()
    }

    isUsable(keyCode) {
        return this.#isRightCommand(keyCode)
    }

    #isRightCommand(keyCode) {
        return keyCode === "Escape" && this.#app.getEditingElement() !== undefined
    }

}