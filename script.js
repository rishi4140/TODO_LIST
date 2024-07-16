// Select DOM elements using querySelector
const inputBox = document.querySelector(".input-box input");
const plusIcon = document.querySelector("#plus-icon");
const tasksList = document.querySelector(".tasks-list");
const tasksCount = document.querySelector(".tasks-count");
const btnUpdates = document.querySelectorAll(".btns-update .btn");
const btnClearCompleted = document.querySelector(".btn-clear-completed");
const btnClearAll = document.querySelector(".btn-clear-all");

// Create an empty array to store task elements
let taskElements = [];

// Function to update the task count in the UI
function updateTaskCount(count) {
  tasksCount.textContent = count;
}

// Function to update the task display based on the selected filter
function updateTaskDisplay(tasks) {
  tasksList.innerHTML = "";
  tasks.forEach((item) => {
    tasksList.appendChild(item);
  });
}

// Function to add a new task to the list
function addTask(taskName) {
  const list = document.createElement("li");
  list.innerHTML = `
    <div class="task">
      <div class="task-name">
        <input class="checkinput" name="task" type="checkbox" />
        <span>${taskName}</span>
      </div>
      <span>
        <i class="fa-solid fa-trash del"></i>
      </span>
    </div>`;

  const taskCheckbox = list.querySelector(".checkinput");
  const taskText = list.querySelector("span");

  // Add an event listener to the task checkbox to handle completion
  taskCheckbox.addEventListener("change", function () {
    if (taskCheckbox.checked) {
      taskText.style.textDecoration = "line-through";
    } else {
      taskText.style.textDecoration = "none";
    }
  });

  // Add the new task to the task list and update the task count
  tasksList.appendChild(list);
  taskElements.push(list);
  updateTaskCount(taskElements.length);

  // Add an event listener to the delete button for task removal
  const deleteBtn = list.querySelector(".del");
  deleteBtn.addEventListener("click", function () {
    list.remove();
    const index = taskElements.indexOf(list);
    if (index !== -1) {
      taskElements.splice(index, 1);
    }
    updateTaskCount(taskElements.length);
  });
}

// Function to add a task from the input box
function addTaskFromInputBox() {
  const taskName = inputBox.value.trim();
  if (taskName === "") {
    plusIcon.classList.add("plus-icon");
    alert("Please add a task");
  } else {
    addTask(taskName);
    plusIcon.classList.remove("plus-icon");
    inputBox.value = "";
  }
}

// Event listener for adding a task when clicking the plus icon
plusIcon.addEventListener("click", addTaskFromInputBox);

// Event listener for adding a task when pressing the Enter key in the input box
inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTaskFromInputBox();
  }
});

// Event listener for clearing completed tasks
btnClearCompleted.addEventListener("click", function () {
  const completedTasks = taskElements.filter((task) => {
    const Checkbox = task.querySelector(".checkinput");
    return Checkbox.checked;
  });

  completedTasks.forEach((task) => task.remove());
  taskElements = taskElements.filter((task) => {
    const Checkbox = task.querySelector(".checkinput");
    return !Checkbox.checked;
  });

  updateTaskCount(taskElements.length);
});

// Event listener for clearing all tasks
btnClearAll.addEventListener("click", function () {
  tasksList.innerHTML = "";
  taskElements = [];
  updateTaskCount(0);
});

// Event listeners for the task status buttons (All, Pending, Completed)
btnUpdates.forEach((btn) => {
  btn.addEventListener("click", function () {
    // Remove the "active" class from all buttons
    btnUpdates.forEach((button) => button.classList.remove("active"));

    const btnText = btn.textContent.trim();
    let filteredTasks = [];

    if (btnText === "All") {
      filteredTasks = taskElements;
    } else if (btnText === "Pending") {
      filteredTasks = taskElements.filter((task) => {
        const Checkbox = task.querySelector(".checkinput");
        return !Checkbox.checked;
      });
    } else if (btnText === "Completed") {
      filteredTasks = taskElements.filter((task) => {
        const Checkbox = task.querySelector(".checkinput");
        return Checkbox.checked;
      });
    }

    // Add the "active" class to the clicked button
    btn.classList.add("active");

    // Update the task display based on the selected filter
    updateTaskDisplay(filteredTasks);

    // Update the task count in the UI
    if (btnText === "All") {
      updateTaskCount(taskElements.length);
    } else {
      updateTaskCount(filteredTasks.length);
    }
  });
});

// Initialize the task count when the page loads
updateTaskCount(taskElements.length);
