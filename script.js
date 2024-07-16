// getting values from id and class
const inputTask = document.querySelector('#input'); // taken input
const taskList = document.getElementById('list'); // take the UL to add and remove li later
const count = document.getElementById('taskCount'); // to maintain count of tasks

// array to store the taskData of todolist.
let toDoList = []; ///mainList

inputTask.addEventListener('click', () => {
  const place = document.querySelector('.Container');
  const icon = document.createElement('button');
  icon.setAttribute('id', 'butn');
  icon.innerHTML = `<i class="fa fa-plus-circle add" aria-hidden="true"></i>`;
  place.append(icon);
},
  {
    once: true
  }
)

// it is event listener when ever we click on the buttons  page and it do has we written in methods
document.addEventListener('click', handler);

// it is the function for function every event that we mention in html
function handler(e) {
  const target = e.target;
  if (target.className == 'fa fa-plus-circle add') {
    subButton();
  }

  if (target.className === 'fa fa-trash-o') {
    const taskId = target.dataset.id;
    deleteTask(taskId);
    return;
  }
// when user click on checkbox it showing task  as completed
  else if (target.className === 'check') { //
    const taskId = target.id;
    markDone(taskId);
    return;
  }
// when user click on inComplete it showing all task is  unchecked
  else if (target.className === 'incomplete') {
    if (toDoList.length == 0) {
      return;
    }
    for (let i = 0; i < toDoList.length; i++) {
      toDoList[i].done = false
    }
    taskData();
  }
// when user click on Complete it showing all task is checked
  else if (target.className === 'completed') {
    if (toDoList.length == 0) {
      return;
    }
    for (let i = 0; i < toDoList.length; i++) {
      toDoList[i].done = true
    }
    taskData();
  }


  else if (target.className === 'fa-solid fa-check-double dobCheck') {
    if (toDoList.length == 0) {
      return;
    }
    for (let i = 0; i < toDoList.length; i++) {
      toDoList[i].done = true
    }
    // taskData();
    // const newTasks = []
    // toDoList = newTasks;
    taskData();

  }
//when user click on clear completed it showing all task are deleted from todolst
  else if (target.className === 'deltAll') {
    if (toDoList.length == 0) {
      return;
    }
    const newTasks = []
    toDoList = newTasks;
    taskData();
  }
}

// this button function is to add a tasks to list
function subButton() {
  let value = inputTask.value;
  if (value === '') { //if input box is empty, showing alert that i/p is empty and return
    alert('Enter the task');
    return;
  }
  const task = {
    name: value,
    id: Date.now().toString(),
    done: false
  }
  addTask(task);
  inputTask.value = '';
}

// adding a task to the array
function addTask(task) {
  if (task) {
    toDoList.push(task);
    taskData();
    alert("Task added.")
    return;
  }
  else {
    alert("Task Not added!");
  }
}

//when click on clear completed  will call this function nd showing alert message nd all task has been deleted from todolst
function taskData() {
  taskList.innerHTML = '';
  if (toDoList.length == 0) {
    alert("All tasks are completed")
  }
  for (let i = 0; i < toDoList.length; i++) {
    renderList(toDoList[i]);
  }
  count.innerHTML = toDoList.length;
}

// this function is to write inner html in the unordered list
function renderList(task) {
  const li = document.createElement('li');

  li.setAttribute('class', 'task');
  li.setAttribute('taskData-key', task.id);

  if (task.done === true) {
    li.classList.add('checked');
  }

  li.innerHTML = `<input type="checkbox" class="check" id="${task.id}" ${task.done ? 'checked' : null}>
  <label for="${task.id}">${task.name}</label>
  <button class="butn">
    <i class="fa fa-trash-o" aria-hidden="true" taskData-id="${task.id}"></i>
  </button>`
  taskList.append(li);
}

// this is to delete the taskData
function deleteTask(id) {
  const newTasks = toDoList.filter(function (task) {
    return task.id !== id
  })
  toDoList = newTasks;
  taskData();
}

// this does that the task is completed or not by adding the Boolean in to the taskData field 
function markDone(id) {
  const task = toDoList.filter(function (task) {
    return task.id === id
  });
  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.done = !currentTask.done;
    taskData();
    return;
  }
}