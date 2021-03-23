import {ElementRepository} from "../ElementRepository.js";
import {HashValues} from "../HashValue/HashValues.js";
import {ActiveHashValue} from "../HashValue/ActiveHashValue.js";
import {CompletedHashValue} from "../HashValue/CompletedHashValue.js";

export class OutputView {

    static #hashValues = new HashValues(
        [
            new ActiveHashValue(),
            new CompletedHashValue()
        ]
    )

    static printCount() {
        document.querySelector("span[class=todo-count]").innerHTML =
            `총 <string>${ElementRepository.getCount()}</string> 개`
    }

    static printTodoList() {
        OutputView.clearInput()
        OutputView.drawElementByHash()
        OutputView.printCount()
    }

    static clearInput() {
        document.getElementById("new-todo-title").value = ""
    }

    static drawElementByHash(hashValue) {
        if (hashValue === undefined) {
            hashValue = window.location.hash
        }

        let elements = this.#hashValues.execute(hashValue);

        OutputView.draw(elements)
    }

    static draw(doms) {
        document.getElementById("todo-list").innerHTML = ""
        doms.forEach(dom => document.getElementById("todo-list").appendChild(dom))
    }

}
