document.getElementById('new-todo-title').addEventListener('keyup',addList)


function addList(e) {
    if(e.key === 'Escape') {
        document.getElementById('new-todo-title').value = "";
        return;
    }

    if(e.key !== 'Enter') {
        return;
    }
    const contents = document.getElementById('todo-list');


    const li = document.createElement('li');
    const div = document.createElement('div');
    div.setAttribute('class','view');
    li.classList.add("false");

    const toggle = document.createElement('input');
    toggle.setAttribute('class', 'toggle');
    toggle.setAttribute('type', 'checkbox');

    div.appendChild(toggle);

    const label = document.createElement('label');
    label.setAttribute("class", "label");
    if( document.getElementById('new-todo-title').value === "") {
        return;
    }
    label.innerHTML = document.getElementById('new-todo-title').value;


    div.appendChild(label);

    const button = document.createElement('button');
    button.setAttribute('class', 'destroy');

    div.appendChild(button);
    li.appendChild(div);

    const input = document.createElement('input');
    input.setAttribute('class', 'edit');
    input.setAttribute('value', "")
    li.appendChild(input);

    contents.appendChild(li);
    document.getElementById('new-todo-title').value = "";


}
