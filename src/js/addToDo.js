var user_to_do_input = document.getElementById('new-todo-title');
var to_do_list_view = document.getElementById('todo-list');

user_to_do_input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        appendNewListToView();
        clearInputWindow();
    }
})

function appendNewListToView() {
    var newToDoList = document.createElement('li');
    newToDoList.innerHTML = 
        `<div class="view">
            <input class="toggle" type="checkbox" />
            <label class="label">${user_to_do_input.value}</label>
            <button class="destroy"></button>
        </div>`;
    to_do_list_view.appendChild(newToDoList);
}

function clearInputWindow() {
    user_to_do_input.value = "";
}