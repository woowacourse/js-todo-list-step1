export default function Filters($filters, renderTodo) {
    // constructor
    this.filters = $filters;
    this.renderTodo = renderTodo;

    this.filterTodo = function(event) {
        const target = event.target;

        const $allSelected = document.querySelector(".all");
        const $active = document.querySelector(".active");
        const $completed = document.querySelector(".completed");

        if (target.classList.contains("active")) {
            $allSelected.classList.remove("selected");
            $completed.classList.remove("selected");
            
            $active.classList.toggle("selected");
            this.renderTodo("active");
            return;
        }
        if (target.classList.contains("completed")) {
            $allSelected.classList.remove("selected");
            $active.classList.remove("selected");
            
            $completed.classList.toggle("selected");
            this.renderTodo("completed");
            return;
        }
        $active.classList.remove("selected");
        $completed.classList.remove("selected");
        
        $allSelected.classList.toggle("selected");
        this.renderTodo();
    }.bind(this);

    this.filters.addEventListener('click', this.filterTodo);
}
