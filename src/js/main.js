const $todoInput = document.querySelector(".new-todo");
const $todoUl = document.querySelector(".todo-list");
console.log($todoInput);

function getTodoInput({key}) {
    if (key === "Enter") {
        const todoValue = $todoInput.value;
        const list = `
            <li>
                <div class="view">
                    <input class="toggle" type="checkbox"/>
                    <label class="label">${todoValue}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="새로운 타이틀" />
            </li>`;
        $todoUl.insertAdjacentHTML('beforeend', list);
        $todoInput.value = '';
    }
}

$todoInput.addEventListener("keyup", getTodoInput);