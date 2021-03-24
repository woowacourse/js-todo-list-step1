function enter() {
    var text = document.getElementById("new-todo-title");

    if (window.event.keyCode == 13) {
        console.log(text.value);
    }
}