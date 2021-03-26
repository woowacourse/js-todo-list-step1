export const showConditions = () => {
    const $filters = document.getElementsByClassName('filters')[0];

    const $allFilters = $filters.getElementsByClassName('all')[0];
    $allFilters.addEventListener('click', showAll);

    const $activeFilters = $filters.getElementsByClassName('active')[0];
    $activeFilters.addEventListener('click', showActive);

    const $completeFilters = $filters.getElementsByClassName('completed')[0];
    $completeFilters.addEventListener('click', showComplete);
};

const blockByCondition = ($doList, condition) => {
    Array.prototype.forEach.call($doList, function($toDo) {
        if ($toDo.className == condition){
            $toDo.style.display = "none";
        }
    });
}

const removeAllBlock = ($doList) => {
    Array.prototype.forEach.call($doList, function($toDo) {
        $toDo.style.display = "block";
    });
}

const showAll = () => {
    const $allDos = document.getElementById("todo-list").childNodes;
    Array.prototype.forEach.call($allDos, function($toDo) {
        $toDo.style.display = "block";
    });
}

const showActive = () => {
    const $allDos = document.getElementById("todo-list").childNodes;

    removeAllBlock($allDos);
    blockByCondition($allDos, "completed")
}

const showComplete = () => {
    const $allDos = document.getElementById("todo-list").childNodes;
    
    removeAllBlock($allDos);
    blockByCondition($allDos, "");
}

