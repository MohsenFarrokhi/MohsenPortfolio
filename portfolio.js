document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Form submitted successfully!');
});
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const completedList = document.getElementById("completed-list");

addBtn.addEventListener("click", addTodo);

// add a new todo item
function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText !== "") {
        const todoItem = createTodoItem(todoText);
        todoList.appendChild(todoItem);
        todoInput.value = "";
    }
}

// create a todo item
function createTodoItem(todoText) {
    const todoItem = document.createElement("li");
    todoItem.innerHTML = `
    <input type="checkbox">
    <label>${todoText}</label>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;

    todoItem.querySelector(".edit-btn").addEventListener("click", editTodo);
    todoItem.querySelector(".delete-btn").addEventListener("click", deleteTodo);
    todoItem.querySelector("input[type='checkbox']").addEventListener("change", toggleComplete);

    return todoItem;
}

//  edit a todo item
function editTodo() {
    const todoItem = this.parentNode;
    const todoLabel = todoItem.querySelector("label");

    // Create an input field and set its value as the current task text
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = todoLabel.textContent;
    todoItem.replaceChild(editInput, todoLabel);

    // Change the Edit button to Save button
    this.textContent = "Save";
    this.removeEventListener("click", editTodo);
    this.addEventListener("click", saveTodo);

    // Focus on the input field
    editInput.focus();
}

// save the edited todo item
function saveTodo() {
    const todoItem = this.parentNode;
    const editInput = todoItem.querySelector("input[type='text']");
    const todoLabel = document.createElement("label");
    todoLabel.textContent = editInput.value;
    todoItem.replaceChild(todoLabel, editInput);

    this.textContent = "Edit";
    this.removeEventListener("click", saveTodo);
    this.addEventListener("click", editTodo);
}

// delete a todo item
function deleteTodo() {
    const todoItem = this.parentNode;
    todoItem.parentNode.removeChild(todoItem);
}

// toggle the completion status
function toggleComplete() {
    const todoItem = this.parentNode;
    if (this.checked) {
        completedList.appendChild(todoItem);
    } else {
        todoList.appendChild(todoItem);
    }
}