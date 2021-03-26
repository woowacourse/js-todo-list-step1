export default function itemTemplate(id, title) {
    return ` <li id="${id}" class="todo-item">
                  <div class="view">
                      <input class="toggle" type="checkbox">
                      <label class="label">${title}</label>
                      <button class="destroy"></button>
                  </div>
                  <input class="edit" value="${title}">
              </li>`
}

