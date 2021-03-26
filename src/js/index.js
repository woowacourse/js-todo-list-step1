let user_to_do_input = document.getElementById('new-todo-title');
let to_do_list_view = document.getElementById('todo-list');
let number_of_list = document.getElementsByTagName('strong')[0];

user_to_do_input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && user_to_do_input.value !== "") {
        appendNewListToView();
        clearInputWindow();
        updateListNumber();
    }
})

function appendNewListToView() {
    let newToDoList = document.createElement('li');
    newToDoList.addEventListener('dblclick', editMode);
    newToDoList.innerHTML = 
        `<div class="view">
            <input class="toggle" type="checkbox" />
            <label class="label">${user_to_do_input.value}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${user_to_do_input.value}"/>`;
    to_do_list_view.appendChild(newToDoList);
}

function clearInputWindow() {
    user_to_do_input.value = "";
}

to_do_list_view.addEventListener("click", function(e) {
    if (e.target && e.target.nodeName == "INPUT") {
        if (e.target.checked) {
            e.target.parentNode.parentNode.setAttribute("class", "completed");
        } else {
            e.target.parentNode.parentNode.setAttribute("class", "todo-list");
        }
    }
    if (e.target && e.target.nodeName == "BUTTON") {
        if (confirm("삭제 하시겠습니까?")) {
            e.target.parentNode.parentNode.remove();
            updateListNumber();
        }
    }
})

function editMode(e) {
    let selectedList = e.target.parentElement.parentElement;
    selectedList.className = 'editing';
    selectedList.addEventListener('keydown', finishEditMode);
    selectedList.removeEventListener('dblclick', editMode);
}

function finishEditMode(e) {
    if (e.key === "Escape") {
        let selectedList = e.target.parentElement;
        selectedList.removeAttribute('class');
        selectedList.addEventListener('dblclick', editMode);
        return
    }

    if (e.key === "Enter") {
        let selectedList = e.target.parentElement;
        const title = selectedList.firstElementChild.getElementsByClassName('label')[0];
        const editTitle = selectedList.getElementsByClassName('edit')[0];
        title.innerHTML = editTitle.value;
        selectedList.removeAttribute('class');
        selectedList.addEventListener('dblclick', editMode);
    }
}

function updateListNumber() {
    number_of_list.innerHTML = to_do_list_view.getElementsByTagName("li").length;
}

// CHANGE 창
let show_all_list = document.getElementsByClassName("all")[0];
let show_active_list = document.getElementsByClassName("active")[0];
let show_completed_list = document.getElementsByClassName("completed")[0];

show_all_list.addEventListener('click', function(e) {
    show_all_list.setAttribute("class", "all selected");
    show_active_list.setAttribute("class", "active");
    show_completed_list.setAttribute("class", "completed");
    const to_do_list = to_do_list_view.getElementsByTagName("li");
    let showingListNum = 0;
    for (let i = 0; i < to_do_list.length; i++) {
        to_do_list[i].style.display = "block";
        showingListNum++;
    }
    number_of_list.innerHTML = showingListNum;
})

show_active_list.addEventListener('click', function(e) {
    show_all_list.setAttribute("class", "all");
    show_active_list.setAttribute("class", "active selected");
    show_completed_list.setAttribute("class", "completed");
    const to_do_list = to_do_list_view.getElementsByTagName("li");
    let showingListNum = 0;
    for (let i = 0; i < to_do_list.length; i++) {
        if (to_do_list[i].getAttribute("class") !== null) {
            to_do_list[i].style.display = "none";
        } else {
            to_do_list[i].style.display = "block";
            showingListNum++;
        }
    }
    number_of_list.innerHTML = showingListNum;
})

show_completed_list.addEventListener('click', function(e) {
    show_all_list.setAttribute("class", "all");
    show_active_list.setAttribute("class", "active");
    show_completed_list.setAttribute("class", "completed selected");
    const to_do_list = to_do_list_view.getElementsByTagName("li");
    let showingListNum = 0;
    for (let i = 0; i < to_do_list.length; i++) {
        if (to_do_list[i].getAttribute("class") === null) {
            to_do_list[i].style.display = "none";
        } else {
            to_do_list[i].style.display = "block";
            showingListNum++;
        }
    }
    number_of_list.innerHTML = showingListNum;
})