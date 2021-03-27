class Todolist {
  #ACTIVE = 'active';
  #COMPLETED = 'completed';
  #todoList = [];
  #index = 0;

  addItem(text) {
    this.#todoList.push({
      id: this.#index.toString(),
      text,
      checked: false,
    });
    this.#index++;
  }

  editItem(id, text) {
    this.#findItemById(id).text = text;
  }

  removeItem(id) {
    const searchElement = this.#findItemById(id);
    this.#todoList.splice(this.#todoList.indexOf(searchElement),1);
  }

  changeChecked(id) {
    const todoListElement = this.#findItemById(id);
    todoListElement.checked = !todoListElement.checked;
  }

  values(currentState) {
    if(currentState === this.#ACTIVE) {
      return this.#todoList.filter(item => !item.checked);
    }
    if(currentState === this.#COMPLETED) {
      return this.#todoList.filter(item => item.checked);
    }

    return this.#todoList;
  }

  #findItemById(id) {
    return this.#todoList.find(item => item.id === id);
  }
}
