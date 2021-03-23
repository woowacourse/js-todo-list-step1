export class ElementAssembler {

    static assembleElement(element) {
        return this.#generateDomByElement()
    }

    static #generateDomByElement(element) {
        let elementHtml = `
        <li id="${id}" class="${element.getState()}">
            <div class="view">
                <input class="toggle" type="checkbox"/>
                <label class="label">${element.getText()}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit"/ value="${element.getText()}">
        </li>
        `

        let dom = new DOMParser().parseFromString(elementHtml, "text/html")
        return dom.getRootNode().body.querySelector("li")
    }
    
}