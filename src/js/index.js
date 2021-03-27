const todoList = new Todolist();
let currentState = 'all';

const $todoList = document.querySelector('.todo-list');
const $input = document.querySelector('.new-todo');
const $count = document.querySelector('.todo-count');
const $filters = document.querySelector('.filters');

document.addEventListener('DOMContentLoaded', eventHandler);

function eventHandler() {
  $todoList.addEventListener('click', onClickEvent);
  $todoList.addEventListener('keyup', onKeyUpEvent);
  $todoList.addEventListener('dblclick', dblClickEvent);
  $input.addEventListener('keyup', onKeyUpEvent);
  $filters.addEventListener('click', filterEvent);
}

function filterEvent({target}) {
  currentState = target.className;
  updateTodoList();
}

function dblClickEvent(event) {
  const todoElement = event.target.closest(".todo-element");
  todoElement.classList.add('editing');
}

function onClickEvent({target}) {
  if(target.classList.contains('toggle')) {
    todoList.changeChecked(target.id);
    updateTodoList();
  }

  if(target.classList.contains('destroy')) {
    todoList.removeItem(target.id);
    updateTodoList();
  }
}

function onKeyUpEvent({ key, target }) {
  switch (key) {
    case 'Enter':
      if(target.className === 'new-todo' && target.value.length > 0) {
        todoList.addItem(target.value);
        target.value = '';
      }
      if(target.className === 'edit') {
        todoList.editItem(target.id, target.value);
      }
      break;
    case 'Escape' :
      target.closest(".todo-element").classList.remove('editing');
      break;
    default:
      return;
  }
  updateTodoList();
}

function updateTodoListElement() {
  $todoList.innerHTML = todoList.values(currentState).reduce((prev, curr) => {
    const {id, checked, text} = curr;
    return prev + createListHTMLForm(id, checked, text);
  }, '').toString();
}

function createListHTMLForm(id, checked, text) {
  return `
    <li id="${id}" class="todo-element ${checked ? 'completed' : ''}">
      <div class="view">
        <input id="${id}" class="toggle" type="checkbox" ${checked ? 'checked' : ''}/>
        <label id="${id}" class="label">  ${text}  </label>
        <button id="${id}" class="destroy"></button>
      </div>
      <input id="${id}" class="edit" value= ${text} />
    </li>
  `;
}

function updateTodoCount() {
  $count.firstElementChild.textContent = todoList.values(currentState).length.toString();
}

function updateTodoList() {
  updateTodoListElement();
  updateTodoCount();
}

