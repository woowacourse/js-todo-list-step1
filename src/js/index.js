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
        if (confirm("삭제 하시겠습니까?")) {
            e.target.parentNode.parentNode.remove();
        }
    }
    updateListNumber();
})

function updateListNumber() {
    number_of_list.innerHTML = to_do_list_view.getElementsByTagName("li").length;
}

// CHANGE 창
let show_all_list = document.getElementsByClassName("all selected")[0];
let show_active_list = document.getElementsByClassName("active")[0];
let show_completed_list = document.getElementsByClassName("completed")[0];

show_all_list.addEventListener('click', function(e) {
    const to_do_list = to_do_list_view.getElementsByTagName("li");
    for (let i = 0; i < to_do_list.length; i++) {
        to_do_list[i].style.display = "block";
    }
})

show_active_list.addEventListener('click', function(e) {
    const to_do_list = to_do_list_view.getElementsByTagName("li");
    for (let i = 0; i < to_do_list.length; i++) {
        if (to_do_list[i].getAttribute("class") !== null) {
            to_do_list[i].style.display = "none";
        } else {
            to_do_list[i].style.display = "block";
        }
    }
})

show_completed_list.addEventListener('click', function(e) {
    const to_do_list = to_do_list_view.getElementsByTagName("li");
    for (let i = 0; i < to_do_list.length; i++) {
        if (to_do_list[i].getAttribute("class") === null) {
            to_do_list[i].style.display = "none";
        } else {
            to_do_list[i].style.display = "block";
        }
    }
})