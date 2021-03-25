let id = 1;
const addInput = document.querySelector('#new-todo-title');
const toDoList = document.querySelector('#todo-list');

addInput.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (!event.isComposing && event.key === 'Enter') {
    addList();
  }
});

toDoList.addEventListener("change", function (e) {
  if (e.target && e.target.className == "toggle") {
    checkBox(e.target);
  }
});

toDoList.addEventListener('click', function(e) {
  if (e.target && e.target.className == "destroy") {
    remove(e.target);
  }
});

function checkBox(target) {
  if (target.checked) {
   target.parentNode.parentNode.className = 'completed';
  } else {
   target.parentNode.parentNode.className = 'false';
  }
}

function remove(target) {
  const li = target.parentNode.parentNode;
  li.parentNode.removeChild(li);
}

function addList() {
  if (addInput.value === '') {
    alert("입력값이 필요합니다.")
  } else {
    const ul = document.querySelector('#todo-list');
    const li = createLi();
    addInput.value = '';
    ul.appendChild(li);
  }
}

// create list
function createLi() {
  const li = document.createElement('li');
  li.id = id;
  li.className = 'false';

  const div = document.createElement('div');
  div.className = 'view';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.id = id;
  input.className = 'toggle';

  const label = document.createElement('label');
  label.className = 'label';
  label.textContent = addInput.value;

  const button = document.createElement('button');
  button.className = 'destroy';
  button.id = 'id';

  div.appendChild(input);
  div.appendChild(label);
  div.appendChild(button);
  li.appendChild(div);

  id = id + 1;

  return li
}
