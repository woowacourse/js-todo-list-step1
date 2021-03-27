export default class FilterTodo {
  constructor ($filters, updateTodo) {
    this.$filters = $filters
    this.updateTodo = updateTodo

    $filters.addEventListener('click', this.filterTodo)
  }

  filterTodo = ({ target }) => {
    this.$filters.querySelector('.selected').classList.remove('selected')
    target.classList.add('selected')

    this.todos = JSON.parse(localStorage.getItem('todos')) ?? []
    if (target.classList.contains('all')) {
      this.updateTodo(this.todos)
    }
    if (target.classList.contains('active')) {
      const todos = this.todos.filter(todo => !todo.completed)
      this.updateTodo(todos)
    }
    if (target.classList.contains('completed')) {
      const todos = this.todos.filter(todo => todo.completed)
      this.updateTodo(todos)
    }
  }
}