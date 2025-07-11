const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

// Load tasks on page load
window.addEventListener("load", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(createTaskElement);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = document.getElementById("task-input").value;
  const time = document.getElementById("task-time").value;

  const task = { text, time, completed: false };
  saveTask(task);
  createTaskElement(task);
  form.reset();
});

function createTaskElement(task) {
  const li = document.createElement("li");
  if (task.completed) li.classList.add("completed");

  li.innerHTML = `
    <span><strong>${task.text}</strong><br><small>${task.time}</small></span>
    <div>
      <button onclick="editTask(this)">Edit</button>
      <button onclick="completeTask(this)">✔</button>
      <button onclick="deleteTask(this)">🗑</button>
    </div>
  `;
  taskList.appendChild(li);
}

function saveTask(newTask) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateLocalStorage() {
  const items = taskList.querySelectorAll("li");
  const updatedTasks = Array.from(items).map(li => {
    const text = li.querySelector("strong").innerText;
    const time = li.querySelector("small").innerText;
    const completed = li.classList.contains("completed");
    return { text, time, completed };
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function completeTask(btn) {
  const li = btn.parentElement.parentElement;
  li.classList.toggle("completed");
  updateLocalStorage();
}

function deleteTask(btn) {
  const li = btn.parentElement.parentElement;
  li.remove();
  updateLocalStorage();
}

function editTask(btn) {
  const li = btn.parentElement.parentElement;
  const taskSpan = li.querySelector("span");
  const [text, time] = taskSpan.innerHTML.split("<br><small>");
  const newText = prompt("Edit task:", text.replace("<strong>", "").replace("</strong>", ""));
  const newTime = prompt("Edit time:", time.replace("</small>", ""));
  if (newText && newTime) {
    taskSpan.innerHTML = `<strong>${newText}</strong><br><small>${newTime}</small>;
    updateLocalStorage()`;
  }
}