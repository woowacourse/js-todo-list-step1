function init() {
  const inputArea = document.querySelector('.new-todo')
  const todoList = document.querySelector('.todo-list')

  inputArea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
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
      content.innerText = inputArea.value

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

      inputArea.value
    }
  })
}

init()