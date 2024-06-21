document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(todoInput.value);
        todoInput.value = '';
    });

    function addTask(task) {
        if (task === '') return;

        const li = document.createElement('li');
        li.innerText = task;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        todoList.querySelectorAll('li').forEach((li) => {
            tasks.push(li.innerText.replace('Delete', '').trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task) => addTask(task));
    }

    loadTasks();
});
