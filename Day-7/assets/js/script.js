let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (!text) return;

  tasks.push({
    id: Date.now(),
    text: text,
    editing: false
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    if (task.editing) {
      li.innerHTML = `
        <input class="edit-input" value="${task.text}" id="edit-${task.id}">
        <div class="actions">
          <button class="save-btn" onclick="saveEdit(${task.id})">✔</button>
        </div>
      `;
    } else {
      li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <div class="actions">
          <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
          <button class="delete-btn" onclick="deleteTask(${task.id})">Delet</button>
        </div>
      `;
    }

    list.appendChild(li);
  });
}

function editTask(id) {
  tasks = tasks.map(t => {
    if (t.id === id) t.editing = true;
    return t;
  });
  renderTasks();
}

function saveEdit(id) {
  const input = document.getElementById(`edit-${id}`).value;

  tasks = tasks.map(t => {
    if (t.id === id) {
      t.text = input;
      t.editing = false;
    }
    return t;
  });

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

document.getElementById("taskInput").addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

renderTasks();