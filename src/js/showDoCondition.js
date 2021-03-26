window.onload = function(){
    const $filters = document.getElementsByClassName('filters')[0];
    
    const $allFilters = $filters.getElementsByClassName('all')[0];
    $allFilters.addEventListener('click', showAll);

    const $activeFilters = $filters.getElementsByClassName('active')[0];
    $activeFilters.addEventListener('click', showActive);

    const $completeFilters = $filters.getElementsByClassName('completed')[0];
    $completeFilters.addEventListener('click', showComplete);
};

const showAll = () => {
    const $allDos = document.getElementById("todo-list").childNodes;
    Array.prototype.forEach.call($allDos, function($toDo) {
        $toDo.style.display = "block";
    });
}

const showActive = () => {
    const $allDos = document.getElementById("todo-list").childNodes;
    Array.prototype.forEach.call($allDos, function($toDo) {
        $toDo.style.display = "block";
    });
    Array.prototype.forEach.call($allDos, function($toDo) {
        if ($toDo.className == "completed"){
            $toDo.style.display = "none";
        }
    });
}

const showComplete = () => {
    const $allDos = document.getElementById("todo-list").childNodes;
    Array.prototype.forEach.call($allDos, function($toDo) {
        $toDo.style.display = "block";
    });
    Array.prototype.forEach.call($allDos, function($toDo) {
        if ($toDo.className != "completed"){
            $toDo.style.display = "none";
        }
    });
}