var user_to_do_input = document.getElementById('new-todo-title');
var to_do_list_view = document.getElementById('todo-list');

user_to_do_input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        appendNewListToView();
        clearInputWindow();
    }
})

to_do_list_view.addEventListener("click", function(e) {
    console.log(e.target);
    console.log(e.target.nodeName);
    if (e.target && e.target.nodeName == "INPUT") {
        if (e.target.checked) {
            e.target.parentNode.parentNode.setAttribute("class", "completed");
        } else {
            e.target.parentNode.parentNode.setAttribute("class", "");
        }
    }
    if (e.target && e.target.nodeName == "BUTTON") {
        e.target.parentNode.parentNode.remove();
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
