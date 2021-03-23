import {ElementRepository} from "../ElementRepository.js";
import {HashValue} from "./HashValue.js";

export class DefaultHashValue extends HashValue {

    getElementDoms() {
        return super.addEvents(this.#getElementDomsFromRepository())
    }

    #getElementDomsFromRepository() {
        let elements = ElementRepository.getAllElements()

        return elements.map(element => super.toDom(element.id, element.value))
    }

}
