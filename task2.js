/* =========================================================
   PART 1 — CONTACT FORM VALIDATION
========================================================= */

const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formSuccess = document.getElementById("formSuccess");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener("submit", function (e) {
  let isValid = true;

  if (nameInput.value.trim() === "") {
    showError(nameInput, "nameError", "Name is required.");
    isValid = false;
  } else {
    clearError(nameInput, "nameError");
  }

  if (emailInput.value.trim() === "") {
    showError(emailInput, "emailError", "Email is required.");
    isValid = false;
  } else if (!emailPattern.test(emailInput.value.trim())) {
    showError(emailInput, "emailError", "Please enter a valid email address.");
    isValid = false;
  } else {
    clearError(emailInput, "emailError");
  }

  if (messageInput.value.trim() === "") {
    showError(messageInput, "messageError", "Message can't be empty.");
    isValid = false;
  } else {
    clearError(messageInput, "messageError");
  }

  if (!isValid) {
    e.preventDefault();
    formSuccess.textContent = "";
    return;
  }

  e.preventDefault();
  formSuccess.textContent = "Your details are valid. Connect a form service to receive messages.";
});

function showError(inputEl, errorId, message) {
  inputEl.classList.add("invalid");
  inputEl.setAttribute("aria-invalid", "true");
  document.getElementById(errorId).textContent = message;
}

function clearError(inputEl, errorId) {
  inputEl.classList.remove("invalid");
  inputEl.setAttribute("aria-invalid", "false");
  document.getElementById(errorId).textContent = "";
}


/* =========================================================
   PART 2 — DYNAMIC TO-DO LIST (DOM manipulation)
========================================================= */

const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");
const todoStatus = document.getElementById("todoStatus");

addTodoBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTodo();
});

function addTodo() {
  const taskText = todoInput.value.trim();
  if (taskText === "") {
    todoStatus.textContent = "Enter a quest before adding it.";
    todoInput.focus();
    return;
  }

  const li = document.createElement("li");
  li.className = "todo-item";

  const label = document.createElement("label");
  label.className = "todo-label";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function () {
    li.classList.toggle("completed", checkbox.checked);
  });

  const span = document.createElement("span");
  span.textContent = taskText;
  label.append(checkbox, span);

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.type = "button";
  removeBtn.setAttribute("aria-label", `Remove ${taskText}`);
  const removeIcon = document.createElement("i");
  removeIcon.className = "fa-solid fa-trash";
  removeIcon.setAttribute("aria-hidden", "true");
  removeBtn.appendChild(removeIcon);
  removeBtn.addEventListener("click", function () {
    li.remove();
    todoStatus.textContent = `Removed quest: ${taskText}`;
  });

  li.appendChild(label);
  li.appendChild(removeBtn);
  todoList.appendChild(li);

  todoInput.value = "";
  todoStatus.textContent = `Added quest: ${taskText}`;
  todoInput.focus();
}