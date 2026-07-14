let coins = 0;
let tasks = [];

// Load data
window.onload = function () {
  let savedTasks = localStorage.getItem("tasks");
  let savedCoins = localStorage.getItem("coins");

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderAllTasks();
  }

  if (savedCoins) {
    coins = parseInt(savedCoins);
    updateCoins();
  }
};

function addTask() {
  let input = document.getElementById("taskInput");
  let text = input.value;

  if (text === "") return;

  let task = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(task);
  saveData();
  renderAllTasks();

  input.value = "";
}

function renderAllTasks() {
  document.getElementById("pendingList").innerHTML = "";
  document.getElementById("completedList").innerHTML = "";

  tasks.forEach(task => renderTask(task));
}

function renderTask(task) {
  let li = document.createElement("li");
  li.innerText = task.text;

  let btnContainer = document.createElement("div");

  if (!task.completed) {
    let doneBtn = document.createElement("button");
    doneBtn.innerText = "✔";

    doneBtn.onclick = function (e) {
      e.stopPropagation();

      task.completed = true;
      coins++;

      animateCoin();
      updateCoins();
      saveData();
      renderAllTasks();
    };

    btnContainer.appendChild(doneBtn);
  }

  if (task.completed) {
    li.classList.add("completed");

    let undoBtn = document.createElement("button");
    undoBtn.innerText = "↺";

    undoBtn.onclick = function (e) {
      e.stopPropagation();

      task.completed = false;
      coins--;

      updateCoins();
      saveData();
      renderAllTasks();
    };

    btnContainer.appendChild(undoBtn);
  }

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";

  deleteBtn.onclick = function (e) {
    e.stopPropagation();

    if (task.completed) {
      coins--;
      updateCoins();
    }

    tasks = tasks.filter(t => t.id !== task.id);
    saveData();
    renderAllTasks();
  };

  btnContainer.appendChild(deleteBtn);

  li.appendChild(btnContainer);

  if (task.completed) {
    document.getElementById("completedList").appendChild(li);
  } else {
    document.getElementById("pendingList").appendChild(li);
  }
}

// Coin animation
function animateCoin() {
  let coinEl = document.getElementById("coins");
  coinEl.classList.add("coin-pop");

  setTimeout(() => {
    coinEl.classList.remove("coin-pop");
  }, 300);
}

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("coins", coins);
}

function updateCoins() {
  document.getElementById("coins").innerText = coins;
}