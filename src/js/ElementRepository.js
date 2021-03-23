export class ElementRepository {

    static #elements = []
    static #index = 0

    static addElement(element) {
        ElementRepository.#elements.push({
            index : ElementRepository.#index,
            value : element
        })

        ElementRepository.#index++;
    }

    static removeElementByIndex(index) {
        ElementRepository.#elements = ElementRepository.#elements
            .filter(element => element.index !== Number(index))
    }

    static getAllElements() {
        return ElementRepository.#elements
    }

}