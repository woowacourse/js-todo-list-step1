const $todoInput = document.querySelector(".new-todo");
const $todoUl = document.querySelector(".todo-list");
const date = new Date();

function getTodoInput({key}) {
    if (key === "Enter" && $todoInput.value !== "") {
        const id = date.getTime();
        const value = $todoInput.value;
        const list = `
            <li id="${id}" class="false">
                <div class="view">
                    <input class="toggle" type="checkbox" id="${id}"/>
                    <label class="label">${value}</label>
                    <button class="destroy" id="${id}"></button>
                </div>
                <input class="edit" value="${value}" />
            </li>`;
        $todoUl.insertAdjacentHTML('beforeend', list);
        $todoInput.value = '';
    }
}

$todoInput.addEventListener("keyup", getTodoInput);

function modifyList({target}) {
    if (target.className === 'toggle') {
        target.closest("li").classList.toggle("completed");
        target.closest("li").classList.toggle("false");

        target.toggleAttribute("checked")
    }

    if (target.className === 'destroy') {
        $todoUl.removeChild(target.closest("li"))
    }
}

$todoUl.addEventListener("click", modifyList)

function editLogic(event) {
    const {key} = event
    const previousInput = event.currentTarget.querySelector(".label");
    if (key === "Enter") {
        const currentValue = event.target.value;
        previousInput.innerText = currentValue;
        event.currentTarget.classList.toggle("editing")
    }
    if (key === "Escape") {
        event.currentTarget.classList.toggle("editing")
    }

}

function editList(event) {
    const {target} = event
    const $li = target.closest("li");
    $li.classList.toggle("editing");
    $li.addEventListener("keyup", editLogic);
}

$todoUl.addEventListener("dblclick", editList)