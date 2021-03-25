let user_to_do_input = document.getElementById('new-todo-title');
let to_do_list_view = document.getElementById('todo-list');
let number_of_list = document.getElementsByTagName('strong')[0];

user_to_do_input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        appendNewListToView();
        clearInputWindow();
    }
})

function appendNewListToView() {
    let newToDoList = document.createElement('li');
    newToDoList.innerHTML = 
        `<div class="view">
            <input class="toggle" type="checkbox" />
            <label class="label">${user_to_do_input.value}</label>
            <button class="destroy"></button>
        </div>`;
    to_do_list_view.appendChild(newToDoList);
    updateListNumber();
}

function clearInputWindow() {
    user_to_do_input.value = "";
}

to_do_list_view.addEventListener("click", function(e) {
    if (e.target && e.target.nodeName == "INPUT") {
        if (e.target.checked) {
            e.target.parentNode.parentNode.setAttribute("class", "completed");
        } else {
            e.target.parentNode.parentNode.removeAttribute("class");
        }
    }
    if (e.target && e.target.nodeName == "BUTTON") {
        e.target.parentNode.parentNode.remove();
    }
    updateListNumber();
})

function updateListNumber() {
    number_of_list.innerHTML = to_do_list_view.getElementsByTagName("li").length;
}

