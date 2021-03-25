let id = 1;
const addInput = document.querySelector('#new-todo-title');
const toDoList = document.querySelector('#todo-list');

addInput.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.key === 'Enter') {
    addList();
  }
})

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

  input.addEventListener('change', function() {
    if (input.checked) {
      li.className = 'completed';
    } else {
      li.className = 'false';
    }
  });

  const label = document.createElement('label');
  label.className = 'label';
  label.textContent = addInput.value;

  const button = document.createElement('button');
  button.className = 'destroy';
  button.id = 'id';
  button.addEventListener('click', function() {
    const li = button.parentNode.parentNode;
    li.parentNode.removeChild(li);
  });

  div.appendChild(input);
  div.appendChild(label);
  div.appendChild(button);
  li.appendChild(div);

  id = id + 1;

  return li
}

function addList() {
  const ul = document.querySelector('#todo-list');
  const li = createLi();
  addInput.value = '';
  ul.appendChild(li);
}
