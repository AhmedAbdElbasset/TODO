let input =document.querySelector("#input")
let submit=document.querySelector(".add")
let TasksDev=document.querySelector('.box')
let AT=[]

if(localStorage.getItem('task')){
    AT=JSON.parse(localStorage.getItem('task'))
}

getElement()
submit.onclick=function (){
    
    if(input.value !=''){
        AddTaskToArray(input.value)
        input.value=''
    }
}

TasksDev.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
      Delete(e.target.parentElement.getAttribute("data-id"));
      e.target.parentElement.remove();
    }

    if(e.target.classList.contains('task')){
        toggleStatus(e.target.getAttribute('data-id'))
        e.target.classList.toggle('done')
    }
}
)
const AddTaskToArray =(taskText)=>{
    let task={
        id:Date.now(),
        title:taskText,
        complete:false,
    }
    AT.push(task)
    addElment(AT)
    ATLS(AT)
}

function addElment(array){
    TasksDev.innerHTML =''
    AT.forEach((task)=>{
        let div=document.createElement('div')
        div.className='task'
        if(task.complete){
            div.className='task done'
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title))
        let img=document.createElement('img')
        img.src='./assets/icons8-wrong-60.png'
        img.alt=task.title
        img.className='del'
        div.appendChild(img)
        TasksDev.appendChild(div)
    })
}

function ATLS(array){
    localStorage.setItem('tasks',JSON.stringify(AT))
}
function getElement(){
    let data =localStorage.getItem('task')
    if(data){
        tasks=JSON.parse(data)
        addElment(data)
    }
}
function Delete(taskId){
    AT = AT.filter((task) => task.id != taskId);
    ATLS(AT);
}

function toggleStatus(taskId){
    for(let i=0;i<AT.length;i++){
        if(AT[i].id==taskId){
            AT[i].complete==false? (AT[i].complete=true): (AT[i].complete=false)
        }
    }
    ATLS(AT)
}