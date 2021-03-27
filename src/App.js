import CreateTodo from './components/CreateTodo.js'
import DeleteTodo from './components/DeleteTodo.js'
import EditTodo from './components/EditTodo.js'
import FilterTodo from './components/FilterTodo.js'
import CheckTodo from './components/CheckTodo.js'

class App {
  constructor () {
    this.$newTodo = document.querySelector('#new-todo-title')
    this.$todoList = document.querySelector('#todo-list')
    this.$filters = document.querySelector('.filters')

    this.createTodo = new CreateTodo(this.$newTodo, this.loadTodo)
    this.deleteTodo = new DeleteTodo(this.$todoList, this.loadTodo)
    this.editTodo = new EditTodo(this.$todoList, this.loadTodo)
    this.filterTodo = new FilterTodo(this.$filters, this.updateTodo)
    this.checkTodo = new CheckTodo(this.$todoList, this.loadTodo)

    this.loadTodo()
  }

  loadTodo = () => {
    this.todos = JSON.parse(localStorage.getItem('todos')) ?? []
    this.updateTodo(this.todos)
  }

  updateTodo = (todos) => {
    this.$todoList.innerHTML = ''
    todos.map(
      todo => this.$todoList.insertAdjacentHTML('beforeend', this.todoItemTemplate(todo))
    )
    this.updateTodoCount(todos)
  }

  todoItemTemplate = (todo) => {
    return ` <li id=${todo.id} class=${todo.completed && 'completed'}>
            <div class="view">
              <input 
                class="toggle" 
                type="checkbox" 
                id=${todo.id}
                ${todo.checked && 'checked'}>
              <label class="label">${todo.content}</label>
              <button class="destroy" id=${todo.id}></button>
            </div>
            <input class="edit" value=${todo.content}>
          </li>`
  }

  updateTodoCount (todos) {
    const todoCount = document.querySelector('strong')
    todoCount.innerText = todos.length
  }
}

window.onload = () => {
  new App()
}