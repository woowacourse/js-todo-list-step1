function TodoTab({$target, selectTodoStatus, state}) {

    this.init = () => {
        this.$target = $target;
        this.selectTodoStatus = selectTodoStatus;
        this.state = state;

        this.addClickEvent();
        this.render();
    }

    this.addClickEvent = () => {
        this.$target.addEventListener("click", event => {
            const eventTarget = event.target;
            if (eventTarget.tagName !== "A") {
                return;
            }

            this.selectTodoStatus(eventTarget.className);
        })
    };

    this.setState = changedState => {
        this.state = changedState;
        this.render();
    };

    this.render = () => {
        const selectedTab = this.state.selectedTab;
        this.$target.innerHTML = `<li>
                        <a class="all ${"all".includes(selectedTab) ? "selected" : ""}" href="#">전체보기</a>
                    </li>
                    <li>
                        <a class="active ${"active".includes(selectedTab) ? "selected" : ""}" href="#active">해야할 일</a>
                    </li>
                    <li>
                        <a class="completed ${"completed".includes(selectedTab) ? "selected" : ""}" href="#completed">완료한 일</a>
                    </li>`;
    };

    this.init();
}

export default TodoTab;
