// Document is the DOM and can be accessed in the console with document.window.
// Tree is from the top: html, body, p, etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.

// Event handling — user interaction is what starts the code execution.

var taskInput = document.getElementById("new-task"); // Add a new task.
var addButton = document.querySelector(".button-add"); // First button
var incompleteTaskHolder = document.getElementById("incompleteTasks"); // UL of #incompleteTasks
var completedTasksHolder = document.getElementById("completed-tasks"); // UL of #completed-tasks

// New task list item
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  listItem.className = "todo__item";

  // input (checkbox)
  var checkBox = document.createElement("input"); // checkbox
  checkBox.type = "checkbox";
  checkBox.className = "todo__checkbox";

  // label
  var label = document.createElement("label"); // label
  label.innerText = taskString;
  label.className = "todo__text";

  // input (text)
  var editInput = document.createElement("input"); // text input
  editInput.type = "text";
  editInput.className = "todo__input";

  // button.edit
  var editButton = document.createElement("button"); // edit button
  editButton.className = "todo__button--edit";
  editButton.innerText = "Edit";

  // button.delete
  var deleteButton = document.createElement("button"); // delete button
  deleteButton.className = "todo__button--delete";
  var deleteButtonImg = document.createElement("img"); // delete button image

  label.innerText = taskString;
  label.className = "task-text";

  // Each element needs to be configured and appended
  checkBox.type = "checkbox";
  checkBox.className = "task-checkbox"; // Added class for proper event binding

  editInput.type = "text";
  editInput.className = "task-input";

  editButton.innerText = "Edit"; // innerText encodes special characters; HTML does not.
  editButton.className = "button-edit";

  deleteButton.className = "button-delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  // Append all elements to the list item
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

// Add a new task
var addTask = function () {
  console.log("Add Task...");
  // Create a new list item with the text from the #new-task input
  if (!taskInput.value || !taskInput.value.trim()) return;

  var listItem = createNewTaskElement(taskInput.value.trim());

  // Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  // Clear the input field
  taskInput.value = "";
};

// Edit an existing task
var editTask = function () {
  console.log("Edit Task...");
  var listItem = this.parentNode; // Edit button -> parent li
  var editInput = listItem.querySelector(".todo__input");
  var label = listItem.querySelector(".todo__text");
  var editBtn = listItem.querySelector(".todo__button--edit");

  // If the parent has class .edit-mode
  if (listItem.classList.contains("edit-mode")) {
    // Switch from .edit-mode to normal mode
    // Label becomes the input's value
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    // Switch to .edit-mode
    // Input takes the label's value
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  // Toggle .edit-mode on the parent
  listItem.classList.toggle("edit-mode");
};

// Delete task
var deleteTask = function () {
  console.log("Delete Task...");
var listItem = this.closest(".todo__item");
  var ul = listItem.parentNode;

  // Remove the parent list item from the ul
  ul.removeChild(listItem);
};

// Mark task as completed
var taskCompleted = function () {
  console.log("Complete Task...");
  

  // Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem); // просто перемещаем элемент
  bindTaskEvents(listItem, taskIncomplete);
};

// Mark task as incomplete
var taskIncomplete = function () {
  console.log("Incomplete Task...");

  // When the checkbox is unchecked,
  // append the task list item back to the #incompleteTasks
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem); // просто перемещаем элемент
  bindTaskEvents(listItem, taskCompleted);
};

// Simulate an AJAX request (for demonstration)
var ajaxRequest = function () {
  console.log("AJAX Request");
};

// Set the click handler for the addTask function
addButton.addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
  ajaxRequest();
});

// Bind events to task list items
var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");

  var checkBox = taskListItem.querySelector(".todo__checkbox");
  var editButton = taskListItem.querySelector(".todo__button--edit");
  var deleteButton = taskListItem.querySelector(".todo__button--delete");

  // Bind editTask to the edit button
  if (editButton) editButton.onclick = editTask;

  // Bind deleteTask to the delete button
  if (deleteButton) deleteButton.onclick = deleteTask;

  // Bind taskCompleted/taskIncomplete to the checkbox
  if (checkBox) checkBox.onchange = checkBoxEventHandler;
};

// Initialize existing tasks in Todo
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// Initialize existing tasks in Completed
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

console.log("Todo App initialized successfully");
