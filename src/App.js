function init () {
  const newTodo = document.querySelector('#new-todo-title')
  const todoList = document.querySelector('#todo-list')
  const filters = document.querySelector('.filters')

  newTodo.addEventListener('keyup', createTodo)
  todoList.addEventListener('click', checkTodo)
  todoList.addEventListener('dblclick', editTodo)

  filters.addEventListener('click', function () {
    filterTodo(event, todoList, filters)
  })

  updateTodo()
}

function filterTodo (e, todoList, filters) {
  filters.querySelector('.selected').classList.remove('selected')
  e.target.classList.add('selected')

  if (e.target.classList.contains('all')) {
    Array.from(todoList.querySelectorAll('li')).
      map(todo => todo.style.display = 'block')
  }
  if (e.target.classList.contains('active')) {
    Array.from(todoList.querySelectorAll('.completed')).
      map(todo => todo.style.display = 'none')
    Array.from(todoList.querySelectorAll('li:not(.completed)')).
      map(todo => todo.style.display = 'block')
  }
  if (e.target.classList.contains('completed')) {
    Array.from(todoList.querySelectorAll('.completed')).
      map(todo => todo.style.display = 'block')
    Array.from(todoList.querySelectorAll('li:not(.completed)')).
      map(todo => todo.style.display = 'none')
  }
}

function todoItemTemplate (todo) {
  return ` <li id=${todo.id} class=${todo.completed && 'completed'}>
            <div class="view">
              <input 
                class="toggle" 
                type="checkbox" 
                id=${todo.id}
                ${todo.checked && 'checked'}>
              <label class="label">${todo.content}</label>
              <button class="destroy" id=${todo.id}></button>
            </div>
            <input class="edit" value=${todo.content}>
          </li>`
}

function editTodo (e) {
  if (e.target.className === 'label') {
    const content = e.target
    const todoItem = e.target.closest('li')
    const editForm = document.createElement('input')
    editForm.className = 'edit'
    editForm.value = content.innerText
    editForm.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        content.innerText = editForm.value
      }
      if (e.key === 'Enter' || e.key === 'Escape') {
        todoItem.removeChild(editForm)
        todoItem.classList.remove('editing')
      }
    })

    todoItem.classList.add('editing')
    todoItem.appendChild(editForm)
  }
}

function checkTodo (e) {
  if (e.target.checked) {
    e.target.closest('li').className = 'completed'
  } else {
    e.target.closest('li').className = 'false'
  }
}

function updateTodo () {
  const todos = JSON.parse(localStorage.getItem('todoList')) ?? []
  const todoList = document.querySelector('#todo-list')
  todoList.innerHTML = ''
  todos.map(
    todo => todoList.insertAdjacentHTML('beforeend', todoItemTemplate(todo)),
  )
}

function createTodo (e) {
  if (e.key === 'Enter' && e.target.value) {
    const todoList = JSON.parse(localStorage.getItem('todoList')) ?? []
    const todoItem = {
      id: Date.now(),
      completed: false,
      content: e.target.value,
    }
    todoList.push(todoItem)
    localStorage.setItem('todoList', JSON.stringify(todoList))
    e.target.value = ''

    updateTodo()
    updateTodoCount(todoList)
  }
}

function updateTodoCount (todoList) {
  const todoCount = document.querySelector('strong')
  todoCount.innerText = todoList.length
}

init()