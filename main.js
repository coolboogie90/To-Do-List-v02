/*-----Main Program-----*/

window.addEventListener('load', () => {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const todoList = document.querySelector('#tasks');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskText = input.value.trim();
        if(taskText !== ''){
            const task = createTask(input.value);
            todoList.appendChild(task);
            input.value = '';
            addToLocalStorage();
        }
    });

    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        savedTasks.forEach((taskText) => {
            const task = createTask(taskText);
            todoList.appendChild(task);
        });
    }
});

/*-----Functions-----*/

const createTask = (taskText) => {
    const task = document.createElement('div');
    task.classList.add('task');

    const taskContent = document.createElement('div');
    taskContent.classList.add('content');

    const taskInput = createInput(taskText);
    taskContent.appendChild(taskInput);

    const taskActions = createActions(task, taskInput);
    task.appendChild(taskContent);
    task.appendChild(taskActions);

    return task;
};

const createInput = (taskText) => {
    const taskInput = document.createElement('input');
    taskInput.classList.add('text');
    taskInput.type = 'text';
    taskInput.value = taskText;
    taskInput.setAttribute('readonly', 'readonly');
    return taskInput;
};

const createActions = (task, taskInput) => {
    const taskActions = document.createElement('div');
    taskActions.classList.add('actions');

    const taskEdit = createButton('Edit', () => {
        editTask(taskEdit, taskInput);
    });

    const taskDelete = createButton('Delete', () => {
        task.parentNode.removeChild(task);
        removeTaskFromLocalStorage(taskInput.value);
    });

    taskActions.appendChild(taskEdit);
    taskActions.appendChild(document.createTextNode('|'));
    taskActions.appendChild(taskDelete);

    return taskActions;
};

const createButton = (text, onClick) => {
    const button = document.createElement('button');
    button.classList.add(text.toLowerCase());
    button.innerText = text;
    button.addEventListener('click', onClick);
    return button;
};

const editTask = (editButton, inputField) => {
    if (editButton.innerText.toLowerCase() === 'edit') {
        editButton.innerText = 'Save';
        inputField.removeAttribute('readonly');
        inputField.focus();
    } else {
        editButton.innerText = 'Edit';
        inputField.setAttribute('readonly', 'readonly');
        addToLocalStorage();
    }
};

const addToLocalStorage = () => {
    const tasks = Array.from(document.querySelectorAll('.task')).map((task) => {
        return task.querySelector('.text').value;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const removeTaskFromLocalStorage = (taskText) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const updatedTasks = tasks.filter((task) => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
};
