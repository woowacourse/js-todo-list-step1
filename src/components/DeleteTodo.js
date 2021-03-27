export default class DeleteTodo {
  constructor ($todoList, loadTodo) {
    this.loadTodo = loadTodo

    $todoList.addEventListener('click', this.deleteTodo)
  }

  deleteTodo = ({ target }) => {
    if (target.className === 'destroy') {
      const todos = JSON.parse(localStorage.getItem('todos')) ?? []
      const todo = todos.find(todo => todo.id === target.id)
      todos.splice(todos.indexOf(todo), 1)
      localStorage.setItem('todos', JSON.stringify(todos))

      this.loadTodo()
    }
  }
}