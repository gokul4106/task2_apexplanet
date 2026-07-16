/* =========================================================
   PART 1 — CONTACT FORM VALIDATION
   The form's action="https://formsubmit.co/..." attribute
   is what actually sends the email — that happens with a
   normal HTML form submission, no JavaScript required for
   the sending part itself.

   JavaScript's job here is ONLY to check the fields first
   and block the submission if something's missing or wrong
   — exactly what Task 2 asks for.
========================================================= */

const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formSuccess = document.getElementById("formSuccess");
const submitBtn = document.getElementById("submitBtn");

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
    // Stop the form from submitting at all if validation fails
    e.preventDefault();
    formSuccess.textContent = "";
    return;
  }

  // If we get here, validation passed — let the form submit
  // normally to FormSubmit, which sends the actual email.
  formSuccess.style.color = "var(--color-primary)";
  formSuccess.textContent = "Sending...";
  submitBtn.disabled = true;
});

function showError(inputEl, errorId, message) {
  inputEl.classList.add("invalid");
  document.getElementById(errorId).textContent = message;
}

function clearError(inputEl, errorId) {
  inputEl.classList.remove("invalid");
  document.getElementById(errorId).textContent = "";
}


/* =========================================================
   PART 2 — DYNAMIC TO-DO LIST (DOM manipulation)
========================================================= */

const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");

addTodoBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTodo();
});

function addTodo() {
  const taskText = todoInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.className = "todo-item";

  const span = document.createElement("span");
  span.textContent = taskText;
  span.addEventListener("click", function () {
    li.classList.toggle("completed");
  });

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  removeBtn.addEventListener("click", function () {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(removeBtn);
  todoList.appendChild(li);

  todoInput.value = "";
  todoInput.focus();
}