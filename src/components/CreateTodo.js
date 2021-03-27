export default class CreateTodo {
  constructor ($newTodo, loadTodo) {
    this.loadTodo = loadTodo

    $newTodo.addEventListener('keyup', this.createTodo)
  }

  createTodo = ({ key, target }) => {
    if (key === 'Enter' && target.value) {
      const todoItem = {
        id: Date.now().toString(),
        completed: false,
        content: target.value,
      }

      this.todos = JSON.parse(localStorage.getItem('todos')) ?? []
      this.todos.push(todoItem)
      localStorage.setItem('todos', JSON.stringify(this.todos))
      target.value = ''

      this.loadTodo()
    }
  }
}