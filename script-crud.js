const selectedTaskDescription = document.querySelector('.app__section-active-task-description');
const taskList = document.querySelector('.app__section-task-list');
const newTaskButton = document.querySelector('.app__button--add-task');
const newTaskForm = document.querySelector('.app__form-add-task');
const taskFormLabel = document.querySelector('.app__form-label');
const taskFormText = document.querySelector('.app__form-textarea');
const taskFormCancelButton = document.querySelector('.app__form-footer__button--cancel');

const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>`;

const taskListElements = [];
let selectedTask = null;
let editTaskIndex = null;

const taskListData = JSON.parse(localStorage.getItem('taskListData')) == null ? [] : JSON.parse(localStorage.getItem('taskListData'));
loadTasks();


newTaskButton.addEventListener('click', () => {

    taskFormLabel.textContent = 'Nova tarefa';
    newTaskForm.classList.toggle('hidden');
});

newTaskForm.addEventListener('submit', (event) => {

    event.preventDefault();

    if(editTaskIndex === null) createTask(taskFormText.value, false);
    else updateTask(editTaskIndex);
    editTaskIndex = null;
    
    clearTaskForm();
});

taskFormCancelButton.addEventListener('click',() => {

    clearTaskForm();
})

function loadTasks(){

    taskListData.forEach((taskData) => {
        const {description,done} = taskData;
        printTask(description,done);
    })
};

function printTask(description,done){

    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');
    if(done) li.classList.add('app__section-task-list-item-complete');

    const icon = document.createElement('svg');
    icon.innerHTML = taskIconSvg;

    const p = document.createElement('p');
    p.classList.add('app__section-task-list-item-description');
    p.textContent = description;

    const button = document.createElement('button');
    button.classList.add('app_button-edit');
    if(done) button.toggleAttribute('disabled');
    const buttonImg = document.createElement('img');
    buttonImg.setAttribute('src','/imagens/edit.png');
    button.appendChild(buttonImg);

    li.appendChild(icon);
    li.appendChild(p);
    li.appendChild(button); 

    li.addEventListener('click', () => {

        const index = taskListElements.findIndex(x => x === li);
        selectedTask = selectedTask === index ? null : index;
       
        taskListElements.forEach((element,i) => {

            if(i === index) element.classList.toggle('app__section-task-list-item-active');
            else element.classList.remove('app__section-task-list-item-active');
        });

        if(selectedTask === index) selectedTaskDescription.textContent = description;
        
        else selectedTaskDescription.textContent = '';
    });

    icon.addEventListener('click', (event) => {

        event.stopPropagation();

        const index = taskListElements.findIndex(x => x === li);

        li.classList.toggle('app__section-task-list-item-complete');
        button.toggleAttribute('disabled');
        taskListData[index].done = button.hasAttribute('disabled') ? true : false;
        localStorage.setItem('taskListData',JSON.stringify(taskListData));
    });

    button.addEventListener('click', (event) => {
        
        event.stopPropagation();

        const index = taskListElements.findIndex(x => x === li);
        editTaskIndex = index;

        taskFormLabel.textContent = 'Editar tarefa';
        taskFormText.value = description;
        newTaskForm.classList.toggle('hidden');
    })

    taskListElements.push(li);

    taskList.appendChild(li);

}

function createTask(description,done){

    printTask(description,done);
    taskListData.push({description: description, done: done});
    localStorage.setItem('taskListData',JSON.stringify(taskListData));
    
}

function updateTask(index){

    taskList.removeChild(taskListElements[index]);
    taskListData.splice(index,1);
    createTask(taskFormText.value, false);
    
}

function clearTaskForm(){ 
    
    taskFormText.value = '';
    newTaskForm.classList.toggle('hidden');
};

