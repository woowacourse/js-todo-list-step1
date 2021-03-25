function init() {
  const newTodo = document.querySelector('#new-todo-title')
  const todoList = document.querySelector('#todo-list')

  newTodo.addEventListener('keyup', createTodo)
  todoList.addEventListener('click', checkTodo)
  todoList.addEventListener('dblclick', editTodo)
}

function editTodo(e) {
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

function checkTodo(e) {
  if (e.target.className === 'toggle') {
    e.target.closest('li').classList.toggle('completed')
  }
}

function createTodo(e) {
  if (e.key === 'Enter' && e.target.value) {
    const todoList = document.querySelector('#todo-list')

    const todoItem = document.createElement('li')

    const todo = document.createElement('div')
    todo.className = 'view'

    const checkBox = document.createElement('input')
    checkBox.type = 'checkbox'
    checkBox.className = 'toggle'

    const content = document.createElement('label')
    content.className = 'label'
    content.innerText = e.target.value

    const destroyBtn = document.createElement('button')
    destroyBtn.className = 'destroy'
    destroyBtn.addEventListener('click', () => {
      todoList.removeChild(todoItem)
    })

    todo.appendChild(checkBox)
    todo.appendChild(content)
    todo.appendChild(destroyBtn)
    todoItem.appendChild(todo)
    todoList.appendChild(todoItem)

    e.target.value = ''
  }
}

init()