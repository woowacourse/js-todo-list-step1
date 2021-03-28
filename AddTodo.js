export default function AddTodo($newTodo) {
    // constructor
    this.newTodo = $newTodo;

    this.addItem = function(event) {
        const newTodoTitle = event.target.value;
        if (event.key === "Enter" && newTodoTitle !== "") {
            const todos = JSON.parse(localStorage.getItem('todos')) ?? [];
            todos.push({
                id: String(Date.now()),
                title: event.target.value,
                completed: false,
            });
            localStorage.setItem('todos', JSON.stringify(todos));
            event.target.value = "";
            AddTodo.prototype.renderTodo();
        }
    }

    this.newTodo.addEventListener('keyup', this.addItem);
}
