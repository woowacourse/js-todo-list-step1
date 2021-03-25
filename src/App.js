export default class App {
  constructor() {
    this.newTodo = document.querySelector('#new-todo-title')
    this.todoList = document.querySelector('#todo-list')

    this.createTodo( this.newTodo, this.todoList )
  }

  createTodo( newTodo, todoList ) {
    newTodo.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && newTodo.value) {
      const todoItem = document.createElement('li')
      todoItem.className = 'false'

      const todo = document.createElement('div')
      todo.className = 'view'

      const checkBox = document.createElement('input')
      checkBox.type = 'checkbox'
      checkBox.className = 'toggle'
      checkBox.addEventListener('click', () => {
        if (checkBox.checked) {
          todoItem.className = 'completed'
        } else {
          todoItem.className = 'false'
        }
      })

      const content = document.createElement('label')
      content.className = 'label'
      content.innerText = this.newTodo.value

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

      newTodo.value = ''
    }
  })
  }
}

new App()