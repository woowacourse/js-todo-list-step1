function enter(element) {
  if (event.keyCode === 13) {
    if (element.value === '') {
      return;
    }

    const button_destroy = document.createElement('button');
    button_destroy.setAttribute('class', 'destroy');

    const label = document.createElement('label');
    label.setAttribute('class', 'label');
    label.innerText = element.value;

    const input_toggle = document.createElement('input');
    input_toggle.setAttribute('class', 'toggle');
    input_toggle.setAttribute('type', 'checkbox');

    const input_edit = document.createElement('input');
    input_edit.setAttribute('class', 'edit');
    input_edit.setAttribute('value', element.value);

    const div_view = document.createElement('div');
    div_view.appendChild(input_toggle);
    div_view.appendChild(label);
    div_view.appendChild(button_destroy);

    const li = document.createElement('li');
    li.appendChild(div_view);
    li.appendChild(input_edit);

    document.getElementById('todo-list').appendChild(li);

    document.getElementById('new-todo-title').value = null;
  }
}

function checked(element) {

}