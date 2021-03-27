export default class EditTodo {
  constructor ($todoList, loadTodo) {
    this.loadTodo = loadTodo

    $todoList.addEventListener('dblclick', this.editTodo)
  }

  editTodo = ({ target }) => {
    if (target.className === 'label') {
      this.todos = JSON.parse(localStorage.getItem('todos')) ?? []
      target.closest('li').classList.add('editing')
      target.closest('li').addEventListener('keyup', ({ key, target }) => {
        if (key === 'Enter') {
          this.patchTodo(target)
        }
        if (key === 'Enter' || key === 'Escape') {
          target.closest('li').classList.remove('editing')
        }
      })
    }
  }

  patchTodo = (target) => {
    this.todos.map(todo => {
      if (todo.id === target.closest('li').id) {
        todo.content = target.value
      }
    })
    localStorage.setItem('todos', JSON.stringify(this.todos))
    this.loadTodo()
  }
}