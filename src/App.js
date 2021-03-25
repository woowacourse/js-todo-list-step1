function init() {
  const newTodo = document.querySelector('#new-todo-title')
  const todoList = document.querySelector('#todo-list')

  newTodo.addEventListener('keyup', createTodo)
  todoList.addEventListener('click', checkTodo)
}

function checkTodo(e) {
  e.target.closest('li').classList.toggle('completed')
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