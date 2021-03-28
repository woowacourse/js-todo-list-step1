export default function EditTodo($todoList) {
    // constructor
    this.todoList = $todoList;

    this.editTodo = function(event) {
        const target = event.target;

        if (target.classList.contains("label")) {
            const originalTodoTitle = target.textContent;
            target.closest("li").classList.toggle('editing');

            target.closest("li").addEventListener('keyup', (event) => {
                const todos = JSON.parse(localStorage.getItem('todos')) ?? [];
                const target = event.target;

                if (event.key === "Enter") {
                    const result = todos.map(function(item) {
                        if (item.id === target.closest("li").id) {
                            item.title = target.value;
                        }
                        return item;
                    })
                    localStorage.setItem('todos', JSON.stringify(result));
                    target.closest("li").classList.toggle('editing');
                    EditTodo.prototype.renderTodo();
                    return;
                }
                if (event.key === "Escape") {
                    target.closest("li").classList.toggle('editing');
                    EditTodo.prototype.renderTodo();
                    return;
                }
            });
        }
    }

    this.todoList.addEventListener("dblclick", this.editTodo);
}