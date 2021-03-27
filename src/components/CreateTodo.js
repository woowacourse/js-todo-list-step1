export default class CreateTodo {
  constructor ($newTodo, loadTodo) {
    this.loadTodo = loadTodo

    $newTodo.addEventListener('keyup', this.createTodo)
  }

  createTodo = ({ key, target }) => {
    if (key === 'Enter' && target.value) {
      const todoItem = {
        id: Date.now(),
        completed: false,
        content: target.value,
      }

      const todos = JSON.parse(localStorage.getItem('todos')) ?? []
      todos.push(todoItem)
      localStorage.setItem('todos', JSON.stringify(todos))
      target.value = ''

      this.loadTodo()
    }
  }
}