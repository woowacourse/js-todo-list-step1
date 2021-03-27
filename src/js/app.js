import {InputItemCommand} from "./view/command/InputItemCommand.js";
import {TodoController} from "./controller/TodoController.js";
import {EditCommand} from "./view/command/EditCommand.js";
import {EditCancelCommand} from "./view/command/EditCancleCommand.js";

class App {
    #controller = new TodoController()
    #commands = [
        new InputItemCommand(this.#controller),
        new EditCommand(this.#controller),
        new EditCancelCommand(this.#controller)
    ]

    run() {
        this.#addKeyBoardEvent()
    }

    #addKeyBoardEvent() {
        document.addEventListener('keyup', e => {
            let cmd = this.#commands.find(cmd => cmd.isUsable(e))
            if (cmd !== undefined) {
                cmd.execute()
            }
        })
    }

}

const app = new App()
app.run()
