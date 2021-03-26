export const allFilters = {
    all: "전체보기",
    active: "해야할 일", 
    completed: "완료한 일"
};

export function Filter() {
    this.name = "all";
}

Filter.prototype.chageFilter = function(filter) {
    this.name = filter;
}