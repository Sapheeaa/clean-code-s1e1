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
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    // Switch to .edit-mode
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
  ul.removeChild(listItem);
};

// Mark task as completed
var taskCompleted = function () {
  console.log("Complete Task...");
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

// Mark task as incomplete
var taskIncomplete = function () {
  console.log("Incomplete Task...");
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
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

// Automatically set "Go Shopping" task into edit mode on page load
window.addEventListener("DOMContentLoaded", function () {
  var shoppingTask = Array.from(incompleteTaskHolder.children).find(function (item) {
    var label = item.querySelector(".todo__text");
    return label && label.innerText.trim() === "Go Shopping";
  });

  if (shoppingTask) {
    shoppingTask.classList.add("edit-mode"); // activate edit mode styles
    var editInput = shoppingTask.querySelector(".todo__input");
    var editButton = shoppingTask.querySelector(".todo__button--edit");

    // Ensure input is visible but not focused
    editInput.value = "Go Shopping";
    editButton.innerText = "Save";

    // Explicitly remove focus from all elements
    document.activeElement.blur();
  }
});

console.log("Todo App initialized successfully");
