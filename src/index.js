document.getElementById("new-todo-title").addEventListener("keydown", enterkey);
document.getElementsByClassName("all")[0].addEventListener("click", allListClick);
document.getElementsByClassName("active")[0].addEventListener("click", todoListClick);
document.getElementsByClassName("completed")[0].addEventListener("click", completeClick);

function enterkey(event) {
    if (event.keyCode ==  13) {
        let input = document.getElementById("new-todo-title");
        if (input.value == '') {
            console.log('빈칸 금지!');
            return;
        }   

        const li = document.createElement("li");

        const div = document.createElement('div');
        div.setAttribute('class', 'view');

        const toggle = document.createElement("input");
        toggle.setAttribute('class', 'toggle');
        toggle.setAttribute('type', 'checkbox');
        toggle.addEventListener('click', clicktoggle);

        const label = document.createElement('label');
        label.setAttribute('class', 'label');
        label.innerHTML = input.value;
        label.addEventListener('click', clicklabel);

        const button = document.createElement('button');
        button.setAttribute('class', 'destroy');
        button.addEventListener('click', clickdelete);

        div.appendChild(toggle);
        div.appendChild(label);
        div.appendChild(button);
        li.appendChild(div);

        let editinput = document.createElement('input');
        editinput.setAttribute('class', 'edit');
        editinput.setAttribute('value', '새로운 타이틀');
        li.appendChild(editinput);

        const ul = document.getElementById('todo-list');
        ul.appendChild(li);

        input.value = '';
        countItems();
         // 해야할 일 혹은 전체보기에서만 활성화 되어야함.
    }
}

function clicktoggle(event) {
    let item = event.target.parentElement.parentElement;
    if (event.target.checked) {
        item.className = 'completed';
        item.setAttribute('checked', 'checked');
        return;
    }
    item.removeAttribute('checked');
    item.removeAttribute('class');
}

function clickdelete(event) {
    let item = event.target.parentElement.parentElement;
    let ul = item.parentElement;
    ul.removeChild(item);
    countItems();
}

function countItems() {
    let items = document.getElementById('todo-list');
    let todoList = items.getElementsByTagName('li');
    changeSum(todoList.length);
}

function changeSum(value) {
    let sum = document.getElementsByClassName('todo-count')[0];
    sum.innerHTML = '총 <strong>' + value + '</strong> 개';
}

function todoListClick(event) {
    let items = document.getElementById('todo-list');
    let itemNodes = items.childNodes;
    let count = itemNodes.length;
    for (let i = 0; i < itemNodes.length; i++) {
        if (itemNodes[i].className == 'completed') {
            itemNodes[i].style.display = 'none';
            count -= 1;
        } else {
            itemNodes[i].style.display = 'block';
        }
    }
    changeSum(count);
    document.querySelector(".selected").classList.remove("selected");
    document.querySelector(".active").classList.add("selected");
}

function allListClick(event) {
    let items = document.getElementById('todo-list');
    let itemNodes = items.childNodes;
    for (let i = 0; i < itemNodes.length; i++) {
        itemNodes[i].style.display = 'block';
    }
    changeSum(itemNodes.length);
    document.querySelector(".selected").classList.remove("selected");
    document.querySelector(".all").classList.add("selected");
}

function completeClick(event) {
    let items = document.getElementById('todo-list');
    let itemNodes = items.childNodes;
    let count = itemNodes.length;
    for (let i = 0; i < itemNodes.length; i++) {
        if (itemNodes[i].className != 'completed') {
            itemNodes[i].style.display = 'none';
            count -= 1;
        } else {
            itemNodes[i].style.display = 'block';
        }
    }
    changeSum(count);
    document.querySelector(".selected").classList.remove("selected");
    document.querySelector("a.completed").classList.add("selected");
}

function clicklabel(event) {
    let li = event.target.parentElement.parentElement;
    li.setAttribute('class', 'editing')
}