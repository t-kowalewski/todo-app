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
}

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




