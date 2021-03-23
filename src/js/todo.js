document.addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        const todoItem = document.getElementById("new-todo-title").value;
        addTodo(todoItem);
    }
})



function addTodo(input) {
    const todoTag = document.createElement('li');
    todoTag.classList.add(false);
    todoTag.innerHTML =
        ` <div class="view">
                <input class="toggle" type="checkbox" onclick="clicked(this);"/>
                <label class="label" ondblclick="doubleClick(this)">${input}</label>
                <button class="destroy" onclick="remove(this)"></button>
               </div>
               <input class="edit" value="${input}"/>`;
    document.getElementById("todo-list").appendChild(todoTag);

}

function doubleClick(self) {
    classList = self.parentNode.parentElement.classList;
    classList.add("editing");
    document.addEventListener('keydown', function (e) {
        if(e.key == 'Escape'){
            classList.remove("editing")
        }
    })
}

function clicked(self){
    classList = self.parentNode.parentElement.classList;
    if(classList.contains("false")){
        self.setAttribute("checked", "");
        classList.replace("false", "completed");
        return;
    }
    if(classList.contains("completed")){
        self.removeAttribute("checked")
        classList.replace("completed", "false");
        return;
    }
}

function remove(self){
    self.parentNode.parentElement.remove();
}


