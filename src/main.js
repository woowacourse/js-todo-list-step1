const $todoInput = document.querySelector("#new-todo-title");
$todoInput.addEventListener("keyup", onAddTodoItem);

function onAddTodoItem(event) {
  const todoTitle = event.target.value;
  const todoList = document.getElementById("todo-list");
  if (event.key === "Enter" && todoTitle !== "") {
    todoList.insertAdjacentHTML("beforeend", renderTodoItemTemplate(todoTitle));
    event.target.value = "";
  }
}

function renderTodoItemTemplate(title) {
  return ` <li>
                  <div class="view">
                      <input class="toggle" onclick="onToggleTodoItem(event)" type="checkbox" />
                      <label class="label" ondblclick="edit(event)">${title}</label>
                      <button class="destroy" onclick="deleteCheck(event)"></button>
                  </div>
                  <input class="edit" value=${title} />
              </li>`;
}

function onToggleTodoItem(event) {
  const item = event.target;

  if (item.classList[0] === "toggle") {
    item.parentElement.parentElement.classList.toggle("completed")
  }
}

function deleteCheck(event) {
  const item = event.target;

  if (item.classList[0] === "destroy") {
    item.parentElement.parentElement.remove();
  }
}

function edit(event) {
  const item = event.target;

  if (item.classList[0] === "label") {
    item.parentElement.parentElement.classList.add("editing");

    const input = document.querySelector(".edit")
    input.addEventListener('keyup', function(e) {
      if (e.key == 'Esc' || e.key == 'Escape') {
        item.parentElement.parentElement.classList.remove("editing");
      }

      if (e.key == 'Enter') {
        item.innerText = input.value;
        item.parentElement.parentElement.classList.remove("editing");
      }
    })
  }
}
