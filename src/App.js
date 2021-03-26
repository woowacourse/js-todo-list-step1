function init () {
  const newTodo = document.querySelector('#new-todo-title')
  const todoList = document.querySelector('#todo-list')
  const filters = document.querySelector('.filters')

  newTodo.addEventListener('keyup', createTodo)
  todoList.addEventListener('click', checkTodo)
  todoList.addEventListener('dblclick', editTodo)
  todoList.addEventListener('click', deleteTodo)

  filters.addEventListener('click', function () {
    filterTodo(event, todoList, filters)
  })

  const todos = JSON.parse(localStorage.getItem('todos')) ?? []
  updateTodo(todos)
}

function deleteTodo (e) {
  if (e.target.className === 'destroy') {
    const todos = JSON.parse(localStorage.getItem('todos')) ?? []
    const todo = todos.find(todo => todo.id === e.target.id)
    todos.splice(todos.indexOf(todo), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
    updateTodo(todos)
  }
}

function filterTodo (e, todoList, filters) {
  filters.querySelector('.selected').classList.remove('selected')
  e.target.classList.add('selected')

  let todos = JSON.parse(localStorage.getItem('todos')) ?? []
  if (e.target.classList.contains('all')) {
    updateTodo(todos)
  }
  if (e.target.classList.contains('active')) {
    todos = todos.filter(todo => !todo.completed)
    updateTodo(todos)
  }
  if (e.target.classList.contains('completed')) {
    todos = todos.filter(todo => todo.completed)
    updateTodo(todos)
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

function updateTodo (todos) {
  const todoList = document.querySelector('#todo-list')
  todoList.innerHTML = ''
  todos.map(
    todo => todoList.insertAdjacentHTML('beforeend', todoItemTemplate(todo)),
  )
}

function createTodo (e) {
  if (e.key === 'Enter' && e.target.value) {
    const todos = JSON.parse(localStorage.getItem('todos')) ?? []
    const todoItem = {
      id: Date.now(),
      completed: false,
      content: e.target.value,
    }
    todos.push(todoItem)
    localStorage.setItem('todos', JSON.stringify(todos))
    e.target.value = ''

    updateTodo(todos)
    updateTodoCount(todos)
  }
}

function updateTodoCount (todoList) {
  const todoCount = document.querySelector('strong')
  todoCount.innerText = todoList.length
}

init()