export default function AddTodo($newTodo, renderTodo) {
    // constructor
    this.renderTodo = renderTodo;

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
            this.renderTodo();
        }
    }.bind(this);

    $newTodo.addEventListener('keyup', this.addItem);
}
