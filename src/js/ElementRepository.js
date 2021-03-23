export class ElementRepository {

    static #elements = []
    static #id = 0

    static addElement(element) {
        ElementRepository.#elements.push({
            id : ElementRepository.#id,
            value : element
        })

        ElementRepository.#id++;
    }

    static removeElementById(id) {
        ElementRepository.#elements = ElementRepository.#elements
            .filter(element => element.id !== Number(id))
    }

    static getAllElements() {
        return ElementRepository.#elements
    }

    static changeText(id, text) {
        let element = ElementRepository.#elements.filter(element => element.id === Number(id))
        element[0].value.changeText(text)
    }

    static getCount() {
        return ElementRepository.#elements.length
    }

    static setDone(id) {
        let element = ElementRepository.#elements.filter(element => element.id === Number(id))
        element[0].value.setDone()
    }

    static setUnDone(id) {
        let element = ElementRepository.#elements.filter(element => element.id === Number(id))
        element[0].value.setUnDone()
    }
}