document.getElementById("new-todo-title").addEventListener("keydown", enterkey);

function enterkey(event) {
    if (event.keyCode ==  13) {
        let input = document.getElementById("new-todo-title");

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

        const button = document.createElement('button');
        button.setAttribute('class', 'destroy');
        button.addEventListener('click', clickdelete);

        div.appendChild(toggle);
        div.appendChild(label);
        div.appendChild(button);
        li.appendChild(div);

        const ul = document.getElementById('todo-list');
        ul.appendChild(li);

        input.value = '';
        countItems();
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
    let sum = document.getElementsByClassName('todo-count')[0];
    sum.innerHTML = '총 <st rong>' + todoList.length + '</strong> 개';
}