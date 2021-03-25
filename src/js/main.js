const $todoInput = document.querySelector(".new-todo");
const $todoUl = document.querySelector(".todo-list");
const date = new Date();

function getTodoInput({key}) {
    if (key === "Enter" && $todoInput.value !== "") {
        const list = `
            <li id="${date.getTime()}" class="false">
                <div class="view">
                    <input class="toggle" type="checkbox"/>
                    <label class="label">${$todoInput.value}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="새로운 타이틀" />
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
    }
}

$todoUl.addEventListener("click", modifyList)