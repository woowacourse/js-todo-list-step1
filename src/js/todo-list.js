function enter(input_new_todo_list) {
  if (event.keyCode === 13) {
    if (input_new_todo_list.value === '') {
      return;
    }

    const li = document.createElement('li');

    const button_destroy = document.createElement('button');
    button_destroy.setAttribute('class', 'destroy');
    button_destroy.onclick = function remove() {
      li.parentNode.removeChild(li);
      countTodoListsOfSelectedStatus();
    }

    const label = document.createElement('label');
    label.setAttribute('class', 'label');
    label.innerText = input_new_todo_list.value;

    const input_toggle = document.createElement('input');
    input_toggle.setAttribute('class', 'toggle');
    input_toggle.setAttribute('type', 'checkbox');
    input_toggle.onclick = function checked() {
      if (input_toggle.checked) {
        li.setAttribute('class', 'completed');
        return;
      }
      li.classList.remove('completed');
    }

    const input_edit = document.createElement('input');
    input_edit.setAttribute('class', 'edit');
    input_edit.setAttribute('value', input_new_todo_list.value);
    input_edit.onkeyup = function editEnter(element) {
      if (document.activeElement && event.keyCode === 13) {
        li.classList.remove('editing');
        if (input_edit.value === '') {
          li.parentNode.removeChild(li);
        }
        label.innerText = input_edit.value;
        return;
      }
      if (document.activeElement && event.keyCode === 27) {
        li.classList.remove('editing');
      }
    }

    const div_view = document.createElement('div');
    div_view.setAttribute('class', 'view');

    div_view.appendChild(input_toggle);
    div_view.appendChild(label);
    div_view.appendChild(button_destroy);

    li.ondblclick = function edit() {
      li.setAttribute('class', 'editing');
    };

    li.appendChild(div_view);
    li.appendChild(input_edit);

    document.getElementById('todo-list').appendChild(li);

    document.getElementById('new-todo-title').value = null;
    countTodoListsOfSelectedStatus();
  }
}

function countTodoListsOfSelectedStatus() {
  const countOfTodoListsOfSelectedStatus
      = document.getElementById("todo-list").childElementCount;
  const count_container = document.getElementsByClassName('count-container')[0];
  count_container.innerHTML =
      '<span class="todo-count">'
      + '총 <strong>'
      + countOfTodoListsOfSelectedStatus
      + '</strong> 개'
      + '</span>'
      + '<ul class="filters">'
      + '<li>'
      + '<a class="all selected" href="/#">전체보기</a>'
      + '</li>'
      + '<li>'
      + '<a class="active" href="#active">해야할 일</a>'
      + '</li>'
      + '<li>'
      + '<a class="completed" href="#completed">완료한 일</a>'
      + '</li>'
      + '</ul>'
}