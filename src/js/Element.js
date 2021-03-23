export class Element {
    #text
    #done

    constructor(text) {
        this.#text = text
        this.#done = false
    }

    isDone() {
        return this.#done
    }

    setDone() {
        this.#done = true
    }

    setUnDone() {
        this.#done = false
    }

    getText() {
        return this.#text
    }

    getState() {
        if(this.isDone()) {
            return "#complete"
        }

        return "#active"
    }

}