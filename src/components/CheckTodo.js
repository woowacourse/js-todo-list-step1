export default class CheckTodo {
  constructor ($todoList, loadTodo) {
    this.loadTodo = loadTodo

    $todoList.addEventListener('click', this.checkTodo)
  }

  checkTodo = ({ target }) => {
    this.todos = JSON.parse(localStorage.getItem('todos')) ?? []
    this.todos.map(todo => {
      if (todo.id === target.id) {
        todo.completed = !todo.completed
        todo.checked = !todo.checked
      }
    })
    localStorage.setItem('todos', JSON.stringify(this.todos))
    this.loadTodo()
  }
}