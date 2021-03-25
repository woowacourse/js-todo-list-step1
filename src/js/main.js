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
    if(target.className === 'toggle'){
        target.closest("li").classList.toggle("completed");
        target.closest("li").classList.toggle("false");

        target.toggleAttribute("checked")
    }
}

$todoUl.addEventListener("click", modifyList)