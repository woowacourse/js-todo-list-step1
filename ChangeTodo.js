export default function ChangeTodo($todoList, renderTodo) {
    // constructor
    this.todoList = $todoList;
    this.renderTodo = renderTodo;

    this.changeTodo = function(event) {
        const todos = JSON.parse(localStorage.getItem('todos')) ?? [];
        const target = event.target;

        if (target.classList.contains("toggle")) {
            const result = todos.map(function(item) {
                if (item.id === target.id) {
                    item.completed = !item.completed;
                }
                return item;
            });
            localStorage.setItem('todos', JSON.stringify(result));
            this.renderTodo();
            return;
        }
        if (target.classList.contains("destroy")) {
            const result = todos.filter(function(item) {
                if (item.id !== target.id) {
                    return item;
                }
            })
            localStorage.setItem('todos', JSON.stringify(result));
            this.renderTodo();
            return;
        }
    }.bind(this);

    this.todoList.addEventListener('click', this.changeTodo);
}
