export class Item {

    #dom
    #value
    #id

    constructor(value) {
        this.#value = value
        this.#id = Date.now()
        this.#dom = Item.#createDom(this.#id, this.#value)
    }

    static #createDom(id, value) {
        return document
            .createRange()
            .createContextualFragment(`
            <li>
                <div class="view">
                    <div id="${id}" class="view">
                        <input class="toggle" type="checkbox"/>
                        <label class="label">${value}</label>
                        <button class="destroy"></button>
                    </div>
                </div>
            </li>`.trim());
    }

    get value() {
        return this.#value
    }

    get id() {
        return this.#id
    }

    get dom() {
        return this.#dom
    }

}