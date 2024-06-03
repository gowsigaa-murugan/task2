document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const editModal = document.getElementById('editModal');
    const editTaskInput = document.getElementById('editTaskInput');
    const saveTaskButton = document.getElementById('saveTaskButton');
    const deleteModal = document.getElementById('deleteModal');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    const cancelDeleteButton = document.getElementById('cancelDeleteButton');
    let tasks = [];
    let currentEditIndex = null;
    let currentDeleteIndex = null;

    addTaskButton.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task && !tasks.some(t => t.text === task)) {
            tasks.push({ text: task, completed: false });
            taskInput.value = '';
            renderTasks();
        } else {
            alert('Task cannot be empty or duplicate.');
        }
    });

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }

            li.addEventListener('click', () => toggleCompleteTask(index));

            const editButton = document.createElement('button');
            editButton.textContent = '✏️';
            editButton.className = 'edit-button';
            editButton.addEventListener('click', (event) => {
                event.stopPropagation();
                openEditModal(index);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '🗑️';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation();
                openDeleteModal(index);
            });

            li.appendChild(editButton);
            li.appendChild(deleteButton);

            taskList.appendChild(li);
        });
    }

    function toggleCompleteTask(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    function openEditModal(index) {
        currentEditIndex = index;
        editTaskInput.value = tasks[index].text;
        editModal.style.display = 'flex';
    }

    function closeEditModal() {
        editModal.style.display = 'none';
    }

    saveTaskButton.addEventListener('click', () => {
        const editedTask = editTaskInput.value.trim();
        if (editedTask && !tasks.some((t, i) => t.text === editedTask && i !== currentEditIndex)) {
            tasks[currentEditIndex].text = editedTask;
            closeEditModal();
            renderTasks();
        } else {
            alert('Task cannot be empty or duplicate.');
        }
    });

    window.onclick = function(event) {
        if (event.target == editModal) {
            closeEditModal();
        }
    }

    document.querySelector('.close').onclick = closeEditModal;

    function openDeleteModal(index) {
        currentDeleteIndex = index;
        deleteModal.style.display = 'flex';
    }

    function closeDeleteModal() {
        deleteModal.style.display = 'none';
    }

    confirmDeleteButton.addEventListener('click', () => {
        tasks.splice(currentDeleteIndex, 1);
        closeDeleteModal();
        renderTasks();
    });

    cancelDeleteButton.addEventListener('click', closeDeleteModal);

    window.onclick = function(event) {
        if (event.target == deleteModal) {
            closeDeleteModal();
        }
    }
});
