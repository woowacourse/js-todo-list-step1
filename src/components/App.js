import TodoHeader from "./TodoHeader.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoTab from "./TodoTab.js";
import TodoCounter from "./TodoCounter.js";

export default class App {

    constructor() {
        try {
            this.state = {
                todos: [],
                selectedTab: "all" //todo: all, active, completed (tab 기능 추가시에 확장 고려!)
            }

            this.todoHeader = new TodoHeader({
                $target: document.querySelector(".todo-header")
            });

            this.todoInput = new TodoInput({
                $target: document.querySelector(".todo-input"),
                addTodo: this.addTodo.bind(this)
            });

            this.todoList = new TodoList({
                $target: document.querySelector(".todo-list"),
                state: this.state,
                removeTodo: this.removeTodo.bind(this),
                toggleTodo: this.toggleTodo.bind(this),
                editTodo: this.editTodo.bind(this)
            });

            this.todoCounter = new TodoCounter({
                $target: document.querySelector(".todo-counter"),
                state: this.state
            });

            this.todoTab = new TodoTab({
                $target: document.querySelector(".filters"),
                selectTodoStatus: this.selectTodoStatus.bind(this),
                state:this.state
            });

        } catch (e) {
            console.error(e.error);
        }
    }

    addTodo(newTodo) {
        this.setState({
            ...this.state,
            todos: [...this.state.todos, newTodo],
        });
    }

    removeTodo(removedTodoId) {
        const removedTodos = this.state.todos
            .filter(todo => todo.id !== removedTodoId);

        this.setState({
            ...this.state,
            todos: removedTodos,
        });
    };

    toggleTodo(toggledId) {
        //todo: 질의응답 해보기 특정요소만 변경하기! (프론트 분들한테 물어볼까...?)
        const changedTodos = this.state.todos
            .map(todo => {
                    if (todo.id !== parseInt(toggledId)) {
                        return todo;
                    }

                    return {
                        ...todo,
                        done: !todo.done
                    };
                }
            );

        this.setState({
            ...this.state,
            todos: changedTodos,
        });
    };

    editTodo(editedTodoId, newTodoTitle) {
        const editedTodos = this.state.todos
            .map(todo => {
                if (todo.id !== editedTodoId) {
                    return todo;
                }

                return {
                    ...todo,
                    title: newTodoTitle
                };
            });

        this.setState({
            ...this.state,
            todos: editedTodos
        });
    };

    selectTodoStatus(tabAttributeName) { //todo: 선택한 tab으로 변경!
        this.setState({
            ...this.state,
            selectedTab: tabAttributeName
        });

        const filteredTodos = this.state.todos
            .filter(todo => this.filterTodo(todo));

        const filteredState = {
            ...this.state,
            todos: filteredTodos
        };

        this.todoList.setState(filteredState);
        this.todoTab.setState(filteredTodos);
        this.todoCounter.setState(filteredState);
    }

    filterTodo = todo => {
        const selectedTab = this.state.selectedTab;
        if (selectedTab.includes('all')) {
            return true;
        }

        if (selectedTab.includes('active')) {
            return todo.done === false;
        }

        return todo.done === true;
    }

    setState(changedState) {
        this.state = changedState;
        this.todoList.setState(changedState);
        this.todoTab.setState(changedState);
        this.todoCounter.setState(changedState);
    }

}
