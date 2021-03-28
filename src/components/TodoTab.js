function TodoTab({$target, selectTodoStatus, state}) {

    this.init = () => {
        this.$target = $target;
        this.selectTodoStatus = selectTodoStatus;
        this.state = state;
        this.render();

        this.addClickEvent();
    }

    this.addClickEvent = function () {
        this.$target.addEventListener("click", evt => {
            const eventTarget = evt.target;
            if (eventTarget.tagName !== "A") {
                return;
            }

            this.selectTodoStatus(eventTarget.className);
        })
    };

    this.setState = (changedState) => {
        this.state = changedState;
        this.render();
    };

    this.render = () => {
        const selectedTab = this.state.selectedTab;
        this.$target.innerHTML = `<li>
                        <a class="all ${selectedTab.includes("all") ? "selected" : ""}" href="#">전체보기</a>
                    </li>
                    <li>
                        <a class="active ${selectedTab.includes("active") ? "selected" : ""}" href="#active">해야할 일</a>
                    </li>
                    <li>
                        <a class="completed ${selectedTab.includes("completed") ? "selected" : ""}" href="#completed">완료한 일</a>
                    </li>`;
    };

    this.init();
}

export default TodoTab;
