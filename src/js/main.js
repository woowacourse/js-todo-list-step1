const $todoInput = document.querySelector(".new-todo");
const $todoUl = document.querySelector(".todo-list");
const date = new Date();

function addTodoInput({key}) {
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

$todoInput.addEventListener("keyup", addTodoInput);

function modifyTodoState({target}) {
    if (target.className === 'toggle') {
        target.closest("li").classList.toggle("completed");
        target.closest("li").classList.toggle("false");

        target.toggleAttribute("checked")
    }

    if (target.className === 'destroy') {
        $todoUl.removeChild(target.closest("li"))
    }
}

$todoUl.addEventListener("click", modifyTodoState)

function editContent(event) {
    const {key} = event
    const {currentTarget} = event
    const previousInput = currentTarget.querySelector(".label");
    if (key === "Enter") {
        previousInput.innerText =  event.target.value;
        currentTarget.classList.toggle("editing")
    }
    if (key === "Escape") {
        currentTarget.classList.toggle("editing")
    }

}

function editingMode({target}) {
    const $li = target.closest("li");
    $li.classList.toggle("editing");
    $li.addEventListener("keyup", editContent);
}

$todoUl.addEventListener("dblclick", editingMode)