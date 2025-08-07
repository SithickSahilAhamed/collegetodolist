const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

// Retrieve todos from localStorage or initialize
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, idx) => {
    const li = document.createElement('li');
    li.className = `todo-item${todo.completed ? " completed" : ""}`;
    // Task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = todo.task;

    // Mark completed on click
    taskSpan.onclick = () => {
      todos[idx].completed = !todos[idx].completed;
      saveTodos();
      renderTodos();
    };

    // Actions (edit, delete)
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'todo-actions';

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '✏️';
    editBtn.title = 'Edit';
    editBtn.onclick = () => {
      const newTask = prompt('Edit task:', todo.task);
      if (newTask && newTask.trim() !== '') {
        todos[idx].task = newTask.trim();
        saveTodos();
        renderTodos();
      }
    };

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.innerHTML = '🗑️';
    delBtn.title = 'Delete';
    delBtn.onclick = () => {
      if (confirm('Delete this task?')) {
        todos.splice(idx, 1);
        saveTodos();
        renderTodos();
      }
    };

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(delBtn);

    li.appendChild(taskSpan);
    li.appendChild(actionsDiv);
    todoList.appendChild(li);
  });

  updateProgress();
}

function updateProgress() {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : (completed / total) * 100;
  progressBar.style.width = percent + '%';
  progressText.textContent = `${completed}/${total} Completed`;
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Handle add
todoForm.onsubmit = e => {
  e.preventDefault();
  const task = todoInput.value.trim();
  if (task) {
    todos.push({ task, completed: false });
    saveTodos();
    renderTodos();
    todoInput.value = '';
    todoInput.focus();
  }
};

// Initial render
renderTodos();
