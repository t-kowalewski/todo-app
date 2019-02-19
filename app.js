// Define UI variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-inp');
const filter = document.querySelector('#filter-inp');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('a.clear-tasks');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task list event
  clearBtn.addEventListener('click', clearTasks);
}


// Get tasks from LS & add (when page loads) - Function
function getTasks() {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));

    // Add tasks from LS
    tasks.forEach(function (task) {
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Create text node & append to li
      li.appendChild(document.createTextNode(task));

      // Create new link element (x icon)
      const link = document.createElement('a');
      // Add class
      link.className = 'delete-item secondary-content';
      // Add icon html
      link.innerHTML = '<i class="fas fa-check"></i>';

      // Append link to li
      li.appendChild(link);

      // Append li to the ul
      taskList.appendChild(li);

      // Activate "Clear" button //
      clearBtn.classList.remove('disabled');
    });
  }
}


// Add Task - Function (UI)
function addTask(e) {
  if (taskInput.value === '') {
    alert('Please Enter Your Task');
  }
  else {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node & append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element (x icon)
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fas fa-check"></i>';

    // Append link to li
    li.appendChild(link);

    // Append li to the ul
    taskList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

    // Activate "Clear" button //
    if (clearBtn.classList.contains('disabled')) {
      clearBtn.classList.remove('disabled');
    }

    e.preventDefault();
  }
}


// Add task to LS
function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Remove Task (UI) - Function
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();

      // Disable "Clear" button //
      if (taskList.firstChild === null) {
        clearBtn.classList.add('disabled');
      }

      // Remove task from LS
      removeTaskFromLS(e.target.parentElement.parentElement);
    }
  }
}


// Remove Task (LS) - Function
function removeTaskFromLS(taskItem) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (task === taskItem.textContent) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clear Tasks - Function
function clearTasks() {
  // taskList.innerHTML = '';
  while (taskList.firstChild) {
    // taskList.firstChild.remove();
    taskList.removeChild(taskList.firstChild);
  }

  // Disable "Clear" button //
  clearBtn.classList.add('disabled');

  // Clear from LS
  clearTasksFromLS();
}


// Clear tasks from LS - function
function clearTasksFromLS() {
  localStorage.clear();
}


// Filter Tasks - Function
function filterTasks(e) {
  const textInp = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const taskCont = task.firstChild.textContent;
    if (taskCont.toLowerCase().indexOf(textInp) != -1) {
      task.style.display = 'block';
    }
    else {
      task.style.display = 'none';
    }
  });
}