import {ElementRepository} from "../ElementRepository.js";
import {HashValue} from "./HashValue.js";

export class ActiveHashValue extends HashValue {

    static #COMMAND = "#active"

    getElementDoms() {
        return super.addEvents(this.#getElementDomsFromRepository())
    }

    isUsable(hashValue) {
        return hashValue === ActiveHashValue.#COMMAND;
    }

    #getElementDomsFromRepository() {
        let elements = ElementRepository.getAllElements()
            .filter(element => !element.value.isDone())

        return elements.map(element => super.toDom(element.id, element.value))
    }

}
