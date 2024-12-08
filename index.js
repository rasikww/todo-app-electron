const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.classList.add("todo-item");

        const todoText = document.createElement("span");
        todoText.textContent = todo.text;
        if (todo.completed) {
            todoText.classList.add("completed");
        }

        todoText.addEventListener("click", () => {
            todos[index].completed = !todos[index].completed;
            saveTodos();
            renderTodos();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });

        li.appendChild(todoText);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        todoInput.value = "";
        saveTodos();
        renderTodos();
    }
});

todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addBtn.click();
    }
});

document
    .getElementById("toggle-dark-mode")
    .addEventListener("click", async () => {
        const isDarkMode = await window.darkMode.toggle();
        document.getElementById("theme-source").innerHTML = isDarkMode
            ? "Dark"
            : "Light";
    });

document
    .getElementById("reset-to-system")
    .addEventListener("click", async () => {
        await window.darkMode.system();
        document.getElementById("theme-source").innerHTML = "System";
    });

// Initial render
renderTodos();
