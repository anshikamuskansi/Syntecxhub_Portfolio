// let coins = 0;
// let tasks = [];

// // Load data
// window.onload = function () {
//   let savedTasks = localStorage.getItem("tasks");
//   let savedCoins = localStorage.getItem("coins");

//   if (savedTasks) {
//     tasks = JSON.parse(savedTasks);
//     renderAllTasks();
//   }

//   if (savedCoins) {
//     coins = parseInt(savedCoins);
//     updateCoins();
//   }
// };

// // Add task
// function addTask() {
//   let input = document.getElementById("taskInput");
//   let text = input.value;

//   if (text === "") return;

//   let task = {
//     id: Date.now(),
//     text: text,
//     completed: false
//   };

//   tasks.push(task);
//   saveData();
//   renderAllTasks();

//   input.value = "";
// }

// // Render all tasks
// function renderAllTasks() {
//   document.getElementById("pendingList").innerHTML = "";
//   document.getElementById("completedList").innerHTML = "";

//   tasks.forEach(task => renderTask(task));
// }

// // Render single task
// function renderTask(task) {
//   let li = document.createElement("li");
//   li.innerText = task.text;

//   if (task.completed) {
//     li.classList.add("completed");
//   }

//   // Toggle complete
//   li.onclick = function () {
//     task.completed = !task.completed;

//     if (task.completed) {
//       coins++;
//     } else {
//       coins--;
//     }

//     updateCoins();
//     saveData();
//     renderAllTasks();
//   };

//   // Delete button
//   let deleteBtn = document.createElement("button");
//   deleteBtn.innerText = "Delete";

//   deleteBtn.onclick = function (e) {
//     e.stopPropagation();

//     if (task.completed) {
//       coins--;
//       updateCoins();
//     }

//     tasks = tasks.filter(t => t.id !== task.id);
//     saveData();
//     renderAllTasks();
//   };

//   li.appendChild(deleteBtn);

//   // Append to correct list
//   if (task.completed) {
//     document.getElementById("completedList").appendChild(li);
//   } else {
//     document.getElementById("pendingList").appendChild(li);
//   }
// }

// // Save data
// function saveData() {
//   localStorage.setItem("tasks", JSON.stringify(tasks));
//   localStorage.setItem("coins", coins);
// }

// // Update coins UI
// function updateCoins() {
//   document.getElementById("coins").innerText = coins;
// }
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

// Add task
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

// Render all tasks
function renderAllTasks() {
  document.getElementById("pendingList").innerHTML = "";
  document.getElementById("completedList").innerHTML = "";

  tasks.forEach(task => renderTask(task));
}

// Render single task
function renderTask(task) {
  let li = document.createElement("li");
  li.innerText = task.text;

  // Buttons container
  let btnContainer = document.createElement("div");

  // DONE button (only for pending tasks)
  if (!task.completed) {
    let doneBtn = document.createElement("button");
    doneBtn.innerText = "Done";

    doneBtn.onclick = function (e) {
      e.stopPropagation();

      task.completed = true;
      coins++;

      updateCoins();
      saveData();
      renderAllTasks();
    };

    btnContainer.appendChild(doneBtn);
  }

  // UNDO button (for completed tasks)
  if (task.completed) {
    li.classList.add("completed");

    let undoBtn = document.createElement("button");
    undoBtn.innerText = "Undo";

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

  // DELETE button
  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";

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

  // Append to correct list
  if (task.completed) {
    document.getElementById("completedList").appendChild(li);
  } else {
    document.getElementById("pendingList").appendChild(li);
  }
}

// Save data
function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("coins", coins);
}

// Update coins UI
function updateCoins() {
  document.getElementById("coins").innerText = coins;
}