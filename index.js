const todoListInputBox = document.getElementById('new-todo-title');
todoListInputBox.addEventListener('keyup', inputToDo);

const filterLis = document.querySelector('.filters').querySelectorAll('li');

for(let i = 0; i < filterLis.length; i++){
    const currentATag = filterLis[i].querySelector('a');
    console.log(i);
    currentATag.addEventListener('click', function() {
        for (let j = 0; j < filterLis.length; j++) {
            filterLis[j].querySelector('a').classList.remove('selected');
        }
        currentATag.classList.add('selected');
        console.log('test') 
        if(currentATag.classList.contains('all')){
            const lis = document.querySelector('.todo-list').querySelectorAll('li');
            for(let i = 0; i < lis.length; i++) {
                lis[i].style.display=null;
            }
            return;
        }
        if(currentATag.classList.contains('active')){
            const lis = document.querySelector('.todo-list').querySelectorAll('li');
            for(let i = 0; i < lis.length; i++) {
                console.log(lis[i])
                if(lis[i].classList.contains('completed')){
                    lis[i].style.display='none';
                }
                if(lis[i].classList.contains('false')){
                    lis[i].style.display='block';
                }
            }
            updateCountWhenActive();
            return;
        }
        if(currentATag.classList.contains('completed')){
            const lis = document.querySelector('.todo-list').querySelectorAll('li');
            for(let i = 0; i < lis.length; i++) {
                if(lis[i].classList.contains('false')){
                    lis[i].style.display='none';
                }
                if(lis[i].classList.contains('completed')){
                    lis[i].style.display=null;
                }
            }
            updateCountWhenCompleted();
            return;
        }
    });
}

function inputToDo() {
    if(window.event.keyCode == 13) {
        const li = document.createElement('li');
        li.innerHTML = `<div class="view">
                              <input class="toggle" onclick="changeState(this)" type="checkbox"/>
                              <label class="label" ondblclick="editValue(this)">${this.value}</label>
                              <button class="destroy" onclick="removeTodo(this)"></button>
                            </div>
                            <input class="edit" value="${this.value}" />`;
        document.getElementById('todo-list').appendChild(li);
        this.value = '';

        li.classList.add('false');

        updateCount();
    }
}

function removeTodo(self) {
    const li = self.parentNode.parentNode;
    li.remove();
    updateCount();
}

function updateCount() {
    const todolist = document.getElementById('todo-list');
    document.querySelector('.todo-count').innerHTML =  `총 <strong>${todolist.querySelectorAll('li').length}</strong> 개`
}

function updateCountWhenActive() {
    console.log("whenActive");
    const lis = document.getElementById('todo-list').querySelectorAll('li');
    let cnt = 0;
    for(let i = 0; i < lis.length; i++) {
        if(lis[i].classList.contains('false')) {
            cnt++;
        }
    }
    document.querySelector('.todo-count').innerHTML =  `총 <strong>${cnt}</strong> 개`
}

function updateCountWhenCompleted() {
    console.log("whenCompleted");
    const lis = document.getElementById('todo-list').querySelectorAll('li');
    let cnt = 0;
    for(let i = 0; i < lis.length; i++) {
        if(lis[i].classList.contains('completed')) {
            cnt++;
        }
    }
    document.querySelector('.todo-count').innerHTML =  `총 <strong>${cnt}</strong> 개`
}

function changeState(self) {
    const li = self.parentNode.parentNode;
    if(li.classList.contains('false')) {
        li.classList.remove('false');
        li.classList.add('completed');
        return;
    }
    li.classList.remove('completed');
    li.classList.add('false');
}

function editValue(self) {
    const cList = self.parentNode.parentNode.classList;
    cList.add('editing');

    self.parentNode.parentNode.addEventListener('keyup', function(){
        if(window.event.keyCode == 13) {
            console.log(document.querySelector('.edit').value);
            cList.remove('editing');
            self.innerHTML = document.querySelector('.edit').value;
            return;
        }
    
        if(window.event.keyCode == 27) {
            cList.remove('editing');
            return;
        }
    });
}