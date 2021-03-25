function init() {
  const inputArea = document.querySelector('.new-todo')
  const todoList = document.querySelector('.todo-list')

  inputArea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      const todoItem = document.createElement('li')

      const todo = document.createElement('div')
      todo.className = 'view'

      const checkBox = document.createElement('input')
      checkBox.type = 'checkbox'
      checkBox.className = 'toggle'

      const content = document.createElement('label')
      content.className = 'label'
      content.innerText = inputArea.value

      const destroyBtn = document.createElement('button')
      destroyBtn.className = 'destroy'

      todo.appendChild(checkBox)
      todo.appendChild(content)
      todo.appendChild(destroyBtn)
      todoItem.appendChild(todo)
      todoList.appendChild(todoItem)
    }
  })
}

init()