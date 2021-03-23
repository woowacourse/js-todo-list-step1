export default function Todos() {
    this.todos = [];
}

Todos.prototype.push = function(todo) {
    this.todos.push(todo);
}

Todos.prototype.html = function() {
    var result = "";
    
    this.todos.forEach(todo =>
        result += todo.html()
    );
    return result;
}