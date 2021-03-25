document.getElementById("new-todo-title").addEventListener("keydown", enterkey);

function enterkey() {
    if (window.event.keyCode ==  13) {
        const input = document.getElementById("new-todo-title").value;

        const li = document.createElement("li");

        const div = document.createElement('div');
        div.setAttribute('class', 'view');

        const toggle = document.createElement("input");
        toggle.setAttribute('class', 'toggle');
        toggle.setAttribute('type', 'checkbox');

        const label = document.createElement('label');
        label.setAttribute('class', 'label');
        label.innerHTML = input;

        const button = document.createElement('button');
        button.setAttribute('class', 'destroy');

        div.appendChild(toggle);
        div.appendChild(label);
        div.appendChild(button);
        li.appendChild(div);

        const ul = document.getElementById("todo-list");
        ul.appendChild(li);
    }
}

