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
  // Add task event
  form.addEventListener('submit', addTask);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task list event
  clearBtn.addEventListener('click', clearTasks);
}

// Add Task - Function
function addTask(e) {
  if (taskInput.value === '') {
    alert('Enter your task');
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

    // Clear input
    taskInput.value = '';

    e.preventDefault();
  }
}

// Remove Task - Function
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}


// Clear Tasks - Function
function clearTasks() {
  // taskList.innerHTML = '';
  while (taskList.firstChild) {
    // taskList.firstChild.remove();
    taskList.removeChild(taskList.firstChild);
  }
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