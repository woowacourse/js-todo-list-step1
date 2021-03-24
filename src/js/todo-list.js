const allTodoLists = [];

let currentSelectedATagToShowStrategy
    = document.getElementsByClassName('all selected')[0];

function enter(input_new_todo_list) {
  if (event.keyCode === 13) {
    if (input_new_todo_list.value === '') {
      return;
    }

    const li = document.createElement('li');

    const button_destroy = document.createElement('button');
    button_destroy.setAttribute('class', 'destroy');
    button_destroy.onclick = function remove() {
      const allTodoListsExceptTodoListToRemove = [];
      for (let i = 0; i < allTodoLists.length; i++) {
        if (allTodoLists[i] === li) {
          continue;
        }
        allTodoListsExceptTodoListToRemove.push(allTodoLists[i]);
      }
      li.parentNode.removeChild(li);

      allTodoLists.length = 0;
      Array.prototype.push.apply(allTodoLists, allTodoListsExceptTodoListToRemove);

      countTodoListsOfSelectedStatus(currentSelectedATagToShowStrategy);
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
        input_toggle.setAttribute('checked', '');
        showTodoListsOfSelectedStatus(currentSelectedATagToShowStrategy);
        return;
      }
      input_toggle.removeAttribute('checked');
      li.classList.remove('completed');
      showTodoListsOfSelectedStatus(currentSelectedATagToShowStrategy);
    }

    const input_edit = document.createElement('input');
    input_edit.setAttribute('class', 'edit');
    input_edit.setAttribute('value', input_new_todo_list.value);
    input_edit.onkeyup = function editEnter() {
      if (document.activeElement && event.keyCode === 13) {
        if (input_edit.value === '') {
          const allTodoListsExceptTodoListToRemove = [];
          for (let i = 0; i < allTodoLists.length; i++) {
            if (allTodoLists[i] === li) {
              continue;
            }
            allTodoListsExceptTodoListToRemove.push(allTodoLists[i]);
          }
          li.parentNode.removeChild(li);

          allTodoLists.length = 0;
          Array.prototype.push.apply(allTodoLists, allTodoListsExceptTodoListToRemove);
          showTodoListsOfSelectedStatus(currentSelectedATagToShowStrategy);
        }
        li.classList.remove('editing');
        label.innerText = input_edit.value;
        return;
      }
      if (document.activeElement && event.keyCode === 27) {
        li.classList.remove('editing');
        input_edit.value = label.innerText;
      }
    }

    const div_view = document.createElement('div');
    div_view.setAttribute('class', 'view');

    div_view.appendChild(input_toggle);
    div_view.appendChild(label);
    div_view.appendChild(button_destroy);

    li.ondblclick = function edit() {
      li.classList.add('editing');
    };

    li.appendChild(div_view);
    li.appendChild(input_edit);

    document.getElementById('todo-list').appendChild(li);

    document.getElementById('new-todo-title').value = null;

    allTodoLists.push(li);
    countTodoListsOfSelectedStatus();
    showTodoListsOfSelectedStatus(currentSelectedATagToShowStrategy);
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
      + '<a class="all selected" href="#" onclick="showTodoListsOfSelectedStatus(this);">전체보기</a>'
      + '</li>'
      + '<li>'
      + '<a class="active" href="#active" onclick="showTodoListsOfSelectedStatus(this);">해야할 일</a>'
      + '</li>'
      + '<li>'
      + '<a class="completed" href="#completed" onclick="showTodoListsOfSelectedStatus(this);">완료한 일</a>'
      + '</li>'
      + '</ul>'
}

function showTodoListsOfSelectedStatus(aTag) {
  const todoListOuter = document.getElementById('todo-list');
  todoListOuter.innerHTML = '';

  currentSelectedATagToShowStrategy = aTag;

  if (currentSelectedATagToShowStrategy.className === 'all selected') {
    for (let i = 0; i < allTodoLists.length; i++) {
      todoListOuter.appendChild(allTodoLists[i]);
    }
  }

  if (currentSelectedATagToShowStrategy.className === 'active') {
    for (let i = 0; i < allTodoLists.length; i++) {
      if (allTodoLists[i].className === '' || allTodoLists[i].className === 'editing') {
        todoListOuter.appendChild(allTodoLists[i]);
      }
    }
  }

  if (currentSelectedATagToShowStrategy.className === 'completed') {
    for (let i = 0; i < allTodoLists.length; i++) {
      if (allTodoLists[i].className === 'completed' || allTodoLists[i].className === 'completed editing') {
        todoListOuter.appendChild(allTodoLists[i]);
      }
    }
  }

  countTodoListsOfSelectedStatus();
}