function makeNewTodoLi() {
    return function (e) {
        if (e.key === 'Enter') {
            clone(this.value);
            this.value = "";
        }
    };
}

function clone(value) {
    const newTodoListElement = document.getElementsByClassName(
        'new-template')[0].cloneNode(true);
    newTodoListElement.id = "new";
    newTodoListElement.childNodes[1].childNodes[3].textContent = value;
    newTodoListElement.childNodes[3].value = value;
    document.getElementById('todo-list').appendChild(newTodoListElement);
    updateTotalCount()
}

function updateTotalCount() {
    document.getElementById('todo-count-value').textContent = getListCount();

}

function changeOrDeleteLi() {
    return function (e) {
        if (e.target && e.target.className === "toggle") {
            if (e.target.checked === true) {
                e.target.parentNode.parentNode.className = "completed"
                return;
            }
            e.target.parentNode.parentNode.className = "new"
        }

        if (e.target && e.target.className === "destroy") {
            if (confirm('정말로 삭제하시겠습니까?') === true) {
                const parentElement = e.target.parentNode.parentNode.parentNode;
                parentElement.removeChild(e.target.parentNode.parentNode)
                updateTotalCount()
            }
        }
    };
}

function changeLiToInput() {
    return function (e) {
        if (e.target && e.target.className === "label") {
            e.target.parentNode.parentNode.className = "editing"
        }
    };
}

function changeInputToLi() {
    return function (e) {
        if (e.key === 'Enter') {
            if (e.target && e.target.className === "edit") {
                let value = e.target.value;
                let parentNode = e.target.parentNode;
                parentNode.className = "new"
                parentNode.childNodes[1].childNodes[3].textContent = value;
            }
        } else if (e.key === 'Esc' || e.key === 'Escape' || e.key === 27) {
            if (e.target && e.target.className === "edit") {
                let parentNode = e.target.parentNode;
                parentNode.className = "new"
            }
        }
    };
}

function getListCount() {
    let childNodes = document.getElementById('todo-list').childNodes;
    let count = 0;
    for (let i = 0; i < childNodes.length; i++) {
        count++;
    }
    return count;
}

function applyFilterBorderColor(hash) {
    let child = document.getElementsByClassName('filters')[0].childNodes;
    if (hash === "") {
        child[1].childNodes[1].className = "all selected";
        child[3].childNodes[1].className = "active";
        child[5].childNodes[1].className = "completed";
    } else if (hash === "#active") {
        child[1].childNodes[1].className = "all";
        child[3].childNodes[1].className = "active selected";
        child[5].childNodes[1].className = "completed";
    } else if (hash === "#completed") {
        child[1].childNodes[1].className = "all";
        child[3].childNodes[1].className = "active";
        child[5].childNodes[1].className = "completed selected";
    }
}

function filter(hash) {
    let todo_list = document.getElementById('todo-list').childNodes;
    for (let i = 0; i < todo_list.length; i++) {
        const name = todo_list[i].className;
        if (!name.includes(hash)) {
            todo_list[i].style.display = 'none';
        } else {
            todo_list[i].style.display = 'block';
        }
    }
}

window.onhashchange = function () {
    const hash = window.location.hash;
    applyFilterBorderColor(hash);

    if (hash === "") {
        filter("e")
    } else if (hash === "#active") {
        filter("new")
    } else if (hash === "#completed") {
        filter("completed")
    }
};

document.getElementById('new-todo-title').addEventListener('keypress',
    makeNewTodoLi());
document.getElementById('todo-list').addEventListener('click',
    changeOrDeleteLi());
document.getElementById('todo-list').addEventListener('dblclick',
    changeLiToInput());
document.getElementById('todo-list').addEventListener('keypress',
    changeInputToLi());
document.getElementById('todo-list').addEventListener('keydown',
    changeInputToLi());