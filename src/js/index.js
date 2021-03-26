const $ul = document.getElementById('todo-list');
const $input = document.getElementById('new-todo-title');
const $allSelect = document.querySelector('.all');
const $activeSelect = document.querySelector('.active');
const $completedSelect = document.querySelector('li > .completed');

$input.addEventListener('keyup', addTodoList);
$allSelect.addEventListener('click', showAllList);
$activeSelect.addEventListener('click', showTodoList);
$completedSelect.addEventListener('click', showDoneList);
document.addEventListener('click', checkTodoItem);
document.addEventListener('click', removeTodoItem);
document.addEventListener('dblclick', showInputTodoItemToEdit);
document.addEventListener('keyup', editTodoItem);

function addTodoList(event) {
    if (event.keyCode === 13 && $input.value !== '') {
        $ul.innerHTML += returnTodoItem($input.value);
        $input.value = '';
        setCount($ul.childNodes.length);
    }
}

function returnTodoItem(value) {
    return `<li class="false">
        <div class="view">
            <input class="toggle" type="checkbox"/>
            <label class="label">${value}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${value}"/>
    </li>`;
}

function setCount(value) {
    const span = document.querySelector('.todo-count');
    span.innerHTML = `<strong>총 ${value} 개</strong>`;
}

function checkTodoItem(event) {
    if (event.target.className === 'toggle' && event.target.checked) {
        event.target.closest('li').className = 'completed';
        event.target.toggleAttribute('checked');
    }
    if (event.target.className === 'toggle' && !event.target.checked) {
        event.target.closest('li').className = 'false';
        event.target.removeAttribute('checked');
    }
}

function removeTodoItem(event) {
    if (event.target.className === 'destroy') {
        const ul = event.target.closest('ul');
        const li = event.target.closest('li');
        event.target.closest('ul').removeChild(event.target.closest('li'));
        setCount(countList(ul, li));
    }
}

function countList(ul, li) {
    let count = 0;
    for (let item of ul.children) {
        if (li.className === item.className) {
            count++;
        }
    }
    return count;
}

function showInputTodoItemToEdit(event) {
    if (event.target.className === 'label') {
        event.target.closest('li').classList.add('editing');
    }
}

function editTodoItem(event) {
    if (event.keyCode === 27 && event.target.className === 'edit') {
        event.target.value = event.target.getAttribute('value');
        event.target.closest('li').classList.remove('editing');
    }
    if (event.keyCode === 13 && event.target.className === 'edit') {
        const div = event.target.previousSibling.previousSibling;
        div.childNodes[3].textContent = event.target.value;
        event.target.setAttribute('value', event.target.value);
        event.target.closest('li').classList.remove('editing');
    }
}

function showTodoList() {
    const $allList = $ul.children;
    let count = 0;
    for (let item of $allList) {
        if (item.className === 'completed') {
            item.style.display = 'none';
        }
        if (item.className === 'false') {
            item.style.display = 'block';
            count++;
        }
    }
    setCount(count);
    this.classList.add('selected');
    $allSelect.classList.remove('selected');
    $completedSelect.classList.remove('selected');
}

function showDoneList() {
    const $allList = $ul.children;
    let count = 0;
    for (let item of $allList) {
        if (item.className === 'completed') {
            item.style.display = 'block';
            count++;
        }
        if (item.className === 'false') {
            item.style.display = 'none';
        }
    }
    setCount(count);
    this.classList.add('selected');
    $allSelect.classList.remove('selected');
    $activeSelect.classList.remove('selected');
}

function showAllList() {
    const $allList = $ul.children;
    for (let item of $allList) {
        item.style.display = 'block';
    }
    setCount($allList.length);
    this.classList.add('selected');
    $activeSelect.classList.remove('selected');
    $completedSelect.classList.remove('selected');
}

