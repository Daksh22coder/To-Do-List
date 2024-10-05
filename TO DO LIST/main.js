const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');


let tasks = [];
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTaskList();
}


addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});



function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        saveTasksToStorage();
        renderTaskList();
        taskInput.value = '';
    }
}


function saveTasksToStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function renderTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.dataset.index = index;
        if (task.completed) {
            li.classList.add('completed');
        }
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(index));
        li.appendChild(deleteBtn);
        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Uncomplete' : 'Complete';
        completeBtn.addEventListener('click', () => toggleTaskCompleted(index));
        li.appendChild(completeBtn);
        taskList.appendChild(li);
    });
}


function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasksToStorage();
    renderTaskList();
}


function toggleTaskCompleted(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasksToStorage();
    renderTaskList();
}