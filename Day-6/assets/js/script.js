let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
        <span>${task}</span>
        <button class="delete-btn" aria-label="Delete task">❌</button>
      `;

        li.querySelector("button").addEventListener("click", () => {
            deleteTask(index);
        });

        list.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const value = input.value.trim();

    if (value === "") return;

    tasks.push(value);
    saveTasks();
    renderTasks();
    input.value = "";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

document.getElementById("addBtn").addEventListener("click", addTask);

document.getElementById("taskInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

renderTasks();